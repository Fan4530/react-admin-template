import { ADD_DOT_TO_COLLECTION_URL } from '../../urls.js';
import { loadProfile } from '../actions-profile.js'
import 'whatwg-fetch';

export const ADD_DOT_TO_COLLECTION_REQUEST = 'ADD_DOT_TO_COLLECTION_REQUEST';
export const ADD_DOT_TO_COLLECTION_SUCCESS = 'ADD_DOT_TO_COLLECTION_SUCCESS';
export const ADD_DOT_TO_COLLECTION_FAILURE = 'ADD_DOT_TO_COLLECTION_FAILURE';

export const addDotToCollectionRequest = payload => ({
    type: ADD_DOT_TO_COLLECTION_REQUEST,
    payload
});

export const addDotToCollectionSuccess = payload => ({
    type: ADD_DOT_TO_COLLECTION_SUCCESS,
    payload
});

export const addDotToCollectionFailure = payload => ({
    type: ADD_DOT_TO_COLLECTION_FAILURE,
    payload
});

export const addDotToCollection = data => (dispatch, getState) => {
    dispatch(addDotToCollectionRequest(data));

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

    fetch(ADD_DOT_TO_COLLECTION_URL, {
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
                dispatch(addDotToCollectionFailure(data));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SAVE') {
                dispatch(addDotToCollectionSuccess(data));
                dispatch(loadProfile());
            } else {
                dispatch(addDotToCollectionFailure(data));
            }
        })
        .catch(error => {
            console.log(error);
        })
};