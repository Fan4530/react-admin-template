// Modules
import { FOLLOW_USER_URL, UNFOLLOW_USER_URL } from '../urls.js';
import { loadProfile } from './actions-profile.js';
import { signOut } from "../actions/auth/signOut";
import 'whatwg-fetch';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const followUserRequest = payload => ({
    type: FOLLOW_USER_REQUEST,
    payload
});

export const followUserSuccess = payload => ({
    type: FOLLOW_USER_SUCCESS,
    payload
});

export const followUserFailure = payload => ({
    type: FOLLOW_USER_FAILURE,
    payload
});

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const unfollowUserRequest = payload => ({
    type: UNFOLLOW_USER_REQUEST,
    payload
});

export const unfollowUserSuccess = payload => ({
    type: UNFOLLOW_USER_SUCCESS,
    payload
});

export const unfollowUserFailure = payload => ({
    type: UNFOLLOW_USER_FAILURE,
    payload
});

// Follow user
export const followUser = (id, type) => dispatch => {
    dispatch(followUserRequest());

    let data = {
        id,
        type
    };

    fetch(FOLLOW_USER_URL, { 
        body: JSON.stringify(data),
        method: 'post', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse && 
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(followUserSuccess({ id }));
                dispatch(loadProfile());
            } else {
                dispatch(followUserFailure());
            }
        })
        .catch(error => {
            dispatch(followUserFailure());
        });
};

// Unfollow user
export const unfollowUser = (id, type) => dispatch => {
    dispatch(unfollowUserRequest());

    let data = {
        id,
        type
    };

    fetch(UNFOLLOW_USER_URL, { 
        body: JSON.stringify(data),
        method: 'post', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse && 
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(unfollowUserSuccess({ id }));
                dispatch(loadProfile());
            } else {
                dispatch(unfollowUserFailure());
            }
        })
        .catch(error => {
            dispatch(unfollowUserFailure());
        });
}

// Route follow button action
export const routeFollowUser = (id, type) => (dispatch, getState) => {
    if (getState().user.data.name === "anonymous") {
        dispatch(signOut());
        return;
    }

    let followingsUserIds = getState().user.data.userStat.followingsUserIds;

    if (followingsUserIds) {
        for (let userId of followingsUserIds) {
            if (userId === id) {
                dispatch(unfollowUser(id, type));
                return;
            }
        }
    }

    dispatch(followUser(id, type));
}
