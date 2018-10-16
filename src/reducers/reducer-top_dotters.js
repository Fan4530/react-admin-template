import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_TOP_DOTTERS_REQUEST,
	LOAD_TOP_DOTTERS_SUCCESS,
	LOAD_TOP_DOTTERS_FAILURE
} from '../actions/actions-top_dotters.js';

export const topDotters = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TOP_DOTTERS_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_TOP_DOTTERS_SUCCESS:
			return _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
		case LOAD_TOP_DOTTERS_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

