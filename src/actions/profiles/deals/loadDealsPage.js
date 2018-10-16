import { LOAD_DEALS_PAGE_FOR_PROFILE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { PROFILE_DEALS_PAGE_SIZE } from '../../../constants.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

export const LOAD_DEALS_PAGE_FOR_PROFILE_REQUEST = 'LOAD_DEALS_PAGE_FOR_PROFILE_REQUEST';
export const LOAD_DEALS_PAGE_FOR_PROFILE_SUCCESS = 'LOAD_DEALS_PAGE_FOR_PROFILE_SUCCESS';
export const LOAD_DEALS_PAGE_FOR_PROFILE_FAILURE = 'LOAD_DEALS_PAGE_FOR_PROFILE_FAILURE';

export const loadDealsPageForProfileRequest = payload => ({
    type: LOAD_DEALS_PAGE_FOR_PROFILE_REQUEST,
    payload
});

export const loadDealsPageForProfileSuccess = payload => ({
    type: LOAD_DEALS_PAGE_FOR_PROFILE_SUCCESS,
    payload
});

export const loadDealsPageForProfileFailure = payload => ({
    type: LOAD_DEALS_PAGE_FOR_PROFILE_FAILURE,
    payload
});

export const loadDealsPageForProfile = data => (dispatch, getState) => {
    dispatch(loadDealsPageForProfileRequest({ ...data }));
    const { id, username } = data;
    const volume = 'dots';

    const url = LOAD_DEALS_PAGE_FOR_PROFILE_URL;
    const pageSize = PROFILE_DEALS_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume });
    const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "shopId",
                "operator": "=",
                "value": id
            }
        ],
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
                dispatch(loadDealsPageForProfileFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load trending page for profile error', error);
            dispatch(loadDealsPageForProfileFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadDealsPageForProfileSuccess({ id, username, dots: getResponseData(response) }));
            dispatch(pushDots({ dots: getResponseData(response) }));
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }));
        } else {
            dispatch(loadDealsPageForProfileFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load trending page for profile error', error);
    });
};

