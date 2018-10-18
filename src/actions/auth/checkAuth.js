import { getCookie, clearCache } from '../../utils/utils.js';
import { signOut } from './signOut.js';
import { AUTH_TOKEN } from '../../utils/constants.js';
import { checkResponse, getResponseData, checkResponseJson } from '../../utils/utils.js';
import 'whatwg-fetch';
import { CHECK_AUTH_URL } from '../../utils/urls.js';

import { FOR_LOCALHOST } from '../../utils/constants.js';

export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = 'CHECK_AUTH_FAILURE';

export const checkAuthRequest = payload => ({
    type: CHECK_AUTH_REQUEST,
    payload
});

export const checkAuthSuccess = payload => ({
    type: CHECK_AUTH_SUCCESS,
    payload
});

export const checkAuthFailure = payload => ({
    type: CHECK_AUTH_FAILURE,
    payload
});

export const checkAuth = () => (dispatch, getState) => {
   /// console.log('CHECK AUTHENTICATION');
    dispatch(checkAuthRequest());

    const token = getCookie(AUTH_TOKEN);
    if (!token) {
       /// console.log('tockes is not equal', savedToken, token);
        fetch(CHECK_AUTH_URL, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(
            response => {
                ///console.log('CHECK AUTH', response);
                return response.json();
            },
            error => {
                if (!FOR_LOCALHOST) {
                    //dispatch(signOut());
                    clearCache();
                }
                dispatch(checkAuthFailure());
                return Promise.reject();
            }
        )
        .then(response => {
         ///   console.log('CHECK AUTH json', response);
            if (checkResponseJson(response)) {

                dispatch(checkAuthSuccess({ token }));
            } else {

                if (!FOR_LOCALHOST) {
                    //dispatch(signOut());
                    clearCache();
                }
                dispatch(checkAuthFailure());
            }
        })
        .catch(error => {
           // console.log('check auth error', error);
            if (!FOR_LOCALHOST) {
                //dispatch(signOut());
                clearCache();
            }
            dispatch(checkAuthFailure());
        });
    } else {
        //console.log('tokens are equal');
        dispatch(checkAuthSuccess({ token }));
    }
};
