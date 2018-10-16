// Modules
import { LOAD_NOTIFICATIONS_URL } from '../urls.js';
import { FOR_LOCALHOST } from '../constants.js';
import { LOAD_NOTIFICATIONS_SUCCESS_INTERVAL, LOAD_NOTIFICATIONS_FAILURE_INTERVAL } from '../intervals.js';
import { checkStatus } from './auth/checkStatus.js';
import { checkResponseJson, getResponseData, getNextPage } from '../utils.js';
import { checkResponse } from './auth/checkResponse.js';
import { somethingWrongHappened } from './auth/somethingWrongHappened.js';
import { checkAuth } from './auth/checkAuth.js';
import 'whatwg-fetch';
import { SAVE_NOTIFICATION_URL } from '../urls.js';

export const LOAD_NOTIFICATIONS_REQUEST = 'LOAD_NOTIFICATIONS_REQUEST';
export const LOAD_NOTIFICATIONS_SUCCESS = 'LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_FAILURE = 'LOAD_NOTIFICATIONS_FAILURE';

export const loadNotificationsRequest = payload => ({
    type: LOAD_NOTIFICATIONS_REQUEST,
    payload
});

export const loadNotificationsSuccess = payload => ({
    type: LOAD_NOTIFICATIONS_SUCCESS,
    payload
});

export const loadNotificationsFailure = payload => ({
    type: LOAD_NOTIFICATIONS_FAILURE,
    payload
});

// Load profile
export const loadNotifications = () => (dispatch, getState) => {
    if (FOR_LOCALHOST) return;
    if (!getState().auth.loggedIn) return;
    dispatch(loadNotificationsRequest());

    fetch(LOAD_NOTIFICATIONS_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3006'
        }
    })
        .then(
            response => {
              ///  console.log('CHECK RESPONSE', checkResponse(response, dispatch));
                if (checkResponse(response, dispatch)) {
                    return response.json();
                } else {
                    dispatch(loadNotificationsFailure());
                    return Promise.reject();
                }
            },
            error => {
                console.log('load notifications error', error);
                dispatch(loadNotificationsFailure());
                setTimeout(() => {
                    dispatch(loadNotifications());
                }, LOAD_NOTIFICATIONS_FAILURE_INTERVAL);
                dispatch(somethingWrongHappened());
                return Promise.reject();
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let newNotifications = [];
                for (let newNotification of response.ServiceResponse.responseData[3].newNotifications) {
                    for (let notification of response.ServiceResponse.responseData[0].notifications[0][newNotification.type]) {
                        if (notification.id === newNotification.id) {
                            newNotifications.push(notification);
                            break;
                        }
                    }
                }
                let data = {
                    notifications: response.ServiceResponse.responseData[0].notifications[0],
                    relatedUsers: response.ServiceResponse.responseData[1].relatedUsers,
                    relatedDots: response.ServiceResponse.responseData[2].relatedDots,
                    newNotifications,
                    notificationsCount: newNotifications.length,
                    hasNotification: response.ServiceResponse.responseData[0].notifications[0].NOTIFICATIONS.length > 0
                };
                if (data.notificationsCount === 0 && !data.hasNotification) {
                    dispatch(saveNotification());
                }
                let payload = { data };
                dispatch(loadNotificationsSuccess(payload));
                setTimeout(() => {
                    dispatch(loadNotifications());
                }, LOAD_NOTIFICATIONS_SUCCESS_INTERVAL);
            } else {
                dispatch(loadNotificationsFailure());
                setTimeout(() => {
                    dispatch(loadNotifications());
                }, LOAD_NOTIFICATIONS_FAILURE_INTERVAL);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const loadNotificationOnce = () => dispatch => {
    dispatch(loadNotificationsRequest());

    fetch(LOAD_NOTIFICATIONS_URL, {
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
                let newNotifications = [];
                for (let newNotification of response.ServiceResponse.responseData[3].newNotifications) {
                    for (let notification of response.ServiceResponse.responseData[0].notifications[0][newNotification.type]) {
                        if (notification.id === newNotification.id) {
                            newNotifications.push(notification);
                            break;
                        }
                    }
                }
                let data = {
                    notifications: response.ServiceResponse.responseData[0].notifications[0],
                    relatedUsers: response.ServiceResponse.responseData[1].relatedUsers,
                    relatedDots: response.ServiceResponse.responseData[2].relatedDots,
                    newNotifications,
                    notificationsCount: newNotifications.length,
                    hasNotification: response.ServiceResponse.responseData[0].notifications[0].NOTIFICATIONS.length > 0
                };
                if (data.notificationsCount === 0 && !data.hasNotification) {
                    dispatch(saveNotification());
                }
                let payload = { data };
                dispatch(loadNotificationsSuccess(payload));
            } else {
                dispatch(loadNotificationsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadNotificationsFailure());
        });
};

export const SAVE_NOTIFICATION_REQUEST = 'SAVE_NOTIFICATION_REQUEST';
export const SAVE_NOTIFICATION_SUCCESS = 'SAVE_NOTIFICATION_SUCCESS';
export const SAVE_NOTIFICATION_FAILURE = 'SAVE_NOTIFICATION_FAILURE';

export const saveNotificationRequest = payload => ({
    type: SAVE_NOTIFICATION_REQUEST,
    payload
});

export const saveNotificationSuccess = payload => ({
    type: SAVE_NOTIFICATION_SUCCESS,
    payload
});

export const saveNotificationFailure = payload => ({
    type: SAVE_NOTIFICATION_FAILURE,
    payload
});

export const saveNotification = (userID) => (dispatch, getState) => {
    if (FOR_LOCALHOST) return;
    if (!getState().auth.loggedIn) return;
    dispatch(saveNotificationRequest());

    let body = JSON.stringify([
        {
            userId: userID,
            actionUserId: userID,
            effectiveDate: 131,
            expiryDate: 0,
            message: "Welcome to StuffDOT! Click to see how it works!",
            status: "NEW",
            type: "NOTIFICATIONS"
        }
    ]);

    fetch(SAVE_NOTIFICATION_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3006'
        },
        body
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let data = {
                    message: response.ServiceResponse.responseData[0].message,
                    effectiveDate: response.ServiceResponse.responseData[0].effectiveDate
                };
                let payload = { data };
                dispatch(saveNotificationSuccess(payload));
            } else {
                dispatch(saveNotificationFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(saveNotificationFailure());
        });
};
