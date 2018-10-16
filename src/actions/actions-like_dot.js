// Modules
import { LIKE_DOT_URL, UNLIKE_DOT_URL } from '../urls.js';
import { loadProfile } from './actions-profile.js';
import { signOut } from "../actions/auth/signOut";
import { getProfileById } from './actions-profiles.js';
import 'whatwg-fetch';

export const LIKE_DOT_REQUEST = 'LIKE_DOT_REQUEST';
export const LIKE_DOT_SUCCESS = 'LIKE_DOT_SUCCESS';
export const LIKE_DOT_FAILURE = 'LIKE_DOT_FAILURE';

export const likeDotRequest = payload => ({
    type: LIKE_DOT_REQUEST,
    payload
});

export const likeDotSuccess = payload => ({
    type: LIKE_DOT_SUCCESS,
    payload
});

export const likeDotFailure = payload => ({
    type: LIKE_DOT_FAILURE,
    payload
});

export const UNLIKE_DOT_REQUEST = 'UNLIKE_DOT_REQUEST';
export const UNLIKE_DOT_SUCCESS = 'UNLIKE_DOT_SUCCESS';
export const UNLIKE_DOT_FAILURE = 'UNLIKE_DOT_FAILURE';

export const unlikeDotRequest = payload => ({
    type: UNLIKE_DOT_REQUEST,
    payload
});

export const unlikeDotSuccess = payload => ({
    type: UNLIKE_DOT_SUCCESS,
    payload
});

export const unlikeDotFailure = payload => ({
    type: UNLIKE_DOT_FAILURE,
    payload
});

// Like dot
export const likeDot = (id, type, path) => (dispatch, getState) => {
    let payload = { id };
    dispatch(likeDotRequest(payload));

    let data = {
        id,
        type
    };

    fetch(LIKE_DOT_URL, {
        body: JSON.stringify(data),
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
        response => response.json(),
        error => {
            let payload = { id };
            dispatch(likeDotFailure(payload));
        }
        )
        .then(response => {
            console.log('like dot response', response);
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    id,
                    type,
                    path
                };
                dispatch(likeDotSuccess(payload));
                dispatch(loadProfile());
                dispatch(getProfileById(getState().user.data.id));
            } else {
                let payload = { id };
                dispatch(likeDotFailure(payload));
            }
        })
        .catch(error => {
            console.log('like dot error', error);
        });
}

// Unlike dot
export const unlikeDot = (id, type, path) => (dispatch, getState) => {
    let payload = { id };
    dispatch(unlikeDotRequest(payload));

    let data = {
        id,
        type
    };

    fetch(UNLIKE_DOT_URL, {
        body: JSON.stringify(data),
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
        response => response.json(),
        error => {
            let payload = { id };
            dispatch(unlikeDotFailure(payload));
        }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    id,
                    type,
                    path
                };
                dispatch(unlikeDotSuccess(payload));
                dispatch(loadProfile());
                dispatch(getProfileById(getState().user.data.id));
            } else {
                let payload = { id };
                dispatch(unlikeDotFailure(payload));
            }
        })
        .catch(error => {
            console.log('ulike dot error', error);
        });
};

// Route like button action
export const routeLikeDot = (id, type, path) => (dispatch, getState) => {
    if (getState().user.data.name === "anonymous") {
        dispatch(signOut());
        return;
    }

    let likedDots = getState().user.data.likes;

    if (likedDots) {
        for (let dot of likedDots) {
            if (dot.id === id) {
                dispatch(unlikeDot(id, type, path));
                return;
            }
        }
    }

    dispatch(likeDot(id, type, path));
};
