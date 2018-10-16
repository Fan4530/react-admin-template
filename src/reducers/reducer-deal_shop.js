import _ from 'lodash';

export const initialState = {
    data: [],
    isLoading: false,
    isErrored: false,
};

import {
    LOAD_DEALSHOP_BY_DOMAIN_REQUEST,
    LOAD_DEALSHOP_BY_DOMAIN_SUCCESS,
    LOAD_DEALSHOP_BY_DOMAIN_FAILURE
} from '../actions/actions-deal_shop.js';

export const dealShop = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_DEALSHOP_BY_DOMAIN_REQUEST:
            return _.merge({}, state, {
                isLoading: true,
                isErrored: false
            });
        case LOAD_DEALSHOP_BY_DOMAIN_SUCCESS:
            const domain = action.payload && action.payload.domain;
            let newState = _.merge({}, state);
            newState.isLoading = false;
            newState.isErrored = false;
            if (domain) {
                newState.data[domain] = action.payload;
            }
            return newState;
        case LOAD_DEALSHOP_BY_DOMAIN_FAILURE:
            return _.merge({}, state, {
                isLoading: false,
                isErrored: true
            });
    }
    return state;
};