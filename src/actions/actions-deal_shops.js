export const LOAD_DEAL_SHOPS_REQUEST = 'LOAD_DEAL_SHOPS_REQUEST';
export const LOAD_DEAL_SHOPS_SUCCESS = 'LOAD_DEAL_SHOPS_SUCCESS';
export const LOAD_DEAL_SHOPS_FAILURE = 'LOAD_DEAL_SHOPS_FAILURE';
import 'whatwg-fetch';

export const loadDealShopsRequest = payload => ({
    type: LOAD_DEAL_SHOPS_REQUEST,
    payload
});

export const loadDealShopsSuccess = payload => ({
    type: LOAD_DEAL_SHOPS_SUCCESS,
    payload
});

export const loadDealShopsFailure = payload => ({
    type: LOAD_DEAL_SHOPS_FAILURE,
    payload
});


