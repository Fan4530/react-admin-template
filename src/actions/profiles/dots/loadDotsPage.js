import { LOAD_DOTS_PAGE_FOR_PROFILE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { addPage } from '../../pages/addPage.js';

import { PROFILE_DOTS_PAGE_SIZE } from '../../../constants.js';
import { SORT_PROFILE_DOTS_BY } from '../../../constants.js';

export const LOAD_DOTS_PAGE_FOR_PROFILE_REQUEST = 'LOAD_DOTS_PAGE_FOR_PROFILE_REQUEST';
export const LOAD_DOTS_PAGE_FOR_PROFILE_SUCCESS = 'LOAD_DOTS_PAGE_FOR_PROFILE_SUCCESS';
export const LOAD_DOTS_PAGE_FOR_PROFILE_FAILURE = 'LOAD_DOTS_PAGE_FOR_PROFILE_FAILURE';

export const loadDotsPageForProfileRequest = payload => ({
    type: LOAD_DOTS_PAGE_FOR_PROFILE_REQUEST,
    payload
});

export const loadDotsPageForProfileSuccess = payload => ({
    type: LOAD_DOTS_PAGE_FOR_PROFILE_SUCCESS,
    payload
});

export const loadDotsPageForProfileFailure = payload => ({
    type: LOAD_DOTS_PAGE_FOR_PROFILE_FAILURE,
    payload
});

export const loadDotsPageForProfile = data => (dispatch, getState) => {
    dispatch(loadDotsPageForProfileRequest({ ...data}));
    const { id, username } = data;
    const volume = 'dots';

    const url = LOAD_DOTS_PAGE_FOR_PROFILE_URL;
    const pageSize = PROFILE_DOTS_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume: 'dots' });
    const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "dotUserId",
                "operator": "=",
                "value": id
            }
        ],
        "sort": {
            "fieldName": SORT_PROFILE_DOTS_BY,
            "ascending": false
        },
        "pageNumber": nextPage,
        "pageSize": pageSize
    });
    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then(
        response => {
            if (checkResponse(response)) {
                return response.json();
            } else {
                dispatch(loadDotsPageForProfileFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load dots page profile error', error);
            dispatch(loadDotsPageForProfileFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadDotsPageForProfileSuccess({ id, username, dots: getResponseData(response) }))
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }))
        } else {
            dispatch(loadDotsPageForProfileFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load dots page profile error', error);
    });
};

