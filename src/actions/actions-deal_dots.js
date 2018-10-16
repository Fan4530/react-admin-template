import {LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_URL} from "../urls";


export const LOAD_DEAL_DOTS_REQUEST = 'LOAD_DEAL_DOTS_REQUEST';
export const LOAD_DEAL_DOTS_SUCCESS = 'LOAD_DEAL_DOTS_SUCCESS';
export const LOAD_DEAL_DOTS_FAILURE = 'LOAD_DEAL_DOTS_FAILURE';
import 'whatwg-fetch';
import {FOR_LOCALHOST} from "../constants";

export const loadDealDotsRequest = payload => ({
    type: LOAD_DEAL_DOTS_REQUEST,
    payload
});

export const loadDealDotsSuccess = payload => ({
    type: LOAD_DEAL_DOTS_SUCCESS,
    payload
});

export const loadDealDotsFailure = payload => ({
    type: LOAD_DEAL_DOTS_FAILURE,
    payload
});

export const loadDealDot = (dotID) => (dispatch, getState) => {
    dispatch(loadDealDotsRequest());

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

    fetch(LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_URL, {
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
                dispatch(loadDealDotsSuccess(payload));
            } else {
                dispatch(loadDealDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadDealDotsFailure());
        });
};