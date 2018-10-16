import _ from 'lodash'

export const initialState = {
	data: {},
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_DEFAULT_RETAILER_REQUEST,
	LOAD_DEFAULT_RETAILER_SUCCESS,
	LOAD_DEFAULT_RETAILER_FAILURE
} from '../actions/actions-default_retailer.js';

export const defaultRetailer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DEFAULT_RETAILER_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_DEFAULT_RETAILER_SUCCESS:
			return _.merge({}, {
				data: action.payload,
				isLoading: false,
				isErrored: false
			});
		case LOAD_DEFAULT_RETAILER_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

