// Modules
import 'whatwg-fetch';

import { deleteDot } from './actions-dot.js';
import { loadProfile } from './actions-profile.js';
import { getProfileById } from './actions-profiles.js';
import { enqueueAlert } from './alerts/enqueue.js';
import { handleResponse, handleJsonResponse } from '../utils.js';
import { somethingWrongHappened } from './auth/somethingWrongHappened.js';
import {
    AuthError, 
    IncorrectJsonError,
    SomethingWrongError,
    ComponentError
} from '../errors.js';
import { signOut } from './auth/signOut.js';
import { incrementProfileRedotCount } from './profiles/incrementRedotCount.js';
import { addRecord } from './pages/addRecord.js';
import { pushDots } from './dotStorage/pushDots.js';

import { PROFILE_DOTS_PAGE_SIZE } from '../constants.js';
import { REDOT_SUCCESS_ALERT_TEXT } from '../constants.js';
import { REDOT_URL } from '../urls.js';
import { SOMETHING_WRONG_ALERT_TEXT } from '../constants.js';
import { MAINPAGE_PAGINATION_ID } from '../constants.js';
import { loadNotificationOnce } from "./actions-notification";

export const REDOT_REQUEST = 'REDOT_REQUEST';
export const REDOT_SUCCESS = 'REDOT_SUCCESS';
export const REDOT_FAILURE = 'REDOT_FAILURE';

export const redotRequest = payload => ({
    type: REDOT_REQUEST,
    payload
});

export const redotSuccess = payload => ({
    type: REDOT_SUCCESS,
    payload
});

export const redotFailure = payload => ({
    type: REDOT_FAILURE,
    payload
});

// Add to my dots
export const redot = ({ id, type, description, collectionId}) => (dispatch, getState) => {
    dispatch(redotRequest());

    let data = {
        "collectionId": collectionId,
        "description": description,
        "objectRef": {
            "id": id,
            "type": type
        }
    };



    fetch(REDOT_URL, { 
        body: JSON.stringify(data),
        method: 'post', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(handleResponse)
        .then(response => response.json())
        .then(handleJsonResponse)
        .then(responseData => {
            // try {
                const myId = getState().user.data.id;
                const collectionName = getState().collections[collectionId].name;
                const currentDot = getState().dotStorage[id];
                const newDot = responseData[0];

                dispatch(redotSuccess());
                if (currentDot.dotUserId !== undefined) {
                    dispatch(incrementProfileRedotCount({ id: currentDot.dotUserId }));
                }
                dispatch(pushDots({ dots: [ newDot ] }));
                dispatch(addRecord({ id: myId, volume: 'dots', record: newDot.id, pageSize: PROFILE_DOTS_PAGE_SIZE }));
                dispatch(addRecord({ id: MAINPAGE_PAGINATION_ID, volume: 'featured', record: newDot.id, pageSize: PROFILE_DOTS_PAGE_SIZE }));
                dispatch(addRecord({ id: MAINPAGE_PAGINATION_ID, volume: 'all', record: newDot.id, pageSize: PROFILE_DOTS_PAGE_SIZE }));
                dispatch(enqueueAlert({ alert: { text: REDOT_SUCCESS_ALERT_TEXT({ collectionName }) } }));
                dispatch(loadNotificationOnce());
            // } catch (e) {
            //     return Promise.reject(new ComponentError(e.message));
            // }
        })
        .catch(error => {
            console.error('redot error:', error);
            switch (true) {
                case error instanceof SomethingWrongError:
                case error instanceof IncorrectJsonError:
                    dispatch(redotFailure());
                    dispatch(somethingWrongHappened());
                    dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
                    break;
                case error instanceof AuthError:
                    dispatch(redotFailure());
                    dispatch(signOut());
                    break;
                case error instanceof ComponentError:
                    // Do nothing.
                    break;
                default:
                    dispatch(redotFailure());
                    dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
            }
        });
};

export const routeRedot = data => (dispatch, getState) => {
    dispatch(redot(data));
};
