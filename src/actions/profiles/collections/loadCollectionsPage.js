import { LOAD_COLLECTIONS_PAGE_FOR_PROFILE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { addPage } from '../../pages/addPage.js';

import { PROFILE_COLLECTIONS_PAGE_SIZE } from '../../../constants.js';
import { SORT_PROFILE_COLLECTIONS_BY } from '../../../constants.js';

export const LOAD_COLLECTIONS_PAGE_FOR_PROFILE_REQUEST = 'LOAD_COLLECTIONS_PAGE_FOR_PROFILE_REQUEST';
export const LOAD_COLLECTIONS_PAGE_FOR_PROFILE_SUCCESS = 'LOAD_COLLECTIONS_PAGE_FOR_PROFILE_SUCCESS';
export const LOAD_COLLECTIONS_PAGE_FOR_PROFILE_FAILURE = 'LOAD_COLLECTIONS_PAGE_FOR_PROFILE_FAILURE';

export const loadCollectionsPageForProfileRequest = payload => ({
    type: LOAD_COLLECTIONS_PAGE_FOR_PROFILE_REQUEST,
    payload
});

export const loadCollectionsPageForProfileSuccess = payload => ({
    type: LOAD_COLLECTIONS_PAGE_FOR_PROFILE_SUCCESS,
    payload
});

export const loadCollectionsPageForProfileFailure = payload => ({
    type: LOAD_COLLECTIONS_PAGE_FOR_PROFILE_FAILURE,
    payload
});

export const loadCollectionsPageForProfile = data => (dispatch, getState) => {
    dispatch(loadCollectionsPageForProfileRequest({ ...data}));
    const { id } = data;
    const volume = 'collections';

    const url = LOAD_COLLECTIONS_PAGE_FOR_PROFILE_URL;
    const pageSize = PROFILE_COLLECTIONS_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume: 'dots' });
    const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "userId",
                "operator": "=",
                "value": id
            }
        ],
        "sort": {
            "fieldName": SORT_PROFILE_COLLECTIONS_BY,
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
                dispatch(loadCollectionsPageForProfileFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load dots page profile error', error);
            dispatch(loadCollectionsPageForProfileFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadCollectionsPageForProfileSuccess({ id, collections: getResponseData(response) }))
            dispatch(addPage({ id, records: getResponseData(response).map(collection => collection.id), volume, pageSize }))
        } else {
            dispatch(loadCollectionsPageForProfileFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load dots page profile error', error);
    });
};

