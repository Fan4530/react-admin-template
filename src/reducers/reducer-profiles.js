import _ from 'lodash'
import {
    GET_PROFILE_EXTRA_DATA_SUCCESS,
    LOAD_FAVORITE_RETAILERS_FAILURE,
    LOAD_FAVORITE_RETAILERS_REQUEST,
    LOAD_FAVORITE_RETAILERS_SUCCESS,
    LOAD_FOLLOWING_USER_PROFILES_FAILURE,
    LOAD_FOLLOWING_USER_PROFILES_REQUEST,
    LOAD_FOLLOWING_USER_PROFILES_SUCCESS,
    LOAD_LIKED_DOTS_REQUEST,
    LOAD_LIKED_DOTS_SUCCESS,
    LOAD_PROFILE_BY_ID_FAILURE,
    LOAD_PROFILE_BY_ID_REQUEST,
    LOAD_PROFILE_BY_ID_SUCCESS,
    LOAD_RELATED_USERS_FOR_PROFILE_FAILURE,
    LOAD_RELATED_USERS_FOR_PROFILE_REQUEST,
    LOAD_RELATED_USERS_FOR_PROFILE_SUCCESS
} from '../actions/actions-profiles.js';
import {FOLLOW_USER_SUCCESS, UNFOLLOW_USER_SUCCESS} from '../actions/actions-user.js';
import {LOAD_PARTIAL_PROFILES_SUCCESS} from '../actions/profiles/loadPartialProfiles.js';
import {PUSH_PROFILES_REQUEST} from '../actions/profiles/pushProfiles.js';
import {INCREMENT_PROFILE_REDOT_COUNT} from '../actions/profiles/incrementRedotCount.js';
import {DECREMENT_PROFILE_REDOT_COUNT} from '../actions/profiles/decrementRedotCount.js';
import {SAVE_AVATAR_SUCCESS} from '../actions/profiles/info/saveAvatar.js';
import {SAVE_BACKGROUND_SUCCESS} from '../actions/profiles/info/saveBackground.js';
import {SAVE_PROFILE_SUCCESS} from '../actions/actions-profile.js';

export const initialState = {};


export const profiles = (state = initialState, action) => {
    let newState = _.merge({}, state);
    switch (action.type) {
        //~~~~~~~~~~~~~~~~~~~~PROFILE BY ID
        case LOAD_PROFILE_BY_ID_REQUEST:
            return newState;
        case LOAD_PROFILE_BY_ID_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    data: action.payload.data,
                    isLoading: false,
                    isErrored: false
                }
            });
        case LOAD_PROFILE_BY_ID_FAILURE:
            return newState;
        case LOAD_PARTIAL_PROFILES_SUCCESS:
        case PUSH_PROFILES_REQUEST:
            action.payload.profiles.map(profile => {
                let cache = (newState[profile.id] && newState[profile.id].data.cache) || false;
                profile.cache = cache;
                _.merge(newState, {
                    [profile.id]: {
                        data: profile,
                        isLoading: false,
                        isErrored: false
                    }
                });
            });
            return newState;

        //~~~~~~~~~~~~~~~~~~~~FOLLOWING USER PROFILES
        case LOAD_FOLLOWING_USER_PROFILES_REQUEST:
            return newState;
        case LOAD_FOLLOWING_USER_PROFILES_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    data: {
                        userStat: {
                            followingUserProfiles: action.payload.data
                        }
                    }
                }
            });
        case LOAD_FOLLOWING_USER_PROFILES_FAILURE:
            return newState;
        //~~~~~~~~~~~~~~~~~~~~FAVORITE RETAILERS
        case LOAD_FAVORITE_RETAILERS_REQUEST:
            return newState;
        case LOAD_FAVORITE_RETAILERS_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    data: {
                        favoriteRetailersData: action.payload.data
                    }
                }
            });
        case LOAD_FAVORITE_RETAILERS_FAILURE:
            return newState;
        //~~~~~~~~~~~~~~~~~~~~LIKED DOTS
        case LOAD_LIKED_DOTS_REQUEST:
            return newState;
        case LOAD_LIKED_DOTS_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    data: {
                        likesData: action.payload.data
                    }
                }
            });
        //~~~~~~~~~~~~~~~~~~~~RELATED USERS FOR PROFILE
        case LOAD_RELATED_USERS_FOR_PROFILE_REQUEST:
            return newState;
        case LOAD_RELATED_USERS_FOR_PROFILE_SUCCESS:
            return _.merge({}, newState, {
                [action.payload.id]: {
                    data: {
                        relatedUsers: action.payload.data
                    }
                }
            });
        case LOAD_RELATED_USERS_FOR_PROFILE_FAILURE:
            return newState;
        case GET_PROFILE_EXTRA_DATA_SUCCESS: {
            let user = newState[action.payload.id].data;
            // try {
            //     if (user.type.toLowerCase() === 'curator' && !!user.collectionMap.Obsessed) {
            //         let obsessed = [];
            //         for (let dot of user.collectionMap.Obsessed) {
            //             obsessed.push(user.dotCollectionsData[dot.id]);
            //         }
            //         newState[action.payload.id].data.obsessed = obsessed;
            //     }
            // } catch (e) { console.log(e); }
            return newState;
        }
        case FOLLOW_USER_SUCCESS: {
            newState[action.payload.id].data.userStat.followersCount++;
            return newState;
        }
        case UNFOLLOW_USER_SUCCESS: {
            newState[action.payload.id].data.userStat.followersCount--;
            return newState;
        }
        // handle redot actions
        case INCREMENT_PROFILE_REDOT_COUNT:
            newState[action.payload.id].data.userStat.redotCount++;
            return newState;
        case DECREMENT_PROFILE_REDOT_COUNT:
            newState[action.payload.id].data.userStat.redotCount--;
            return newState;
        case SAVE_AVATAR_SUCCESS: {
            if (newState[action.payload.id]) {
                newState[action.payload.id].data.profileImage = action.payload.profileImage;
            }
            return newState;
        }
        case SAVE_BACKGROUND_SUCCESS: {
            if (newState[action.payload.id]) {
                newState[action.payload.id].data.backgroundImage = action.payload.backgroundImage;
            }
            return newState;
        }
        case SAVE_PROFILE_SUCCESS: {
            if (newState[action.payload.id]) {
                newState[action.payload.profile.id].data = _.merge({}, newState[action.payload.profile.id].data, action.payload.profile);
            }
            return newState;
        }
    }
    return newState;
};

