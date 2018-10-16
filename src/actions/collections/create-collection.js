import { SAVE_COLLECTION_URL } from '../../urls.js';
import { pushCollections } from './pushCollections.js';
import { addRecord } from '../pages/addRecord.js';
import 'whatwg-fetch';

export const CREATE_COLLECTION_REQUEST = 'CREATE_COLLECTION_REQUEST';
export const CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS';
export const CREATE_COLLECTION_FAILURE = 'CREATE_COLLECTION_FAILURE';

export const createCollectionRequest = payload => ({
    type: CREATE_COLLECTION_REQUEST,
    payload
});

export const createCollectionSuccess = payload => ({
    type: CREATE_COLLECTION_SUCCESS,
    payload
});

export const createCollectionFailure = payload => ({
    type: CREATE_COLLECTION_FAILURE,
    payload
});

export const createCollection = data => (dispatch, getState) => {
    dispatch(createCollectionRequest(data));

    const body = JSON.stringify({
        name: data.name,
        categoryId: data.id
    });

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
                console.log('save collection error', error);
                dispatch(createCollectionFailure(data));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(createCollectionSuccess({ collection: response.ServiceResponse.responseData[0] }));
                // dispatch(loadProfile());
                dispatch(pushCollections({ collections: [response.ServiceResponse.responseData[0]] }));
                dispatch(addRecord({ id: getState().user.data.id, pageSize: 30, volume: 'collections', record: response.ServiceResponse.responseData[0].id }));
            } else {
                dispatch(createCollectionFailure(data));
            }
        })
        .catch(error => {
            console.log(error);
        });
};