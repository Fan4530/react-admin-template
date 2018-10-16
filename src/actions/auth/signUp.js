import { SIGN_UP_URL } from '../../urls.js';
import 'whatwg-fetch';
import { checkResponse } from '../../utils.js';
import { signIn } from './signIn.js';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_LOAD = 'SIGN_UP_LOAD';

export const signUpRequest = payload => ({
    type: SIGN_UP_REQUEST,
    payload
});

export const signUpSuccess = payload => ({
    type: SIGN_UP_SUCCESS,
    payload
});

export const signUpFailure = payload => ({
    type: SIGN_UP_FAILURE,
    payload
});
export const signupLoad = payload => ({
    type: SIGN_UP_LOAD,
    payload
});



export const signUp = ({ username, email, password, source }) => dispatch => {
    dispatch(signUpRequest());
    let body = JSON.stringify(
        {
            "password": password,
            "profile": {
                "email": email,
                "emailConfirmed": true,
                "name": username,
                "userStatus": "ACTIVE"
            },
            source: source
        }
    );

    dispatch(signupLoad({status:true}));
   
    fetch(SIGN_UP_URL, {
        method: 'post',
        body,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
            response => {
                dispatch(signupLoad({status:true}));
                if (checkResponse(response)) return response.json();
                else dispatch(signUpFailure({ message: 'An error occurred, please try again later.' }));
            },
            error => {
                dispatch(signupLoad({status:true}));
                dispatch(signUpFailure({ message: 'An error occurred, please try again later.' }));
            }
        )
        .then(response => {
            dispatch(signupLoad({status:true}));
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(signUpSuccess());
                dispatch(signIn({
                    login: username,
                    password: password
                }));
            } else {
                if (response.ServiceResponse.responseMessage === 'Name is not valid.'){
                    dispatch(signUpFailure({
                        message: "Username must be unique and at least 5 character long"
                    }));
                } else {
                    dispatch(signUpFailure({
                        message: response.ServiceResponse.responseMessage
                    }));
                }
            }
        })
        .catch(error => {
            dispatch(signupLoad({status:true}));
            console.log(error);
        });
};
