import {LOGIN_USER_URL} from '../../utils/urls.js';
import {checkResponse, getCookie} from '../../utils/utils.js';
import {AUTH_TOKEN} from '../../utils/constants.js';
import 'whatwg-fetch';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const signInRequest = payload => ({
    type: SIGN_IN_REQUEST,
    payload
});

export const signInSuccess = payload => ({
    type: SIGN_IN_SUCCESS,
    payload
});

export const signInFailure = payload => ({
    type: SIGN_IN_FAILURE,
    payload
});

export const signIn = ({login, password}) => dispatch => {
    login = 'arararar'
    password = '123456'
    console.log(LOGIN_USER_URL)

    dispatch(signInRequest());
    fetch(LOGIN_USER_URL, {
        credentials: 'include',
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"

        },
        body: `username=${login}&password=${password}`
    })
        .then(
            res => {
                console.log("what the hell fuck!")
                if (checkResponse(res)) {

                    const token = getCookie(AUTH_TOKEN);
                    dispatch(signInSuccess({token}));
                } else {
                    if (res.status === 500) {
                        dispatch(signInFailure({message: 'Wrong username/email.', login: login, password: password}));
                    } else if (res.status === 401) {
                        dispatch(signInFailure({message: 'Wrong password.', login: login, password: password}));
                    }
                }
            },
            error => {
                dispatch(signInFailure({message: 'An error occurred, please try again later.'}));
            }
        )
        .catch(error => {
            console.log('sign in error', error);
        })
}

