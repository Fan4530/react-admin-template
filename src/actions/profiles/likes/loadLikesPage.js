import { LOAD_LIKED_DOTS_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

import { PROFILE_LIKES_PAGE_SIZE } from '../../../constants.js';
import { SORT_PROFILE_LIKES_BY } from '../../../constants.js';

export const LOAD_LIKES_PAGE_FOR_PROFILE_REQUEST = 'LOAD_LIKES_PAGE_FOR_PROFILE_REQUEST';
export const LOAD_LIKES_PAGE_FOR_PROFILE_SUCCESS = 'LOAD_LIKES_PAGE_FOR_PROFILE_SUCCESS';
export const LOAD_LIKES_PAGE_FOR_PROFILE_FAILURE = 'LOAD_LIKES_PAGE_FOR_PROFILE_FAILURE';

export const loadLikesPageForProfileRequest = payload => ({
    type: LOAD_LIKES_PAGE_FOR_PROFILE_REQUEST,
    payload
});

export const loadLikesPageForProfileSuccess = payload => ({
    type: LOAD_LIKES_PAGE_FOR_PROFILE_SUCCESS,
    payload
});

export const loadLikesPageForProfileFailure = payload => ({
    type: LOAD_LIKES_PAGE_FOR_PROFILE_FAILURE,
    payload
});

export const loadLikesPageForProfile = data => (dispatch, getState) => {
    dispatch(loadLikesPageForProfileRequest({ ...data}));
    const { id } = data;
    const volume = 'likes';

    const pageSize = PROFILE_LIKES_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume });
    const url = LOAD_LIKED_DOTS_URL(id, nextPage, pageSize);
    fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(
        response => {
            if (checkResponse(response)) {
                return response.json();
            } else {
                dispatch(loadLikesPageForProfileFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load likes for profile error', error);
            dispatch(loadLikesPageForProfileFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadLikesPageForProfileSuccess({ id, dots: getResponseData(response) }))
            dispatch(pushDots({ dots: getResponseData(response) }));
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }))
        } else {
            dispatch(loadLikesPageForProfileFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load likes for profile error', error);
    });
};

