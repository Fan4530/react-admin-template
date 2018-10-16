export const LOAD_RELATED_USERS_REQUEST = 'LOAD_RELATED_USERS_REQUEST';
export const LOAD_RELATED_USERS_SUCCESS = 'LOAD_RELATED_USERS_SUCCESS';
export const LOAD_RELATED_USERS_FAILURE = 'LOAD_RELATED_USERS_FAILURE';
import 'whatwg-fetch';

export const loadRelatedUsersRequest = payload => ({
    type: LOAD_RELATED_USERS_REQUEST,
    payload
})

export const loadRelatedUsersSuccess = payload => ({
    type: LOAD_RELATED_USERS_SUCCESS,
    payload
})

export const loadRelatedUsersFailure = payload => ({
    type: LOAD_RELATED_USERS_FAILURE,
    payload
})

