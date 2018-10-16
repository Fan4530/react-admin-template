import {LOAD_DOTS_PAGE_FOR_PROFILE_URL} from "../urls";


export const LOAD_SOCIAL_DOTS_REQUEST = 'LOAD_SOCIAL_DOTS_REQUEST';
export const LOAD_SOCIAL_DOTS_SUCCESS = 'LOAD_SOCIAL_DOTS_SUCCESS';
export const LOAD_SOCIAL_DOTS_FAILURE = 'LOAD_SOCIAL_DOTS_FAILURE';
import 'whatwg-fetch';
import {FOR_LOCALHOST} from "../constants";

export const loadSocialDotsRequest = payload => ({
    type: LOAD_SOCIAL_DOTS_REQUEST,
    payload
});

export const loadSocialDotsSuccess = payload => ({
    type: LOAD_SOCIAL_DOTS_SUCCESS,
    payload
});

export const loadSocialDotsFailure = payload => ({
    type: LOAD_SOCIAL_DOTS_FAILURE,
    payload
});

export const loadSocialDot = (dotID) => (dispatch, getState) => {
    dispatch(loadSocialDotsRequest());

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

    fetch(LOAD_DOTS_PAGE_FOR_PROFILE_URL, {
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
                dispatch(loadSocialDotsSuccess(payload));
            } else {
                dispatch(loadSocialDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadSocialDotsFailure());
        });
};