import { LOAD_FOLLOWING_DOTS_URL } from '../urls.js';
import { FOLLOWING_DOTS_PAGE_SIZE } from '../constants.js';
import 'whatwg-fetch';

export const LOAD_FOLLOWING_DOTS_REQUEST = 'LOAD_FOLLOWING_DOTS_REQUEST';
export const LOAD_FOLLOWING_DOTS_SUCCESS = 'LOAD_FOLLOWING_DOTS_SUCCESS';
export const LOAD_FOLLOWING_DOTS_FAILURE = 'LOAD_FOLLOWING_DOTS_FAILURE';

export const loadFollowingDotsRequest = payload => ({
    type: LOAD_FOLLOWING_DOTS_REQUEST,
    payload
})

export const loadFollowingDotsSuccess = payload => ({
    type: LOAD_FOLLOWING_DOTS_SUCCESS,
    payload
})

export const loadFollowingDotsFailure = payload => ({
    type: LOAD_FOLLOWING_DOTS_FAILURE,
    payload
})

export const loadFollowingDots = () => (dispatch, getState) => {
    dispatch(loadFollowingDotsRequest());

    let pageNumber = getState().followingDots.nextPageNumber;
    let body = JSON.stringify({
        pageNumber,
        pageSize: FOLLOWING_DOTS_PAGE_SIZE
    });
    fetch(LOAD_FOLLOWING_DOTS_URL, {
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
                dispatch(loadFollowingDotsSuccess(payload));
            } else {
                dispatch(loadFollowingDotsFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadFollowingDotsFailure());
        });
}
