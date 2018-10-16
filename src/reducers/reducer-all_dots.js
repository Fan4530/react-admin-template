import _ from 'lodash'

import {ALL_DOTS_PAGE_SIZE} from '../constants.js';
import {LOAD_ALL_DOTS_FAILURE, LOAD_ALL_DOTS_REQUEST, LOAD_ALL_DOTS_SUCCESS} from '../actions/actions-all_dots.js';

export const initialState = {
    data: [],
    isLoading: false,
    isErrored: false,
    nextPageNumber: 0
};

export const allDots = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_DOTS_REQUEST:
            return _.merge({}, state, {
                isLoading: true,
                isErrored: false,
            });
        case LOAD_ALL_DOTS_SUCCESS: {
            state.isLoading = false;
            state.isErrored = false;
            let pageSize = ALL_DOTS_PAGE_SIZE;
            let start = pageSize * (action.payload.nextPageNumber);
            state.data.splice(start, pageSize, ...action.payload.data.dots.slice(0, pageSize));
            if (action.payload.nextPageNumber >= state.nextPageNumber) state.nextPageNumber++;
            return state;
        }
        case LOAD_ALL_DOTS_FAILURE:
            return _.merge({}, state, {
                isLoading: false,
                isErrored: true
            });
    }
    return state;
};


