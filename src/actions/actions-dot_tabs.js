export const LOAD_DOT_TABS_REQUEST = 'LOAD_DOT_TABS_REQUEST';
export const LOAD_DOT_TABS_SUCCESS = 'LOAD_DOT_TABS_SUCCESS';
export const LOAD_DOT_TABS_FAILURE = 'LOAD_DOT_TABS_FAILURE';
import 'whatwg-fetch';

export const loadDotTabsRequest = payload => ({
    type: LOAD_DOT_TABS_REQUEST,
    payload
})

export const loadDotTabsSuccess = payload => ({
    type: LOAD_DOT_TABS_SUCCESS,
    payload
})

export const loadDotTabsFailure = payload => ({
    type: LOAD_DOT_TABS_FAILURE,
    payload
})

