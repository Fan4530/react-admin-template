import { LOAD_NOTIFICATIONS_READ } from '../../urls';
import {loadNotificationOnce, saveNotificationFailure, saveNotificationSuccess} from "../actions-notification";

export const SEND_NOTIFICATION_READ_REQUEST = 'SEND_NOTIFICATION_READ_REQUEST';
export const SEND_NOTIFICATION_READ_SUCCESS = 'SEND_NOTIFICATION_READ_SUCCESS';
export const SEND_NOTIFICATION_READ_FAILURE = 'SEND_NOTIFICATION_READ_FAILURE';

export const sendNotificationReadRequest = payload => ({
    type: SEND_NOTIFICATION_READ_REQUEST,
    payload
});

export const sendNotificationReadSuccess = payload => ({
    type: SEND_NOTIFICATION_READ_SUCCESS,
    payload
});

export const sendNotificationReadFailure = payload => ({
    type: SEND_NOTIFICATION_READ_FAILURE,
    payload
});

export const notificationRead = notiId => dispatch => {
    ///console.log(notiId);
    let payload = { notiId };
    dispatch(sendNotificationReadRequest(payload));

    let body = JSON.stringify(notiId);
    fetch(LOAD_NOTIFICATIONS_READ, {
        method: 'PUT',
        credentials: 'include',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(sendNotificationReadSuccess(payload));
            } else {
                dispatch(sendNotificationReadFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(sendNotificationReadFailure(payload));
        });
};
