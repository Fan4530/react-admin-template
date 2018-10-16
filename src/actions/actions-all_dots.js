import { LOAD_ALL_DOTS_URL } from '../urls.js';
import { ALL_DOTS_PAGE_SIZE } from '../constants.js';
import 'whatwg-fetch';
import { loadPartialProfiles } from './profiles/loadPartialProfiles.js';

export const LOAD_ALL_DOTS_REQUEST = 'LOAD_ALL_DOTS_REQUEST';
export const LOAD_ALL_DOTS_SUCCESS = 'LOAD_ALL_DOTS_SUCCESS';
export const LOAD_ALL_DOTS_FAILURE = 'LOAD_ALL_DOTS_FAILURE';

export const loadAllDotsRequest = payload => ({
    type: LOAD_ALL_DOTS_REQUEST,
    payload
});

export const loadAllDotsSuccess = payload => ({
    type: LOAD_ALL_DOTS_SUCCESS,
    payload
});

export const loadAllDotsFailure = payload => ({
    type: LOAD_ALL_DOTS_FAILURE,
    payload
});

export const loadAllDots = () => (dispatch, getState) => {
    dispatch(loadAllDotsRequest());

    let pageNumber = getState().allDots.nextPageNumber;
    let body = JSON.stringify({
        pageNumber,
        pageSize: ALL_DOTS_PAGE_SIZE
    });
    fetch(LOAD_ALL_DOTS_URL, {
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
                        // relatedUsers: json.ServiceResponse.responseData[1].relatedUsers.responseData[0]
                    },
                    nextPageNumber: pageNumber
                };
                dispatch(loadAllDotsSuccess(payload));
                let ids = [];
                payload.data.dots.map(dot => {
                    if (dot.dotUserId) ids.push(dot.dotUserId);
                    if (dot.ownerId) ids.push(dot.ownerId);
                });
                dispatch(loadPartialProfiles({ ids }));
            } else {
                dispatch(loadAllDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadAllDotsFailure());
        });
};
