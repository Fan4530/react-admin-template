import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_DEAL_SHOPS_REQUEST,
	LOAD_DEAL_SHOPS_SUCCESS,
	LOAD_DEAL_SHOPS_FAILURE
} from '../actions/actions-deal_shops.js';

export const dealShops = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DEAL_SHOPS_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_DEAL_SHOPS_SUCCESS:
			return _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
		case LOAD_DEAL_SHOPS_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

