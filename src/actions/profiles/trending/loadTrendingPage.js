import { LOAD_TRENDING_PAGE_FOR_PROFILE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { PROFILE_TRENDING_PAGE_SIZE } from '../../../constants.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

export const LOAD_TRENDING_PAGE_FOR_PROFILE_REQUEST = 'LOAD_TRENDING_PAGE_FOR_PROFILE_REQUEST';
export const LOAD_TRENDING_PAGE_FOR_PROFILE_SUCCESS = 'LOAD_TRENDING_PAGE_FOR_PROFILE_SUCCESS';
export const LOAD_TRENDING_PAGE_FOR_PROFILE_FAILURE = 'LOAD_TRENDING_PAGE_FOR_PROFILE_FAILURE';

export const loadTrendingPageForProfileRequest = payload => ({
    type: LOAD_TRENDING_PAGE_FOR_PROFILE_REQUEST,
    payload
});

export const loadTrendingPageForProfileSuccess = payload => ({
    type: LOAD_TRENDING_PAGE_FOR_PROFILE_SUCCESS,
    payload
});

export const loadTrendingPageForProfileFailure = payload => ({
    type: LOAD_TRENDING_PAGE_FOR_PROFILE_FAILURE,
    payload
});

export const loadTrendingPageForProfile = data => (dispatch, getState) => {
    dispatch(loadTrendingPageForProfileRequest({ ...data }));
    const { id:dotUserId, username } = data;
    const id = dotUserId;
    const volume = 'trending';

    const url = LOAD_TRENDING_PAGE_FOR_PROFILE_URL;
    const pageSize = PROFILE_TRENDING_PAGE_SIZE;
    const nextPage = getNextPage({ state: getState(), id, volume });
    const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "id",
                "operator": "=",
                "value": dotUserId
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
                dispatch(loadTrendingPageForProfileFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load trending page for profile error', error);
            dispatch(loadTrendingPageForProfileFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadTrendingPageForProfileSuccess({ id, username, dots: getResponseData(response) }));
            dispatch(pushDots({ dots: getResponseData(response) }));
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }));
        } else {
            dispatch(loadTrendingPageForProfileFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load trending page for profile error', error);
    });
};

