import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';

import * as actionTypes from './actionType';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, infoMsg) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        info: infoMsg
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('results');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        //for aws cognito user signup/sign in
      
        const poolData = {
           UserPoolId : 'us-east-1_kImfEn4oj',
            ClientId : '68ngbkgbonm8gjtjn0ghk6vbj'
        }
        console.log("reached auth action store");
        const UserPool = new CognitoUserPool(poolData);
    
        if (isSignup) 
        {
            UserPool.signUp(email, password, [], null, (err, response) => {
                if (err) {
                    dispatch(authFail(err));
                }
                else {
                    const expirationDate = new Date(new Date().getTime() + 3600000); //hardcoded 30 minutes hour TTL
               
                    const authenticatedUserId = response.userSub;
                    const successMsg = 'Verification email sent to ' + response.codeDeliveryDetails.Destination + ". After verification, you can use the same emailId as username and SignIn."

                    localStorage.setItem('token', null);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', authenticatedUserId);
                    
                    dispatch(authSuccess(null, authenticatedUserId, successMsg));
                    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) ));

                }
            });
        }
        else { //SignIn
            
            const user = new CognitoUser({
                Username: email,
                Pool : UserPool
            });
    
            const authDetails = new AuthenticationDetails({
                Username: email,
                Password: password
            })
    
            //To avoid using Cognito, skipping this code.  Uncomment it to use Cognito user login user flow

            // user.authenticateUser(authDetails, {
            //     onSuccess: response => {
            //         const expirationDate = new Date(new Date().getTime() + 3600000); //30 min TTL //response.idToken.payload.exp);
            //         const authenticatedUserId = response.idToken.payload.sub;

            //         localStorage.setItem('token', response.idToken.jwtToken);
            //         localStorage.setItem('expirationDate', expirationDate);
            //         localStorage.setItem('userId', authenticatedUserId);
                    
            //         dispatch(authSuccess(response.idToken.jwtToken, authenticatedUserId, ''));
            //         dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) ));

            //     },
            //     onFailure : err => {
            //         dispatch(authFail(err));
            //     },
            //     newPasswordRequired: newPassdata => {
            //         dispatch(authFail(newPassdata));
            //     }
            // })

            //BY PASS and make the login default.  Comment out the following 7 lines and uncomment the previous code
            //while using cognito for login

            const expirationDate = new Date(new Date().getTime() + 3600000); //30 min TTL //response.idToken.payload.exp);
            const authenticatedUserId = 'test-user'; //'hardc-coded-user-id'; //hardcoded
            const hardcodedjwttoken = "jwttokenhardcoded";
            localStorage.setItem('token', hardcodedjwttoken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', authenticatedUserId);
                    
            dispatch(authSuccess(hardcodedjwttoken, authenticatedUserId, ''));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) ));

            
        }
    }      
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId, ''));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};
