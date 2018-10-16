import { RESET_PASSWORD_URL } from '../../urls.js';
import 'whatwg-fetch';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPasswordRequest = payload => ({
    type: RESET_PASSWORD_REQUEST,
    payload
});

export const resetPasswordSuccess = payload => ({
    type: RESET_PASSWORD_SUCCESS,
    payload
});

export const resetPasswordFailure = payload => ({
    type: RESET_PASSWORD_FAILURE,
    payload
});

export const resetPassword = ({ email }) => dispatch => {
    dispatch(resetPasswordRequest({ email }));
    fetch(RESET_PASSWORD_URL, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `email=${email}`
    })
        .then(
            res => {
                return res.json();
            },
            error => {
                dispatch(resetPasswordFailure({ email }));
            }
        )
        .then(res => {
            if (
                res &&
                res.ServiceResponse &&
                res.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(resetPasswordSuccess({ email }));
            } else {
                dispatch(resetPasswordFailure({ email }));
            }
        });
};