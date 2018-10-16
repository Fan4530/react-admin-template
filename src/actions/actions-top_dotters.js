export const LOAD_TOP_DOTTERS_REQUEST = 'LOAD_TOP_DOTTERS_REQUEST';
export const LOAD_TOP_DOTTERS_SUCCESS = 'LOAD_TOP_DOTTERS_SUCCESS';
export const LOAD_TOP_DOTTERS_FAILURE = 'LOAD_TOP_DOTTERS_FAILURE';
import 'whatwg-fetch';

export const loadTopDottersRequest = payload => ({
    type: LOAD_TOP_DOTTERS_REQUEST,
    payload
});

export const loadTopDottersSuccess = payload => ({
    type: LOAD_TOP_DOTTERS_SUCCESS,
    payload
});

export const loadTopDottersFailure = payload => ({
    type: LOAD_TOP_DOTTERS_FAILURE,
    payload
});


