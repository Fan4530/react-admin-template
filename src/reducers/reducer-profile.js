import _ from 'lodash'
import {
    LOAD_PROFILE_FAILURE,
    LOAD_PROFILE_REQUEST,
    LOAD_PROFILE_SUCCESS,
    SAVE_PROFILE_SUCCESS
} from '../actions/actions-profile.js';
import {ADD_LIKE_TO_PROFILE} from '../actions/profile/addLike.js';
import {REMOVE_LIKE_FROM_PROFILE} from '../actions/profile/removeLike.js';
import {CREATE_COLLECTION_SUCCESS} from '../actions/collections/create-collection.js';
import {SAVE_AVATAR_SUCCESS} from '../actions/profiles/info/saveAvatar.js';
import {SAVE_BACKGROUND_SUCCESS} from '../actions/profiles/info/saveBackground.js';

import {LIKE_DOT_SUCCESS, UNLIKE_DOT_SUCCESS} from '../actions/actions-like_dot.js';
import {SIGN_OUT_REQUEST} from "../actions/auth/signOut";

export const initialState = {
    data: {},
    isLoading: false,
    isErrored: false,
};

export const profile = (state = initialState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case LOAD_PROFILE_REQUEST:
            return _.merge({}, newState, {
                isLoading: true,
                isErrored: false
            });
        case LOAD_PROFILE_SUCCESS:
            return _.merge({}, {
                data: action.payload
            }, {
                isLoading: false,
                isErrored: false
            });
        case LOAD_PROFILE_FAILURE:
            return _.merge({}, newState, {
                isLoading: false,
                isErrored: true
            });
        // handle like and unlike
        case LIKE_DOT_SUCCESS:
        case ADD_LIKE_TO_PROFILE: {
            newState.data.likes.push({
                id: action.payload.id,
                type: action.payload.type
            });
            return newState;
        }
        case UNLIKE_DOT_SUCCESS:
        case REMOVE_LIKE_FROM_PROFILE: {
            let index = newState.data.likes.find(dot => dot.id === action.payload.id);
            newState.data.likes.splice(index, 1);
            return newState;
        }
        case CREATE_COLLECTION_SUCCESS: {
            const newCollection = action.payload.collection;
            newState.data.collectionMap[newCollection.name] = newCollection;
            return newState;
        }
        case SAVE_AVATAR_SUCCESS: {
            newState.profileImage = action.payload.profileImage;
            return newState;
        }
        case SAVE_BACKGROUND_SUCCESS: {
            newState.backgroundImage = action.payload.backgroundImage;
            return newState;
        }
        case SAVE_PROFILE_SUCCESS: {
            newState.data = _.merge({}, newState.data, action.payload.profile);
            return newState;
        }
        case SIGN_OUT_REQUEST:
            return {
                data: {},
                isLoading: false,
                isErrored: false
            };
    }
    return newState;
};

