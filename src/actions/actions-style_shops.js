export const LOAD_STYLE_SHOPS_REQUEST = 'LOAD_STYLE_SHOPS_REQUEST';
export const LOAD_STYLE_SHOPS_SUCCESS = 'LOAD_STYLE_SHOPS_SUCCESS';
export const LOAD_STYLE_SHOPS_FAILURE = 'LOAD_STYLE_SHOPS_FAILURE';
import 'whatwg-fetch';

export const loadStyleShopsRequest = payload => ({
    type: LOAD_STYLE_SHOPS_REQUEST,
    payload
})

export const loadStyleShopsSuccess = payload => ({
    type: LOAD_STYLE_SHOPS_SUCCESS,
    payload
})

export const loadStyleShopsFailure = payload => ({
    type: LOAD_STYLE_SHOPS_FAILURE,
    payload
})

