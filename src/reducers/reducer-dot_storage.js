import _ from 'lodash';

import { LOAD_DOT_COLLECTIONS_SUCCESS } from '../actions/actions-profiles.js';
import { LOAD_FEATURED_DOTS_SUCCESS } from '../actions/actions-featured_dots.js';
import { LOAD_ALL_DOTS_SUCCESS } from '../actions/actions-all_dots.js';
import { LOAD_PRICE_TRACKING_DOTS_SUCCESS } from '../actions/actions-price_tracking_dots.js';
import { LOAD_FOLLOWING_DOTS_SUCCESS } from '../actions/actions-following_dots.js';
import { LOAD_LIKED_DOTS_SUCCESS } from '../actions/actions-profiles.js';
import {
    LIKE_DOT_SUCCESS,
    UNLIKE_DOT_SUCCESS
} from '../actions/actions-like_dot.js';
import {
    LOAD_DOT_SUCCESS
} from '../actions/actions-dot.js';
import {
    ADD_COMMENT_TO_DOT_SUCCESS
} from '../actions/dots/comments/add.js';
import {
    LOAD_DOTS_PAGE_FOR_PROFILE_REQUEST,
    LOAD_DOTS_PAGE_FOR_PROFILE_SUCCESS,
    LOAD_DOTS_PAGE_FOR_PROFILE_FAILURE
} from '../actions/profiles/dots/loadDotsPage.js';
import {
    LOAD_DOTS_PAGE_FOR_COLLECTION_SUCCESS
} from '../actions/profiles/collections/dots/loadDotsPage.js';
import { LOAD_LIKES_FOR_PROFILE_SUCCESS } from '../actions/profiles/likes/loadLikesPage.js';
import { PUSH_DOTS } from '../actions/dotStorage/pushDots.js';
import { DELETE_DOT } from '../actions/dotStorage/deleteDot.js';
import { REPLACE_DOT } from '../actions/dotStorage/replaceDot.js';
import { EDIT_DOT } from '../actions/dotStorage/editDot.js';
import { RENAME_COLLECTION } from '../actions/dotStorage/renameCollection.js';


export const initialState = {};

export const dotStorage = (state = initialState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        case LOAD_FEATURED_DOTS_SUCCESS:
        case LOAD_ALL_DOTS_SUCCESS:
        case LOAD_PRICE_TRACKING_DOTS_SUCCESS:
        case LOAD_FOLLOWING_DOTS_SUCCESS:
            {
                action.payload.data.dots.map((dot, index) => {
                    if (newState[dot.id]) {
                        dot.cache = newState[dot.id].cache;
                    }
                    newState[dot.id] = dot;
                });
                return newState;
            }
        case LOAD_DOT_SUCCESS:
            if (newState[action.payload.data.id]) {
                action.payload.data.cache = newState[action.payload.data.id].cache;
            }
            newState[action.payload.data.id] = action.payload.data;
            return newState;
        //~~~~~~~~~~~~~~~~~~~~handle like and unlike
        case LIKE_DOT_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    dotStats: {
                        likeCount: newState[action.payload.id].dotStats.likeCount + 1
                    }
                }
            });
        case UNLIKE_DOT_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    dotStats: {
                        likeCount: newState[action.payload.id].dotStats.likeCount - 1
                    }
                }
            });
        //~~~~~~~~~~~~~~~~~~handle new comments
        case ADD_COMMENT_TO_DOT_SUCCESS:
            {
                const dotId = action.payload.dot.id;
                const newComment = action.payload.data;
                if (!newState[dotId].comments) newState[dotId].comments = [];
                newState[dotId].comments.push(newComment);
                return newState;
            }

        case LOAD_DOTS_PAGE_FOR_COLLECTION_SUCCESS:
            {
                action.payload.dots.map((dot, index) => {
                        if (newState[dot.id]) {
                            dot.cache = newState[dot.id].cache;
                        }
                        newState[dot.id] = dot;
                        });
                return newState;
            }
        case LOAD_DOTS_PAGE_FOR_PROFILE_SUCCESS:
            {
                action.payload.dots.map((dot, index) => {
                        if (newState[dot.id]) {
                            dot.cache = newState[dot.id].cache;
                        }
                        newState[dot.id] = dot;
                        });
                return newState;
            }
        case LOAD_LIKES_FOR_PROFILE_SUCCESS:
            {
                action.payload.dots.map(dot => {
                        if (newState[dot.id]) {
                            dot.cache = newState[dot.id].cache;
                        }
                        newState[dot.id] = dot;
                        });
                return newState;
            }
            
        case PUSH_DOTS:
            {
                action.payload.dots.map(dot => {
                        if (newState[dot.id]) {
                            dot.cache = newState[dot.id].cache;
                        }
                        newState[dot.id] = _.merge({}, newState[dot.id], dot);
                        });
                return newState;
            }
        case DELETE_DOT:
            {
                delete newState[action.payload.id];
                return newState;
            }
        case REPLACE_DOT:
            {
                newState[action.payload.dot.id] = action.payload.dot;
                return newState;
            }
        case EDIT_DOT:
            {
                newState[action.payload.id] = _.merge({}, newState[action.payload.id], action.payload.dot);
                return newState;
            }
        case RENAME_COLLECTION:
            {
                const { collectionId, collectionName} = action.payload;
                Object.keys(newState).map(dotId => {
                    let dot = newState[dotId];
                    if (dot.dotCollectionId === collectionId) {
                        dot.dotCollection = collectionName;
                    }
                });
                return newState;
            }

    }
    return newState;
};