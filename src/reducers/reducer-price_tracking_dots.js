import _ from 'lodash'

import { PRICE_TRACKING_DOTS_PAGE_SIZE } from '../constants.js';

export const initialState = {
    data: [],
    isLoading: false,
    isErrored: false,
    nextPageNumber: 0
};

import {
    LOAD_PRICE_TRACKING_DOTS_REQUEST,
    LOAD_PRICE_TRACKING_DOTS_SUCCESS,
    LOAD_PRICE_TRACKING_DOTS_FAILURE
} from '../actions/actions-price_tracking_dots.js';

export const priceTrackingDots = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRICE_TRACKING_DOTS_REQUEST:
            return _.merge({}, state, { 
                isLoading: true,
                isErrored: false,
            });
        case LOAD_PRICE_TRACKING_DOTS_SUCCESS:
            {
                state.isLoading = false;
                state.isErrored = false;
                let pageSize = PRICE_TRACKING_DOTS_PAGE_SIZE;
                let start = pageSize * (action.payload.nextPageNumber);
                state.data.splice(start, pageSize, ...action.payload.data.dots.slice(0, pageSize));
                if (action.payload.nextPageNumber >= state.nextPageNumber) state.nextPageNumber ++;
                return state;
            }
        case LOAD_PRICE_TRACKING_DOTS_FAILURE:
            return _.merge({}, state, {
                isLoading: false,
                isErrored: true
            });
    }
    return state;
};


