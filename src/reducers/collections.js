import _ from 'lodash';

import { LOAD_COLLECTIONS_PAGE_FOR_PROFILE_SUCCESS } from '../actions/profiles/collections/loadCollectionsPage.js';
import { PUSH_COLLECTIONS_REQUEST } from '../actions/collections/pushCollections.js';
import { MERGE_COLLECTION } from '../actions/collections/mergeCollection.js';
import { DELETE_COLLECTION } from '../actions/collections/deleteCollection.js';

export const initialState = {};

export const collections = (state = initialState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case LOAD_COLLECTIONS_PAGE_FOR_PROFILE_SUCCESS:
            {
                action.payload.collections.map(collection => {
                    newState[collection.id] = collection;
                });
                return newState;
            }
        case PUSH_COLLECTIONS_REQUEST:
            {
                action.payload.collections.map(collection => {
                    newState[collection.id] = _.merge(state[collection.id], collection);
                });
                return newState;
            }
        case MERGE_COLLECTION:
            {
                let currentCollection = newState[action.payload.collection.id];
                newState[currentCollection.id] = _.merge({}, currentCollection, action.payload.collection);
                return newState;
            }
        case DELETE_COLLECTION:
            {
                delete newState[action.payload.id];
                return newState;
            }
    }
    return state;
};