import { LOAD_LAST_THREE_COLLECTOINS_URL } from '../../../urls.js';
import { checkResponse, checkResponseJson, getResponseData } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';

export const LOAD_LAST_THREE_COLLECTIONS_REQUEST = 'LOAD_LAST_THREE_COLLECTIONS_REQUEST';
export const LOAD_LAST_THREE_COLLECTIONS_SUCCESS = 'LOAD_LAST_THREE_COLLECTIONS_SUCCESS';
export const LOAD_LAST_THREE_COLLECTIONS_FAILURE = 'LOAD_LAST_THREE_COLLECTIONS_FAILURE';

export const loadLastThreeCollectionsRequest = payload => ({
    type: LOAD_LAST_THREE_COLLECTIONS_REQUEST,
    payload
});

export const loadLastThreeCollectionsSuccess = payload => ({
    type: LOAD_LAST_THREE_COLLECTIONS_SUCCESS,
    payload
}); 

export const loadLastThreeCollectionsFailure = payload => ({
    type: LOAD_LAST_THREE_COLLECTIONS_FAILURE,
    payload
});

export const loadLastThreeCollections = data => dispatch => {
    dispatch(loadLastThreeCollectionsRequest({ ...data}));

    const url = LOAD_LAST_THREE_COLLECTOINS_URL;
    const body = JSON.stringify({});
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
                dispatch(loadLastThreeCollectionsFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load last three collections error', error);
            dispatch(loadLastThreeCollectionsFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadLastThreeCollectionsSuccess({ ...data, data: getResponseData(response) }))
        } else {
            dispatch(loadLastThreeCollectionsFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load last three collections error', error);
    });
};