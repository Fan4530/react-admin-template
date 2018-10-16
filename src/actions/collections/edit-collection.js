import { mergeCollection } from './mergeCollection.js';
import { renameCollection } from '../dotStorage/renameCollection.js';

import { SAVE_COLLECTION_URL } from '../../urls.js';
import 'whatwg-fetch';

export const EDIT_COLLECTION_REQUEST = 'EDIT_COLLECTION_REQUEST';
export const EDIT_COLLECTION_SUCCESS = 'EDIT_COLLECTION_SUCCESS';
export const EDIT_COLLECTION_FAILURE = 'EDIT_COLLECTION_FAILURE';

export const editCollectionRequest = payload => ({
    type: EDIT_COLLECTION_REQUEST,
    payload
});

export const editCollectionSuccess = payload => ({
    type: EDIT_COLLECTION_SUCCESS,
    payload
});

export const editCollectionFailure = payload => ({
    type: EDIT_COLLECTION_FAILURE,
    payload
});

export const editCollection = data => dispatch => {
    dispatch(editCollectionRequest(data));
    const { id, categoryId, name, description } = data;
    let body = {
        id,
        categoryId,
        name,
        description
    };

    body = JSON.stringify(body);

    fetch(SAVE_COLLECTION_URL, {
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
                dispatch(editCollectionFailure(data));
            }
        )
        .then(json => {
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                const collection = json.ServiceResponse.responseData[0];

                dispatch(editCollectionSuccess(data));
                dispatch(mergeCollection({ collection: json.ServiceResponse.responseData[0] }));
                dispatch(renameCollection({ collectionId: collection.id, collectionName: collection.name }));
            } else {
                dispatch(editCollectionFailure(data));
            }
        })
        .catch(error => {
            console.log(error);
        });
};