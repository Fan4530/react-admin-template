import _ from 'lodash'

export const initialState = {
	data: [],
	isLoading: false,
	isErrored: false
}

import {
	LOAD_TOP_BANNERS_REQUEST,
	LOAD_TOP_BANNERS_SUCCESS,
	LOAD_TOP_BANNERS_FAILURE 
} from '../actions/actions-top_banners.js';

export const topBanners = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOP_BANNERS_REQUEST:
			return _.merge({}, state, {
				isLoading: true,
				isErrored: false,
			});
		case LOAD_TOP_BANNERS_SUCCESS:
            return  _.merge({}, {
				data: action.payload
			}, {
				isLoading: false,
				isErrored: false
			});
        case LOAD_TOP_BANNERS_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true,
			});
    }
    return state;
};


