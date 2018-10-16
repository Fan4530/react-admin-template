import { LOAD_PRICE_TRACKING_DOTS_URL } from '../urls.js';
import { PRICE_TRACKING_DOTS_PAGE_SIZE } from '../constants.js';
import 'whatwg-fetch';

export const LOAD_PRICE_TRACKING_DOTS_REQUEST = 'LOAD_PRICE_TRACKING_DOTS_REQUEST';
export const LOAD_PRICE_TRACKING_DOTS_SUCCESS = 'LOAD_PRICE_TRACKING_DOTS_SUCCESS';
export const LOAD_PRICE_TRACKING_DOTS_FAILURE = 'LOAD_PRICE_TRACKING_DOTS_FAILURE';

export const loadPriceTrackingDotsRequest = payload => ({
    type: LOAD_PRICE_TRACKING_DOTS_REQUEST,
    payload
})

export const loadPriceTrackingDotsSuccess = payload => ({
    type: LOAD_PRICE_TRACKING_DOTS_SUCCESS,
    payload
})

export const loadPriceTrackingDotsFailure = payload => ({
    type: LOAD_PRICE_TRACKING_DOTS_FAILURE,
    payload
})

export const loadPriceTrackingDots = () => (dispatch, getState) => {
    dispatch(loadPriceTrackingDotsRequest());

    let pageNumber = getState().priceTrackingDots.nextPageNumber;
    let body = JSON.stringify({
        pageNumber,
        pageSize: PRICE_TRACKING_DOTS_PAGE_SIZE
    });
    fetch(LOAD_PRICE_TRACKING_DOTS_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then(response => response.json())
        .then(json => {
            if (json.ServiceResponse && 
                json.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    data: {
                        dots: json.ServiceResponse.responseData[0].dots.responseData,
                        relatedUsers: json.ServiceResponse.responseData[1].relatedUsers.responseData[0]
                    },
                    nextPageNumber: pageNumber
                }
                dispatch(loadPriceTrackingDotsSuccess(payload));
            } else {
                dispatch(loadPriceTrackingDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadPriceTrackingDotsFailure());
        });
}
