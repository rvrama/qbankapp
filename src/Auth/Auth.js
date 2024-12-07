import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import Spinner from '../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../store/actions/index';
import { updateObject, checkValidity } from '../shared/utility';
 
const SIGNUP_TXT = "First time user?. Please sign up.";
const SIGNIN_TXT = "Already have account with us?.  Sign In !!!"

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false
    }

    componentDidMount () {
        if ( this.props.authRedirectPath !== '/' ) {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    setSignInHandler = () => {
        this.setState({ isSignup: false });
    }

    setSignUpHandler = () => {
        this.setState({isSignup: true });
    }

    
    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if ( this.props.loading ) {
            form = <Spinner />
        }

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                (<h4 className={classes.ErrorMsg}>{this.props.error.message}</h4>)
            );
        }

        let infoMessage = null;
        if (this.props.info) {
            infoMessage = (<h5 className={classes.InfoMsg}>{this.props.info}</h5>)
        }

        let authRedirect = null;
        if ( this.props.isAuthenticated ) {
            authRedirect = <Navigate to={this.props.authRedirectPath} />
        }
        
        
        const cssClassForAuthDuringSignIn = [classes.Auth, classes.AuthBGColorDuringSignIn].join(' ');
        const cssClassForAuthDuringSignUp = [classes.Auth, classes.AuthBGColorDuringSignUp].join(' ');

        // const cssClassActive = [classes.SignTab, classes.SignTabActive].join(' ');
        // const cssClassInActive = [classes.SignTab].join(' ');



        return (
            <div className={this.state.isSignup ? cssClassForAuthDuringSignUp : cssClassForAuthDuringSignIn}>
                <div className={classes.Tab}>
                    <span className={classes.SignInTab}
                        onClick={this.setSignInHandler}>SIGN IN </span>
                    <span 
                        className={classes.SignUpTab}
                        onClick={this.setSignUpHandler}>SIGN UP</span>
                </div>
                {authRedirect}  
                {errorMessage}
                {infoMessage}
                <h4 className={classes.Title}>{this.state.isSignup ? SIGNUP_TXT : SIGNIN_TXT}</h4>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        info: state.auth.info
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );