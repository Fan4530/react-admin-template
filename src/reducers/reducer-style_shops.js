import _ from 'lodash'
import {
    LOAD_STYLE_SHOPS_FAILURE,
    LOAD_STYLE_SHOPS_REQUEST,
    LOAD_STYLE_SHOPS_SUCCESS
} from '../actions/actions-style_shops.js';

export const initialState = {
    data: [],
    isLoading: false,
    isErrored: false,
};

export const styleShops = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_STYLE_SHOPS_REQUEST:
            return _.merge({}, state, {
                isLoading: true,
                isErrored: false
            });
        case LOAD_STYLE_SHOPS_SUCCESS:
            return _.merge({}, {
                data: action.payload
            }, {
                isLoading: false,
                isErrored: false
            });
        case LOAD_STYLE_SHOPS_FAILURE:
            return _.merge({}, state, {
                isLoading: false,
                isErrored: true
            });
    }
    return state;
};

