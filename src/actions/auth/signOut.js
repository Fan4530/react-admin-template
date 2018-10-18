import { LOGOUT_USER_URL } from '../../utils/urls.js';
import { checkAuth } from './checkAuth.js';
import { checkResponse } from '../../utils/utils.js';
import { getCookie, eraseCookie } from '../../utils/utils.js';
import 'whatwg-fetch';
import {AUTH_TOKEN, TOKEN_NAME} from "../../utils/constants";

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export const signOutRequest = payload => ({
    type: SIGN_OUT_REQUEST,
    payload
});

export const signOutSuccess = payload => ({
    type: SIGN_OUT_SUCCESS,
    payload
});

export const signOutFailure = payload => ({
    type: SIGN_OUT_FAILURE,
    payload
});

export const signOut = () => dispatch => {
    dispatch(signOutRequest());
    eraseCookie(AUTH_TOKEN);
    eraseCookie(TOKEN_NAME);
    fetch(LOGOUT_USER_URL, {
        credentials: 'include',
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
    })
        .then(
        res => {
            dispatch(signOutSuccess());
        },
        error => {
            dispatch(signOutFailure());
        }
        );
}
