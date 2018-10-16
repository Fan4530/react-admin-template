export const LOAD_LEFT_BANNER_REQUEST = 'LOAD_LEFT_BANNER_REQUEST';
export const LOAD_LEFT_BANNER_SUCCESS = 'LOAD_LEFT_BANNER_SUCCESS';
export const LOAD_LEFT_BANNER_FAILURE = 'LOAD_LEFT_BANNER_FAILURE';
import 'whatwg-fetch';

export const loadLeftBannerRequest = payload => ({
    type: LOAD_LEFT_BANNER_REQUEST,
    payload
})

export const loadLeftBannerSuccess = payload => ({
    type: LOAD_LEFT_BANNER_SUCCESS,
    payload
})

export const loadLeftBannerFailure = payload => ({
    type: LOAD_LEFT_BANNER_FAILURE,
    payload
})

