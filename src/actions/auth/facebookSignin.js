import { FACEBOOK_LOGIN_USER_URL } from '../../utils/urls.js';
import { getCookie, clearCache } from '../../utils/utils.js';
import { AUTH_TOKEN } from '../../utils/constants.js';
import { checkAuth } from './checkAuth.js';
import 'whatwg-fetch';
import { checkResponse } from '../../utils/utils.js';

export const FACEBOOK_SIGN_IN_REQUEST = 'FACEBOOK_SIGN_IN_REQUEST';
export const FACEBOOK_SIGN_IN_SUCCESS = 'FACEBOOK_SIGN_IN_SUCCESS';
export const FACEBOOK_SIGN_IN_FAILURE = 'FACEBOOK_SIGN_IN_FAILURE';

export const facebookSignInRequest = payload => ({
    type: FACEBOOK_SIGN_IN_REQUEST,
    payload
});

export const facebookSignInSuccess = payload => ({
    type: FACEBOOK_SIGN_IN_SUCCESS,
    payload
});

export const facebookSignInFailure = payload => ({
    type: FACEBOOK_SIGN_IN_FAILURE,
    payload
});

export const fbSignin = () => dispatch => {

    //console.log(login);
    //console.log(password);

    dispatch(facebookSignInRequest());
    fetch(FACEBOOK_LOGIN_USER_URL, {
        credentials: 'include',
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: ''
    })
        .then(
        res => {
            // console.warn('res', res);
            // if (checkResponse(res)) {
            //     const token = getCookie(AUTH_TOKEN);
            //     dispatch(facebookSignInSuccess({ token }));
            // } else {
            //     dispatch(facebookSignInFailure({ message: 'Wrong username or password.' }));
            // }
        },
        error => {
            // dispatch(facebookSignInFailure({ message: 'An error occurred, please try again later.' }));
        }
        )
        .catch(error => {
            console.log('sign in error', error);
        })
}

