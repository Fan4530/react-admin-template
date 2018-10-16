import { LOAD_DEFAULT_RETAILER_AND_CURATOR_URL } from '../../urls.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../utils.js';
import { checkStatus } from '../auth/checkStatus.js';
import { addPage } from '../pages/addPage.js';
import { loadDefaultCuratorSuccess } from '../actions-default_curator.js';
import { loadDefaultRetailerSuccess } from '../actions-default_retailer.js';

import { PROFILE_COLLECTIONS_PAGE_SIZE } from '../../constants.js';
import { SORT_PROFILE_COLLECTIONS_BY } from '../../constants.js';

export const LOAD_DEFAULT_RETAILER_AND_CURATOR_REQUEST = 'LOAD_DEFAULT_RETAILER_AND_CURATOR_REQUEST';
export const LOAD_DEFAULT_RETAILER_AND_CURATOR_SUCCESS = 'LOAD_DEFAULT_RETAILER_AND_CURATOR_SUCCESS';
export const LOAD_DEFAULT_RETAILER_AND_CURATOR_FAILURE = 'LOAD_DEFAULT_RETAILER_AND_CURATOR_FAILURE';

export const loadDefaultRetailerAndCuratorRequest = payload => ({
    type: LOAD_DEFAULT_RETAILER_AND_CURATOR_REQUEST,
    payload
});

export const loadDefaultRetailerAndCuratorSuccess = payload => ({
    type: LOAD_DEFAULT_RETAILER_AND_CURATOR_SUCCESS,
    payload
});

export const loadDefaultRetailerAndCuratorFailure = payload => ({
    type: LOAD_DEFAULT_RETAILER_AND_CURATOR_FAILURE,
    payload
});

export const loadDefaultRetailerAndCurator = () => (dispatch, getState) => {
    dispatch(loadDefaultRetailerAndCuratorRequest());

    const url = LOAD_DEFAULT_RETAILER_AND_CURATOR_URL;
    fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(
        response => {
            if (checkResponse(response)) {
                return response.json();
            } else {
                dispatch(loadDefaultRetailerAndCuratorFailure());
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log(error);
            dispatch(loadDefaultRetailerAndCuratorFailure());
        }
    )
    .then(response => {
        console.log('DEFAULT GUYS', response);
        if (checkResponseJson(response)) {
            dispatch(loadDefaultRetailerSuccess(response.ServiceResponse.responseData[0].defaultRetailer.responseData[0]));
            dispatch(loadDefaultCuratorSuccess(response.ServiceResponse.responseData[1].defaultCurator.responseData[0]));
        } else {
            dispatch(loadDefaultRetailerAndCuratorFailure());
        }
    })
    .catch(error => {
        console.log(error);
    });
};

