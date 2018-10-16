import {
    INTERSTITIAL_CLICK_SAVE_URL
} from '../../urls.js';
import 'whatwg-fetch';
import {loadSocialDotsSuccess} from "../actions-social_dots";

export const INTERSTITIAL_CLICK_SAVE_REQUEST = 'INTERSTITIAL_CLICK_SAVE_REQUEST';
export const INTERSTITIAL_CLICK_SAVE_SUCCESS = 'INTERSTITIAL_CLICK_SAVE_SUCCESS';
export const INTERSTITIAL_CLICK_SAVE_FAILURE = 'INTERSTITIAL_CLICK_SAVE_FAILURE';

export const interstitialClickSaveRequest = payload => ({
    type: INTERSTITIAL_CLICK_SAVE_REQUEST,
    payload
});

export const interstitialClickSaveSuccess = payload => ({
    type: INTERSTITIAL_CLICK_SAVE_SUCCESS,
    payload
});

export const interstitialClickSaveFailure = payload => ({
    type: INTERSTITIAL_CLICK_SAVE_FAILURE,
    payload
});

export const interstitialClickSave = data => dispatch => {
    dispatch(interstitialClickSaveRequest({ ...data }));
    const { id, type } = data;
    const body = {
        id,
        type
    }

    const url = INTERSTITIAL_CLICK_SAVE_URL;
    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(
        response => response.json(),
        error => {
            dispatch(interstitialClickSaveFailure({ ...data }))
        }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let data = {
                    id: response.ServiceResponse.responseData[0].id,
                    pageUrl: response.ServiceResponse.responseMessage
                };
                let payload = { data };
                dispatch(interstitialClickSaveSuccess(payload));
            } else {
                dispatch(interstitialClickSaveFailure({ ...data }));
            }
        })
};