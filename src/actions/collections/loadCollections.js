import { LOAD_COLLECTIONS_BY_IDS_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { pushCollections } from './pushCollections.js';

import { PROFILE_COLLECTIONS_PAGE_SIZE } from '../../../constants.js';
import { SORT_PROFILE_COLLECTIONS_BY } from '../../../constants.js';

export const LOAD_COLLECTIONS_BY_IDS_REQUEST = 'LOAD_COLLECTIONS_BY_IDS_REQUEST';
export const LOAD_COLLECTIONS_BY_IDS_SUCCESS = 'LOAD_COLLECTIONS_BY_IDS_SUCCESS';
export const LOAD_COLLECTIONS_BY_IDS_FAILURE = 'LOAD_COLLECTIONS_BY_IDS_FAILURE';

export const loadCollectionsByIdsRequest = payload => ({
    type: LOAD_COLLECTIONS_BY_IDS_REQUEST,
    payload
});

export const loadCollectionsByIdsSuccess = payload => ({
    type: LOAD_COLLECTIONS_BY_IDS_SUCCESS,
    payload
});

export const loadCollectionsByIdsFailure = payload => ({
    type: LOAD_COLLECTIONS_BY_IDS_FAILURE,
    payload
});

export const loadCollectionsByIds = data => dispatch => {
    dispatch(loadCollectionsByIdsRequest({ ...data}));
    const { ids } = data;

    const url = LOAD_COLLECTIONS_BY_IDS_URL;
    const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "userId",
                "operator": "id",
                "value": ids.join(',')
            }
        ],
        "pageNumber": 0,
        "pageSize": 1000000
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
                dispatch(loadCollectionsByIdsFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load dots page profile error', error);
            dispatch(loadCollectionsByIdsFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadCollectionsByIdsSuccess({ collections: getResponseData(response) }));
            dispatch(pushCollections({ collections: getResponseData(response) }));
        } else {
            dispatch(loadCollectionsByIdsFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load collections by ids error:', error);
    });
};

