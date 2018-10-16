import { DELETE_DOT_FROM_COLLECTION_URL } from '../../urls.js';
import { loadProfile } from '../actions-profile.js'
import 'whatwg-fetch';

export const DELETE_DOT_FROM_COLLECTION_REQUEST = 'DELETE_DOT_FROM_COLLECTION_REQUEST';
export const DELETE_DOT_FROM_COLLECTION_SUCCESS = 'DELETE_DOT_FROM_COLLECTION_SUCCESS';
export const DELETE_DOT_FROM_COLLECTION_FAILURE = 'DELETE_DOT_FROM_COLLECTION_FAILURE';

export const deleteDotFromCollectionRequest = payload => ({
    type: DELETE_DOT_FROM_COLLECTION_REQUEST,
    payload
});

export const deleteDotFromCollectionSuccess = payload => ({
    type: DELETE_DOT_FROM_COLLECTION_SUCCESS,
    payload
});

export const deleteDotFromCollectionFailure = payload => ({
    type: DELETE_DOT_FROM_COLLECTION_FAILURE,
    payload
});

export const deleteDotFromCollection = data => (dispatch, getState) => {
    dispatch(deleteDotFromCollectionRequest(data));

    const body = JSON.stringify(
        {
            "dots": [
              {
                "id": data.dot.id,
                "type": data.dot.type
              }
            ],
            "id": data.id
          }
    );

    fetch(DELETE_DOT_FROM_COLLECTION_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(
            response => response.json(),
            error => { 
                dispatch(deleteDotFromCollectionFailure(data));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SAVE') {
                dispatch(deleteDotFromCollectionSuccess(data));
                dispatch(loadProfile());
            } else {
                dispatch(deleteDotFromCollectionFailure(data));
            }
        })
        .catch(error => {
            console.log(error);
        })
};