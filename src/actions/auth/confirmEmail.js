import { CONFIRM_EMAIL_URL } from '../../utils/urls.js';
import 'whatwg-fetch';

export const CONFIRM_EMAIL_REQUEST = 'CONFIRM_EMAIL_REQUEST';
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS';
export const CONFIRM_EMAIL_FAILURE = 'CONFIRM_EMAIL_FAILURE';

export const confirmEmailRequest = payload => ({
    type: CONFIRM_EMAIL_REQUEST,
    payload
});

export const confirmEmailSuccess = payload => ({
    type: CONFIRM_EMAIL_SUCCESS,
    payload
});

export const confirmEmailFailure = payload => ({
    type: CONFIRM_EMAIL_FAILURE,
    payload
});

export const confirmEmail = ({ id }) => dispatch => {
    dispatch(confirmEmailRequest({ id }));
    fetch(CONFIRM_EMAIL_URL, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `id=${id}`
    })
        .then(
            () => {
                dispatch(confirmEmailSuccess({ id }));
            },
            () => {
                dispatch(confirmEmailFailure({ id }));
            }
        );
};
