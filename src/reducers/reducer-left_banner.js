import _ from 'lodash'

export const initialState = {
	data: {},
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_LEFT_BANNER_REQUEST,
	LOAD_LEFT_BANNER_SUCCESS,
	LOAD_LEFT_BANNER_FAILURE
} from '../actions/actions-left_banner.js';

export const leftBanner = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_LEFT_BANNER_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_LEFT_BANNER_SUCCESS:
			return _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
		case LOAD_LEFT_BANNER_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

