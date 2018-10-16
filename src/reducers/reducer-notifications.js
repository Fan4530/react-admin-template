import _ from 'lodash'

export const initialState = {
    data: {
        notificationsCount: 0,
    },
    isLoading: false,
    isErrored: false
};

import {
    LOAD_NOTIFICATIONS_REQUEST,
    LOAD_NOTIFICATIONS_SUCCESS,
    LOAD_NOTIFICATIONS_FAILURE
} from '../actions/actions-notification.js';

export const notifications = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTIFICATIONS_REQUEST:
            return _.merge({}, state, {
                isLoading: true,
                isErrored: false
            });
        case LOAD_NOTIFICATIONS_SUCCESS:
            return {
                data: action.payload.data,
                isLoading: false,
                isErrored: false
            };
        case LOAD_NOTIFICATIONS_FAILURE:
            return _.merge({}, state, {
                isLoading: false,
                isErrored: true
            });
    }
    return state;
};

