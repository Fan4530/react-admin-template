import { LOAD_FEATURED_DOTS_URL } from '../urls.js';
import { FEATURED_DOTS_PAGE_SIZE } from '../constants.js';
import 'whatwg-fetch';
import { loadPartialProfiles } from './profiles/loadPartialProfiles.js';

export const LOAD_FEATURED_DOTS_REQUEST = 'LOAD_FEATURED_DOTS_REQUEST';
export const LOAD_FEATURED_DOTS_SUCCESS = 'LOAD_FEATURED_DOTS_SUCCESS';
export const LOAD_FEATURED_DOTS_FAILURE = 'LOAD_FEATURED_DOTS_FAILURE';

export const loadFeaturedDotsRequest = payload => ({
    type: LOAD_FEATURED_DOTS_REQUEST,
    payload
});

export const loadFeaturedDotsSuccess = payload => ({
    type: LOAD_FEATURED_DOTS_SUCCESS,
    payload
});

export const loadFeaturedDotsFailure = payload => ({
    type: LOAD_FEATURED_DOTS_FAILURE,
    payload
});

export const loadFeaturedDots = () => (dispatch, getState) => {
    dispatch(loadFeaturedDotsRequest());

    let pageNumber = getState().featuredDots.nextPageNumber;
    let body = JSON.stringify({
        pageNumber,
        pageSize: FEATURED_DOTS_PAGE_SIZE
    });
    fetch(LOAD_FEATURED_DOTS_URL, {
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
                dispatch(loadFeaturedDotsSuccess(payload));
                let ids = [];
                payload.data.dots.map(dot => {
                    if (dot.dotUserId) ids.push(dot.dotUserId);
                    if (dot.ownerId) ids.push(dot.ownerId);
                });
                dispatch(loadPartialProfiles({ ids }));
            } else {
                dispatch(loadFeaturedDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadFeaturedDotsFailure());
        });
};
