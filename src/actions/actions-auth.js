import { SEND_INVITE_URL } from '../urls.js';
import 'whatwg-fetch';

export const SEND_INVITE_REQUEST = 'SEND_INVITE_REQUEST';
export const SEND_INVITE_SUCCESS = 'SEND_INVITE_SUCCESS';
export const SEND_INVITE_FAILURE = 'SEND_INVITE_FAILURE';

export const sendInviteRequest = payload => ({
    type: SEND_INVITE_REQUEST,
    payload
});

export const sendInviteSuccess = payload => ({
    type: SEND_INVITE_SUCCESS,
    payload
});

export const sendInviteFailure = payload => ({
    type: SEND_INVITE_FAILURE,
    payload
});

export const sendInvite = email => dispatch => {
    let payload = { email };
    dispatch(sendInviteRequest(payload));

    let body = JSON.stringify({ email: email });
    fetch(SEND_INVITE_URL, {
        method: 'post',
        credentials: 'include',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            dispatch(sendInviteSuccess(payload));
        })
        .catch(error => {
            console.log(error);
            dispatch(sendInviteFailure(payload));
        });
};
