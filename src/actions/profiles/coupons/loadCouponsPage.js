import { LOAD_COUPONS_PAGE_FOR_PROFILE_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { PROFILE_COUPONS_PAGE_SIZE } from '../../../constants.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

export const LOAD_COUPONS_PAGE_FOR_PROFILE_REQUEST = 'LOAD_COUPONS_PAGE_FOR_PROFILE_REQUEST';
export const LOAD_COUPONS_PAGE_FOR_PROFILE_SUCCESS = 'LOAD_COUPONS_PAGE_FOR_PROFILE_SUCCESS';
export const LOAD_COUPONS_PAGE_FOR_PROFILE_FAILURE = 'LOAD_COUPONS_PAGE_FOR_PROFILE_FAILURE';

export const loadCouponsPageForProfileRequest = payload => ({
    type: LOAD_COUPONS_PAGE_FOR_PROFILE_REQUEST,
    payload
});

export const loadCouponsPageForProfileSuccess = payload => ({
    type: LOAD_COUPONS_PAGE_FOR_PROFILE_SUCCESS,
    payload
});

export const loadCouponsPageForProfileFailure = payload => ({
    type: LOAD_COUPONS_PAGE_FOR_PROFILE_FAILURE,
    payload
});

export const loadCouponsPageForProfile = data => (dispatch, getState) => {
    dispatch(loadCouponsPageForProfileRequest({ ...data }));
    const { id, username } = data;
    const volume = 'coupons';

    const url = LOAD_COUPONS_PAGE_FOR_PROFILE_URL;
    const pageSize = PROFILE_COUPONS_PAGE_SIZE;
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
                dispatch(loadCouponsPageForProfileFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load trending page for profile error', error);
            dispatch(loadCouponsPageForProfileFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadCouponsPageForProfileSuccess({ id, username, dots: getResponseData(response) }));
            dispatch(pushDots({ dots: getResponseData(response) }));
            dispatch(addPage({ id, records: getResponseData(response).map(dot => dot.id), volume, pageSize }));
        } else {
            dispatch(loadCouponsPageForProfileFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load trending page for profile error', error);
    });
};

