import {LOAD_COUPONS_PAGE_FOR_PROFILE_URL} from "../urls";

export const LOAD_COUPON_DOTS_REQUEST = 'LOAD_COUPON_DOTS_REQUEST';
export const LOAD_COUPON_DOTS_SUCCESS = 'LOAD_COUPON_DOTS_SUCCESS';
export const LOAD_COUPON_DOTS_FAILURE = 'LOAD_COUPON_DOTS_FAILURE';
import 'whatwg-fetch';

export const loadCouponDotsRequest = payload => ({
    type: LOAD_COUPON_DOTS_REQUEST,
    payload
});

export const loadCouponDotsSuccess = payload => ({
    type: LOAD_COUPON_DOTS_SUCCESS,
    payload
});

export const loadCouponDotsFailure = payload => ({
    type: LOAD_COUPON_DOTS_FAILURE,
    payload
});

export const loadCouponDot = (dotID) => (dispatch, getState) => {
    dispatch(loadCouponDotsRequest());

    let body = JSON.stringify(
        {
            "filters": [
                {
                    "fieldName": "id",
                    "operator": "=",
                    "value": dotID
                }
            ],
            "pageNumber": 0,
            "pageSize": 50
        }
    );

    fetch(LOAD_COUPONS_PAGE_FOR_PROFILE_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let data = {
                    id: response.ServiceResponse.responseData[0].id,
                    pageUrl: response.ServiceResponse.responseData[0].dotSummary.pageUrl
                };
                let payload = { data };
                dispatch(loadCouponDotsSuccess(payload));
            } else {
                dispatch(loadCouponDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadCouponDotsFailure());
        });
};