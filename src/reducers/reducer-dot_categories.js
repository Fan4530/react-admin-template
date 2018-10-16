import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_DOT_CATEGORIES_REQUEST,
	LOAD_DOT_CATEGORIES_SUCCESS,
	LOAD_DOT_CATEGORIES_FAILURE
} from '../actions/actions-dot.js';

export const dotCategories = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DOT_CATEGORIES_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_DOT_CATEGORIES_SUCCESS:
			return _.merge({}, {
                data: action.payload.data,
				isLoading: false,
				isErrored: false
			});
		case LOAD_DOT_CATEGORIES_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

