import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_RELATED_USERS_REQUEST,
	LOAD_RELATED_USERS_SUCCESS,
	LOAD_RELATED_USERS_FAILURE
} from '../actions/actions-related_users.js';

import {
    LOAD_FEATURED_DOTS_SUCCESS
} from '../actions/actions-featured_dots.js';

export const relatedUsers = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_RELATED_USERS_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_RELATED_USERS_SUCCESS:
			return _.merge({}, {
				data: action.payload,
				isLoading: false,
				isErrored: false
			});
		case LOAD_RELATED_USERS_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
        case LOAD_FEATURED_DOTS_SUCCESS: {
            return _.merge({}, {
                data: action.payload.data.relatedUsers
            })
        }
	}
	return state;
};

