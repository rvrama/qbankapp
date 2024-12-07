import React, { Component } from 'react';
import classes from './App.module.css';
import Question from './containers/Question/Question';
import {Route, Router, Routes, Navigate} from 'react-router-dom';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Bound from './hoc/Bound';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import Home from './components/Home/Home';
import Results from './containers/Results/Results';

class App extends Component {
  
  state = {
    showSideDrawer: false
}

  componentDidMount () {
    this.props.onTryAutoSignup();
//    this.props.onTrySetDefaults();
  }


sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
}

sideDrawerToggleHandler = () => {
    this.setState( ( prevState ) => {
        return { showSideDrawer: !prevState.showSideDrawer };
    } );
}


  render() {

    console.log("in app"); 
    // let authLink; 

    // if (this.props.location.search &&  this.props.location.search.includes("code"))
    // {
    //   authLink = <a href={this.state.LogoutURL}>Logout</a>;
    // }
    // else {
    //   authLink = <a href={this.state.LoginURL}>Login</a>;
    // }
    // if (this.props.location.pathname !== "/question" && this.props.location.pathname !== "/auth") {
    //   this.props.history.replace({pathname:"/question", search:this.props.location.search}); 
    // }
    // else if (this.props.location.pathname === "/question" && !this.props.location.search.includes("code"))
    // {
    //   this.props.history.push({pathname:"/auth", search: this.props.location.search});
    // }
    
    let routes = (
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element = {<Navigate replace to="/" />} />
      </Routes>

    );

    if ( this.props.isAuthenticated ) {
     routes = (
          <Routes>
          <Route path="/question" exact="true" element={<Question /> } />
          <Route path="/logout" element={<Logout />}/>
          <Route path="/result" element={<Results />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/" elemtent = {<Navigate replace to="/" />} /> 
          </Routes>
      )
      }
    return (

              <Bound>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                 <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
         
                <main className={classes.Content}>
                <div className={classes.App}>
                <h3 className={classes.Apptitle}>Welcome to ReDaR's AWS Question Bank</h3>
              <p className={classes.Appintro}>
                This is just a free Question Bank that you can answer on AWS services in general 
                - nothing specific to AWS Certification.  Its going to be fun :)
              </p>
              </div>
            
                        {routes}
                  </main>
            </Bound>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (App);

// const withRouter=(props)=> {
//       const location = useLocation();
//       const navigate = useNavigate();
//       const params = useParams();

//       return <Component {...props} router={{ location, navigate, params }} />;
//   }

//export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App));

/*
1. Login Link will call Cognito User pool and return the success response with code.
2. save the code in state and redirect to Question page and change the link from Login to Logout.
3. Logout is clicked, internally handle the request in /Logout page and nullify the code in state and redirect to Login
*/