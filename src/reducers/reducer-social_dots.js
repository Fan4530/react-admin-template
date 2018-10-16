import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_SOCIAL_DOTS_REQUEST,
	LOAD_SOCIAL_DOTS_SUCCESS,
	LOAD_SOCIAL_DOTS_FAILURE
} from '../actions/actions-social_dots.js';

export const socialDots = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SOCIAL_DOTS_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_SOCIAL_DOTS_SUCCESS:
			return _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
		case LOAD_SOCIAL_DOTS_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

