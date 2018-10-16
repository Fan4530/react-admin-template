import { DELETE_COLLECTION_URL } from '../../urls.js';
import 'whatwg-fetch';
import { loadProfile } from '../actions-profile.js';
import { getProfileById } from '../actions-profiles.js';
import { removeRecord } from '../pages/removeRecord.js';
import { flushVolumes } from '../pages/flushVolumes.js';
import { flushVolume } from '../pages/flushVolume.js';
import { getVolume } from '../pages/getVolume.js';
import { getNextPage } from '../pages/getNextPage.js';
import { loadDotsPageForProfile } from '../profiles/dots/loadDotsPage.js';

import { MAINPAGE_PAGINATION_ID } from '../../constants.js';

export const DELETE_COLLECTION_REQUEST = 'DELETE_COLLECTION_REQUEST';
export const DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS';
export const DELETE_COLLECTION_FAILURE = 'DELETE_COLLECTION_FAILURE';

export const deleteCollectionRequest = payload => ({
    type: DELETE_COLLECTION_REQUEST,
    payload
});

export const deleteCollectionSuccess = payload => ({
    type: DELETE_COLLECTION_SUCCESS,
    payload
});

export const deleteCollectionFailure = payload => ({
    type: DELETE_COLLECTION_FAILURE,
    payload
});

export const deleteCollection = data => (dispatch, getState) => {
    dispatch(deleteCollectionRequest(data));

    const { id } = data;

    const body = JSON.stringify(
        {
            filters: [
                {
                    fieldName: 'id',
                    operator: '=',
                    value: id
                }
            ]
        }
    );

    fetch(DELETE_COLLECTION_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(deleteCollectionSuccess(data));
                const callback = record => record === id;
                dispatch(flushVolumes({ id }));
                dispatch(removeRecord({ id: getState().user.data.id, volume: 'collections', callback, pageSize: 30  }));

                const myId = getState().user.data.id;
                let dotIds = [...getState().pages[myId].dots.records];
                dotIds.map(dotId => {
                    const dot = getState().dotStorage[dotId];
                    if (dot.dotCollectionId === id) {
                        const callback = record => record === dot.id;
                        dispatch(removeRecord({ id: myId, volume: 'dots', callback, pageSize: 30 }));
                    }
                });
                // reload dots tab
                // const nextPage = dispatch(getNextPage({ id: getState().user.data.id, volume: 'dots' }));
                // dispatch(flushVolume({ id: getState().user.data.id, volume: 'dots' }));
                // dispatch(loadDotsPageForProfile({ id: getState().user.data.id, username: getState().user.data.name }));
                //////////////////
            } else {
                dispatch(deleteCollectionFailure(data));
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(deleteCollectionFailure(data))
        });
};