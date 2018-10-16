import { CONFIRM_PASSWORD_URL } from '../../urls.js';
import 'whatwg-fetch';

export const CONFIRM_PASSWORD_REQUEST = 'CONFIRM_PASSWORD_REQUEST';
export const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
export const CONFIRM_PASSWORD_FAILURE = 'CONFIRM_PASSWORD_FAILURE';

export const confirmPasswordRequest = payload => ({
    type: CONFIRM_PASSWORD_REQUEST,
    payload
});

export const confirmPasswordSuccess = payload => ({
    type: CONFIRM_PASSWORD_SUCCESS,
    payload
});

export const confirmPasswordFailure = payload => ({
    type: CONFIRM_PASSWORD_FAILURE,
    payload
});

export const confirmPassword = ({ password, passwordConfirmation, id }) => dispatch => {
    dispatch(confirmPasswordRequest({ password, id }));
    if (password !== passwordConfirmation) {
        dispatch(confirmPasswordFailure({ password, id, message: 'Your password and confirmation password do not match.' }));
    } else { 
    fetch(CONFIRM_PASSWORD_URL, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `password=${password}&id=${id}`
    })
        .then(
            () => {
                dispatch(confirmPasswordSuccess({ password, id }));
            },
            () => {
                dispatch(confirmPasswordFailure({ password, id }));
            }
        );
    }
};