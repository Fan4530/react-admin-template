import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false
};

import {
	LOAD_TOP_SHOPS_REQUEST,
	LOAD_TOP_SHOPS_SUCCESS,
	LOAD_TOP_SHOPS_FAILURE,
} from '../actions/actions-top_shops.js';

export const topShops = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOP_SHOPS_REQUEST:
			return _.merge({}, state, {
				isLoading: true,
				isErrored: false
			});
        case LOAD_TOP_SHOPS_SUCCESS:
            return _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
        case LOAD_TOP_SHOPS_SUCCESS:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
    }
    return state;
};


