// Modules
import { SEND_EMAIL_URL } from '../urls.js';
import 'whatwg-fetch';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const sendEmailRequest = payload => ({
    type: SEND_EMAIL_REQUEST,
    payload
})

export const sendEmailSuccess = payload => ({
    type: SEND_EMAIL_SUCCESS,
    payload
})

export const sendEmailFailure = payload => ({
    type: SEND_EMAIL_FAILURE,
    payload
})

// Send email
export const sendEmail = (dotId, dotType, message, name, to) => dispatch => {
    dispatch(sendEmailRequest());

    let data = {
        dotId,
        dotTypeId: dotType,
        message,
        name,
        to
    };

    console.log('data:', data);

    fetch(SEND_EMAIL_URL, { 
        body: JSON.stringify(data),
        method: 'post', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse && 
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(sendEmailSuccess());
            } else {
                dispatch(sendEmailFailure());
            }
        })
        .catch(error => {
            dispatch(sendEmailFailure());
        });
}
