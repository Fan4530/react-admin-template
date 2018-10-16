import { LOAD_TRENDING_PAGE_FOR_MAINPAGE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

import { MAINPAGE_TRENDING_PAGE_SIZE } from '../../../constants.js';
import { MAINPAGE_PAGINATION_ID } from '../../../constants.js';
import { SORT_MAINPAGE_TRENDING_DOTS_BY } from '../../../constants.js';

export const LOAD_TRENDING_PAGE_FOR_MAINPAGE_REQUEST = 'LOAD_TRENDING_PAGE_FOR_MAINPAGE_REQUEST';
export const LOAD_TRENDING_PAGE_FOR_MAINPAGE_SUCCESS = 'LOAD_TRENDING_PAGE_FOR_MAINPAGE_SUCCESS';
export const LOAD_TRENDING_PAGE_FOR_MAINPAGE_FAILURE = 'LOAD_TRENDING_PAGE_FOR_MAINPAGE_FAILURE';

export const loadTrendingPageForMainpageRequest = payload => ({
    type: LOAD_TRENDING_PAGE_FOR_MAINPAGE_REQUEST,
    payload
});

export const loadTrendingPageForMainpageSuccess = payload => ({
    type: LOAD_TRENDING_PAGE_FOR_MAINPAGE_SUCCESS,
    payload
});

export const loadTrendingPageForMainpageFailure = payload => ({
    type: LOAD_TRENDING_PAGE_FOR_MAINPAGE_FAILURE,
    payload
});

export const loadTrendingPageForMainpage = data => (dispatch, getState) => {
    dispatch(loadTrendingPageForMainpageRequest({ ...data }));
    const { id:dotUserId, username } = data;
    const id = MAINPAGE_PAGINATION_ID;
    const volume = 'trending';

    const url = LOAD_TRENDING_PAGE_FOR_MAINPAGE_URL;
    const pageSize = MAINPAGE_TRENDING_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume });
    const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "id",
                "operator": "=",
                "value": dotUserId
            }
        ],
        "sort": {
            "fieldName": SORT_MAINPAGE_TRENDING_DOTS_BY,
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
                dispatch(loadTrendingPageForMainpageFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load trending page for mainpage error', error);
            dispatch(loadTrendingPageForMainpageFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadTrendingPageForMainpageSuccess({ id, username, dots: getResponseData(response) }));
            dispatch(pushDots({ dots: getResponseData(response) }));
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }));
        } else {
            dispatch(loadTrendingPageForMainpageFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load trending page for mainpage error', error);
    });
};

