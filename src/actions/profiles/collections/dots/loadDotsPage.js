import { LOAD_DOTS_PAGE_FOR_COLLECTION_URL } from '../../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../../utils.js';
import { checkStatus } from '../../../auth/checkStatus.js';
import { addPage } from '../../../pages/addPage.js';

import { PROFILE_DOTS_PAGE_SIZE } from '../../../../constants.js';
import { SORT_COLLECTION_DOTS_BY } from '../../../../constants.js';

export const LOAD_DOTS_PAGE_FOR_COLLECTION_REQUEST = 'LOAD_DOTS_PAGE_FOR_COLLECTION_REQUEST';
export const LOAD_DOTS_PAGE_FOR_COLLECTION_SUCCESS = 'LOAD_DOTS_PAGE_FOR_COLLECTION_SUCCESS';
export const LOAD_DOTS_PAGE_FOR_COLLECTION_FAILURE = 'LOAD_DOTS_PAGE_FOR_COLLECTION_FAILURE';

export const loadDotsPageForCollectionRequest = payload => ({
    type: LOAD_DOTS_PAGE_FOR_COLLECTION_REQUEST,
    payload
});

export const loadDotsPageForCollectionSuccess = payload => ({
    type: LOAD_DOTS_PAGE_FOR_COLLECTION_SUCCESS,
    payload
});

export const loadDotsPageForCollectionFailure = payload => ({
    type: LOAD_DOTS_PAGE_FOR_COLLECTION_FAILURE,
    payload
});

export const loadDotsPageForCollection = data => (dispatch, getState) => {
    dispatch(loadDotsPageForCollectionRequest({ ...data}));
    const { id } = data;
    const volume = 'dots';

    const pageSize = PROFILE_DOTS_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume: 'dots' });
    const url = LOAD_DOTS_PAGE_FOR_COLLECTION_URL(id, nextPage, pageSize);

    fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(
        response => {
            if (checkResponse(response)) {
                return response.json();
            } else {
                dispatch(loadDotsPageForCollectionFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load dots page profile error', error);
            dispatch(loadDotsPageForCollectionFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadDotsPageForCollectionSuccess({ id, dots: getResponseData(response)[0] }));
            dispatch(addPage({ id, records: getResponseData(response)[0].map(dot => dot.id), volume, pageSize }));
        } else {
            dispatch(loadDotsPageForCollectionFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load dots page profile error', error);
    });
};

