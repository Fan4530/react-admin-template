import { LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { MAINPAGE_DEAL_DOTS_PAGE_SIZE } from '../../../constants.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

import { MAINPAGE_PAGINATION_ID } from '../../../constants.js';
import { SORT_MAINPAGE_DEAL_DOTS_BY } from '../../../constants.js';

export const LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_REQUEST = 'LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_REQUEST';
export const LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_SUCCESS = 'LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_SUCCESS';
export const LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_FAILURE = 'LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_FAILURE';

export const loadDealDotsPageForMainpageRequest = payload => ({
    type: LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_REQUEST,
    payload
});

export const loadDealDotsPageForMainpageSuccess = payload => ({
    type: LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_SUCCESS,
    payload
});

export const loadDealDotsPageForMainpageFailure = payload => ({
    type: LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_FAILURE,
    payload
});

export const loadDealDotsPageForMainpage = () => (dispatch, getState) => {
    dispatch(loadDealDotsPageForMainpageRequest());
    const id = MAINPAGE_PAGINATION_ID;
    const volume = 'deals';

    const url = LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_URL;
    ///console.log('URL', url);
    const pageSize = MAINPAGE_DEAL_DOTS_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume });
    const body = JSON.stringify({
        "sort": {
            "fieldName": SORT_MAINPAGE_DEAL_DOTS_BY,
            "ascending": false
        },
        "pageNumber": nextPage,
        "pageSize": pageSize
    });
    ///console.log('body', body);
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
                dispatch(loadDealDotsPageForMainpageFailure());
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load trending page for profile error', error);
            dispatch(loadDealDotsPageForMainpageFailure());
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadDealDotsPageForMainpageSuccess({ dots: getResponseData(response) }));
            dispatch(pushDots({ dots: getResponseData(response) }));
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }));
        } else {
            dispatch(loadDealDotsPageForMainpageFailure());
        }
    })
    .catch(error => {
        console.log('load trending page for profile error', error);
    });
};

