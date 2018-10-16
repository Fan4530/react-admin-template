import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_DOT_TABS_REQUEST,
	LOAD_DOT_TABS_SUCCESS,
	LOAD_DOT_TABS_FAILURE
} from '../actions/actions-dot_tabs.js';

export const dotTabs = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DOT_TABS_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_DOT_TABS_SUCCESS:
			return _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
		case LOAD_DOT_TABS_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

