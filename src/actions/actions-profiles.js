// Modules
import _ from 'lodash';
import 'whatwg-fetch';

// Modules
import {
    LIKE_PROFILE_URL,
    LOAD_DEALSHOP_URL,
    LOAD_DOT_COLLECTIONS_URL,
    LOAD_FAVORITE_RETAILERS_URL,
    LOAD_FOLLOWING_USER_PROFILES_URL,
    LOAD_LIKED_DOTS_URL,
    LOAD_PROFILE_BY_ID_URL,
    LOAD_RELATED_USERS_FOR_PROFILE_URL,
    UNLIKE_PROFILE_URL
} from '../urls.js';

import {loadDotsPageForProfile} from './profiles/dots/loadDotsPage.js';
import {loadCollectionsPageForProfile} from './profiles/collections/loadCollectionsPage.js';
import {loadLikesPageForProfile} from './profiles/likes/loadLikesPage.js';
import {loadTrendingPageForProfile} from './profiles/trending/loadTrendingPage.js';
import {loadCouponsPageForProfile} from './profiles/coupons/loadCouponsPage.js';
import {loadDealsPageForProfile} from './profiles/deals/loadDealsPage.js';
import {setValueForKeyInMapUsernameToId} from './mapUsernameToId/setValueForKey.js';
import {flushVolumes} from './pages/flushVolumes.js';
import {loadPartialProfiles} from './profiles/loadPartialProfiles.js';
import {loadProfile} from './actions-profile.js';

export const LOAD_PROFILE_BY_ID_REQUEST = 'LOAD_PROFILE_BY_ID_REQUEST';
export const LOAD_PROFILE_BY_ID_SUCCESS = 'LOAD_PROFILE_BY_ID_SUCCESS';
export const LOAD_PROFILE_BY_ID_FAILURE = 'LOAD_PROFILE_BY_ID_FAILURE';

export const loadProfileByIdRequest = payload => ({
    type: LOAD_PROFILE_BY_ID_REQUEST,
    payload
});

export const loadProfileByIdSuccess = payload => ({
    type: LOAD_PROFILE_BY_ID_SUCCESS,
    payload
});

export const loadProfileByIdFailure = payload => ({
    type: LOAD_PROFILE_BY_ID_FAILURE,
    payload
});

export const loadProfileById = username => dispatch => {
    return new Promise(function (resolve, reject) {
        let payload = {
            username
        };
        console.warn('load profile by id payload', payload);
        dispatch(loadProfileByIdRequest(payload));

        let url = LOAD_PROFILE_BY_ID_URL(username);
        fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                    if (response.ServiceResponse &&
                        response.ServiceResponse.responseCode === 'SUCCESS') {
                        let data = response.ServiceResponse.responseData[0];
                        let id = data.id;
                        let payload = {
                            id,
                            username,
                            data
                        };
                        dispatch(flushVolumes({id}));
                        dispatch(loadProfileByIdSuccess(payload));
                        dispatch(setValueForKeyInMapUsernameToId({key: username, value: id}));
                        resolve(data);
                    } else {
                        dispatch(loadProfileByIdFailure(payload));
                        reject();
                    }
                },
                error => {
                    console.log('error', error);
                    dispatch(loadProfileByIdFailure(payload));
                    reject();
                });
    });
};

export const LOAD_FOLLOWING_USER_PROFILES_REQUEST = 'LOAD_FOLLOWING_USER_PROFILES_REQUEST';
export const LOAD_FOLLOWING_USER_PROFILES_SUCCESS = 'LOAD_FOLLOWING_USER_PROFILES_SUCCESS';
export const LOAD_FOLLOWING_USER_PROFILES_FAILURE = 'LOAD_FOLLOWING_USER_PROFILES_FAILURE';

export const loadFollowingUserProfilesRequest = payload => ({
    type: LOAD_FOLLOWING_USER_PROFILES_REQUEST,
    payload
});

export const loadFollowingUserProfilesSuccess = payload => ({
    type: LOAD_FOLLOWING_USER_PROFILES_SUCCESS,
    payload
});

export const loadFollowingUserProfilesFailure = payload => ({
    type: LOAD_FOLLOWING_USER_PROFILES_FAILURE,
    payload
});

export const loadFollowingUserProfiles = (id, type, username) => dispatch => {
    return new Promise(function (resolve, reject) {
        //if (type === 'DealShop') {
        //resolve();
        //return;
        //}

        let payload = {
            id,
            type,
            username
        };
        dispatch(loadFollowingUserProfilesRequest(payload));

        let url = LOAD_FOLLOWING_USER_PROFILES_URL(id); // Attention! Function call!
        fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'json/application'
            }
        })
            .then(response => response.json())
            .then(json => {
                    if (json.ServiceResponse &&
                        json.ServiceResponse.responseCode === 'SUCCESS') {
                        let payload = {
                            id,
                            username,
                            data: json.ServiceResponse.responseData
                        };
                        dispatch(loadFollowingUserProfilesSuccess(payload));
                        resolve();
                    } else {
                        let payload = {
                            id,
                            username
                        };
                        dispatch(loadFollowingUserProfilesFailure(payload));
                        reject();
                    }
                },
                error => {
                    console.log('error', error);
                    let payload = {
                        id,
                        username
                    };
                    dispatch(loadFollowingUserProfilesFailure(payload));
                    reject();
                });
    });

};

export const LOAD_FAVORITE_RETAILERS_REQUEST = 'LOAD_FAVORITE_RETAILERS_REQUEST';
export const LOAD_FAVORITE_RETAILERS_SUCCESS = 'LOAD_FAVORITE_RETAILERS_SUCCESS';
export const LOAD_FAVORITE_RETAILERS_FAILURE = 'LOAD_FAVORITE_RETAILERS_FAILURE';

export const loadFavoriteRetailersRequest = payload => ({
    type: LOAD_FAVORITE_RETAILERS_REQUEST,
    payload
});

export const loadFavoriteRetailersSuccess = payload => ({
    type: LOAD_FAVORITE_RETAILERS_SUCCESS,
    payload
});

export const loadFavoriteRetailersFailure = payload => ({
    type: LOAD_FAVORITE_RETAILERS_FAILURE,
    payload
});

export const loadFavoriteRetailers = (id, type, username) => dispatch => {
    return new Promise(function (resolve, reject) {
        //if (type === 'DealShop') {
        //resolve();
        //return;
        //}

        let payload = {
            id,
            username
        };
        dispatch(loadFavoriteRetailersRequest(payload));

        let url = LOAD_FAVORITE_RETAILERS_URL(id); // Attention! Function call!
        fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'json/application'
            }
        })
            .then(response => response.json())
            .then(json => {
                    if (json.ServiceResponse &&
                        json.ServiceResponse.responseCode === 'SUCCESS') {
                        let payload = {
                            id,
                            username,
                            data: json.ServiceResponse.responseData
                        };
                        dispatch(loadFavoriteRetailersSuccess(payload));
                        resolve();
                    } else {
                        let payload = {
                            id,
                            username
                        };
                        dispatch(loadFavoriteRetailersFailure(payload));
                        reject();
                    }
                },
                error => {
                    console.log('error', error);
                    let payload = {
                        id,
                        username
                    };
                    dispatch(loadFavoriteRetailersFailure(payload));
                    reject();
                });
    });
};


export const GET_PROFILE_BY_ID_REQUEST = 'GET_PROFILE_BY_ID_REQUEST';
export const GET_PROFILE_BY_ID_SUCCESS = 'GET_PROFILE_BY_ID_SUCCESS';
export const GET_PROFILE_BY_ID_FAILURE = 'GET_PROFILE_BY_ID_FAILURE';

export const getProfileByIdRequest = payload => ({
    type: GET_PROFILE_BY_ID_REQUEST,
    payload
});

export const getProfileByIdSuccess = payload => ({
    type: GET_PROFILE_BY_ID_SUCCESS,
    payload
});

export const getProfileByIdFailure = payload => ({
    type: GET_PROFILE_BY_ID_FAILURE,
    payload
});

export const getProfileById = username => dispatch => {
    let payload = {
        username,
    };
    dispatch(getProfileByIdRequest());

    (async function getData() {
        const user = await dispatch(loadProfileById(username));
        let idsToLoad = [...user.followings, ...user.favoriteRetailers].map(item => item.id);
        idsToLoad.push(...user.userStat.followersUserIds);
        await dispatch(loadPartialProfiles({ids: idsToLoad}));
        await dispatch(loadFollowingUserProfiles(user.id, user.type, username));
        // await dispatch(loadFavoriteRetailers(user.id, user.type, username));
        // const id = (user.type.toLowerCase() === 'retailer') ? user.shopId : user.id;
        if (user.type !== 'DealShop') await dispatch(getProfileExtraData(user.id, username));
    })()
        .then(
            () => {
                dispatch(getProfileByIdSuccess(payload));
                //if (type === 'DealShop') return;
                //dispatch(getProfileExtraData(id));
                //dispatch(loadLikedDots(id));
                //dispatch(loadDotCollections(id));
            },
            error => {
                console.log(error);
                dispatch(getProfileByIdFailure(payload));
            }
        );

};

export const LOAD_LIKED_DOTS_REQUEST = 'LOAD_LIKED_DOTS_REQUEST';
export const LOAD_LIKED_DOTS_SUCCESS = 'LOAD_LIKED_DOTS_SUCCESS';
export const LOAD_LIKED_DOTS_FAILURE = 'LOAD_LIKED_DOTS_FAILURE';

export const loadLikedDotsRequest = payload => ({
    type: LOAD_LIKED_DOTS_REQUEST,
    payload
});

export const loadLikedDotsSuccess = payload => ({
    type: LOAD_LIKED_DOTS_SUCCESS,
    payload
});

export const loadLikedDotsFailure = payload => ({
    type: LOAD_LIKED_DOTS_FAILURE,
    payload
});

export const loadLikedDots = (id, username) => dispatch => {
    return new Promise(function (resolve, reject) {
        let payload = {
            id,
            username
        };
        dispatch(loadLikedDotsRequest(id));

        let url = LOAD_LIKED_DOTS_URL(id); // Attention! Function call!
        fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'json/application'
            }
        })
            .then(response => response.json())
            .then(json => {
                    if (json.ServiceResponse &&
                        json.ServiceResponse.responseCode === 'SUCCESS') {
                        let payload = {
                            id,
                            username,
                            data: json.ServiceResponse.responseData
                        };
                        dispatch(loadLikedDotsSuccess(payload));
                        resolve();
                    } else {
                        let payload = {
                            id,
                            username
                        };
                        dispatch(loadLikedDotsFailure(payload));
                        reject();
                    }
                },
                error => {
                    console.log('error', error);
                    let payload = {
                        id,
                        username
                    };
                    dispatch(loadLikedDotsFailure(payload));
                    reject();
                });
    });
};

export const LOAD_DOT_COLLECTIONS_REQUEST = 'LOAD_DOT_COLLECTIONS_REQUEST';
export const LOAD_DOT_COLLECTIONS_SUCCESS = 'LOAD_DOT_COLLECTIONS_SUCCESS';
export const LOAD_DOT_COLLECTIONS_FAILURE = 'LOAD_DOT_COLLECTIONS_FAILURE';

export const loadDotCollectionsRequest = payload => ({
    type: LOAD_DOT_COLLECTIONS_REQUEST,
    payload
});

export const loadDotCollectionsSuccess = payload => ({
    type: LOAD_DOT_COLLECTIONS_SUCCESS,
    payload
});

export const loadDotCollectionsFailure = payload => ({
    type: LOAD_DOT_COLLECTIONS_FAILURE,
    payload
});

export const loadDotCollections = (id, username) => dispatch => {
    return new Promise(function (resolve, reject) {
        let payload = {
            id,
            username
        };
        dispatch(loadDotCollectionsRequest(payload));

        let url = LOAD_DOT_COLLECTIONS_URL(id);
        fetch(url, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'json/application'
            }
        })
            .then(response => response.json())
            .then(json => {
                    let userIds = []; // userIds for loadRelatedUsersForProfile()
                    if (json.ServiceResponse &&
                        json.ServiceResponse.responseCode === 'SUCCESS') {
                        let data = {};
                        console.log('response collections data', json.ServiceResponse.responseData);
                        for (let item of json.ServiceResponse.responseData) {
                            for (let userId in item) {
                                if (!item[userId]) continue;
                                data[userId] = item[userId];

                                if (item[userId].ownerId) userIds.push(item[userId].ownerId);
                                if (item[userId].dotUserId) userIds.push(item[userId].dotUserId);
                                if (item[userId].originalDotUserId) userIds.push(item[userId].originalDotUserId);
                            }
                        }
                        let payload = {
                            id,
                            username,
                            data
                        };
                        dispatch(loadDotCollectionsSuccess(payload));
                        let getRelatedUsersForProfile = dispatch(loadRelatedUsersForProfile(id, userIds, username));
                        getRelatedUsersForProfile
                            .then(() => resolve())
                            .catch((error) => {
                                console.log(error);
                                reject()
                            });
                    } else {
                        let payload = {
                            id,
                            username
                        };
                        dispatch(loadDotCollectionsFailure(payload));
                        reject();
                    }
                },
                error => {
                    console.log('error', error);
                    let payload = {
                        id,
                        username
                    };
                    dispatch(loadDotCollectionsFailure(payload));
                    reject();
                });
    });
};

export const LOAD_RELATED_USERS_FOR_PROFILE_REQUEST = 'LOAD_RELATED_USERS_FOR_PROFILE_REQUEST';
export const LOAD_RELATED_USERS_FOR_PROFILE_SUCCESS = 'LOAD_RELATED_USERS_FOR_PROFILE_SUCCESS';
export const LOAD_RELATED_USERS_FOR_PROFILE_FAILURE = 'LOAD_RELATED_USERS_FOR_PROFILE_FAILURE';

export const loadRelatedUsersForProfileRequest = payload => ({
    type: LOAD_RELATED_USERS_FOR_PROFILE_REQUEST,
    payload
})

export const loadRelatedUsersForProfileSuccess = payload => ({
    type: LOAD_RELATED_USERS_FOR_PROFILE_SUCCESS,
    payload
})

export const loadRelatedUsersForProfileFailure = payload => ({
    type: LOAD_RELATED_USERS_FOR_PROFILE_FAILURE,
    payload
})

export const loadRelatedUsersForProfile = (id, userIds, username) => dispatch => {
    return new Promise(function (resolve, reject) {
        let payload = {
            id,
            username
        };
        dispatch(loadRelatedUsersForProfileRequest(payload));

        userIds = [...new Set(userIds)];
        let body = [];
        for (let id of userIds) {
            body.push({
                id,
                type: 'UserProfile'
            });
        }

        let url = LOAD_RELATED_USERS_FOR_PROFILE_URL;
        fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(json => {
                    let data = {};
                    if (json.ServiceResponse &&
                        json.ServiceResponse.responseCode === 'SUCCESS') {
                        for (let user of json.ServiceResponse.responseData) {
                            data[user.id] = user;
                        }
                        let payload = {
                            id,
                            username,
                            data
                        };
                        dispatch(loadRelatedUsersForProfileSuccess(payload));
                        resolve();
                    } else {
                        let payload = {
                            id,
                            username
                        };
                        dispatch(loadRelatedUsersForProfileFailure(payload));
                        reject();
                    }
                },
                error => {
                    console.log(error);
                    let payload = {
                        id,
                        username
                    };
                    dispatch(loadRelatedUsersForProfileFailure(payload));
                    reject();
                });
    });
}

export const GET_PROFILE_EXTRA_DATA_REQUEST = 'GET_PROFILE_EXTRA_DATA_REQUEST';
export const GET_PROFILE_EXTRA_DATA_SUCCESS = 'GET_PROFILE_EXTRA_DATA_SUCCESS';
export const GET_PROFILE_EXTRA_DATA_FAILURE = 'GET_PROFILE_EXTRA_DATA_FAILURE';

export const getProfileExtraDataRequest = payload => ({
    type: GET_PROFILE_EXTRA_DATA_REQUEST,
    payload
});

export const getProfileExtraDataSuccess = payload => ({
    type: GET_PROFILE_EXTRA_DATA_SUCCESS,
    payload
});

export const getProfileExtraDataFailure = payload => ({
    type: GET_PROFILE_EXTRA_DATA_FAILURE,
    payload
});

export const getProfileExtraData = (id, username) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let payload = {
            id,
            username
        };
        const profile = getState().profiles[id].data;

        dispatch(getProfileExtraDataRequest(payload));
        let actions = [];
        if (profile.type.toUpperCase() === 'RETAILER') {
            actions = [
                dispatch(loadCouponsPageForProfile({id: getState().profiles[id].data.shopId})),
                dispatch(loadDealsPageForProfile({id: getState().profiles[id].data.shopId})),
                dispatch(loadTrendingPageForProfile({id})),
            ];
        } else {
            actions = [
                // dispatch(loadLikedDots(id, username)),
                // dispatch(loadDotCollections(id, username)),
                dispatch(loadDotsPageForProfile({id, username})),
                dispatch(loadCollectionsPageForProfile({id, username})),
                dispatch(loadLikesPageForProfile({id, username})),
                dispatch(loadTrendingPageForProfile({id}))
            ];
        }


        Promise.all(actions)
            .then(
                () => {
                    let payload = {id, username};
                    dispatch(getProfileExtraDataSuccess(payload));
                    resolve();
                },
                error => {
                    console.log(error);
                    let payload = {
                        id,
                        username
                    };
                    dispatch(getProfileExtraDataFailure(id));
                    reject();
                }
            );
    });
};

export const findProfileDot = (profileId, dotId) => (dispatch, getState) => {
    let state = getState();
    let profile = state.profiles[profileId].data;
    let type = profile.type.toLowerCase();
    let dots = {};
    if (profile.type === 'retailer') {
        for (let dot of profile.trending) {
            dots[dot.id] = dot
        }
    } else {
        dots = _.merge({}, profile.dotCollectionsData);
        for (let dot of profile.likesData) {
            dots[dot.id] = dot
        }
    }
    let dot = dots[dotId];
    return dot;
}

export const LOAD_DEALSHOP_BY_ID_REQUEST = 'LOAD_DEALSHOP_BY_ID_REQUEST';
export const LOAD_DEALSHOP_BY_ID_SUCCESS = 'LOAD_DEALSHOP_BY_ID_SUCCESS';
export const LOAD_DEALSHOP_BY_ID_FAILURE = 'LOAD_DEALSHOP_BY_ID_FAILURE';

export const loadDealshopByIdRequest = payload => ({
    type: LOAD_DEALSHOP_BY_ID_REQUEST,
    payload
});

export const loadDealshopByIdSuccess = payload => ({
    type: LOAD_DEALSHOP_BY_ID_SUCCESS,
    payload
});

export const loadDealshopByIdFailure = payload => ({
    type: LOAD_DEALSHOP_BY_ID_FAILURE,
    payload
});

export const loadDealshopById = data => dispatch => {
    dispatch(loadDealshopByIdRequest({...data}));
    const {id} = data;
    const body = {
        "filters": [
            {
                "fieldName": "id",
                "operator": "=",
                "value": id
            }
        ]
    };

    fetch(LOAD_DEALSHOP_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(
            response => response.json(),
            error => {
                dispatch(loadDealshopByIdFailure({...data}))
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = response.ServiceResponse.responseData[0];
                dispatch(loadDealshopByIdSuccess(payload));
            } else {
                dispatch(loadDealshopByIdFailure({...data}));
            }
        })
};

export const LIKE_PROFILE_REQUEST = 'LIKE_PROFILE_REQUEST';
export const LIKE_PROFILE_SUCCESS = 'LIKE_PROFILE_SUCCESS';
export const LIKE_PROFILE_FAILURE = 'LIKE_PROFILE_FAILURE';

export const likeProfileRequest = payload => ({
    type: LIKE_PROFILE_REQUEST,
    payload
})

export const likeProfileSuccess = payload => ({
    type: LIKE_PROFILE_SUCCESS,
    payload
})

export const likeProfileFailure = payload => ({
    type: LIKE_PROFILE_FAILURE,
    payload
})

export const UNLIKE_PROFILE_REQUEST = 'UNLIKE_PROFILE_REQUEST';
export const UNLIKE_PROFILE_SUCCESS = 'UNLIKE_PROFILE_SUCCESS';
export const UNLIKE_PROFILE_FAILURE = 'UNLIKE_PROFILE_FAILURE';

export const unlikeProfileRequest = payload => ({
    type: UNLIKE_PROFILE_REQUEST,
    payload
})

export const unlikeProfileSuccess = payload => ({
    type: UNLIKE_PROFILE_SUCCESS,
    payload
})

export const unlikeProfileFailure = payload => ({
    type: UNLIKE_PROFILE_FAILURE,
    payload
})

// Like dot
export const likeProfile = (id, type, path) => dispatch => {
    let payload = {id};
    dispatch(likeProfileRequest(payload));

    let data = {
        id,
        type
    };

    fetch(LIKE_PROFILE_URL, {
        body: JSON.stringify(data),
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
            response => response.json(),
            error => {
                let payload = {id};
                dispatch(likeProfileFailure(payload));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    id,
                    type,
                    path
                };
                dispatch(likeProfileSuccess(payload));
                dispatch(loadProfile());
            } else {
                let payload = {id};
                dispatch(likeProfileFailure(payload));
            }
        })
        .catch(error => {
            console.log('like profile error', error);
        });
}

// Unlike dot
export const unlikeProfile = (id, type, path) => dispatch => {
    let payload = {id};
    dispatch(unlikeProfileRequest(payload));

    let data = {
        id,
        type
    };
    fetch(UNLIKE_PROFILE_URL, {
        body: JSON.stringify(data),
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
            response => response.json(),
            error => {
                let payload = {id};
                dispatch(unlikeProfileFailure(payload));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    id,
                    type,
                    path
                };
                dispatch(unlikeProfileSuccess(payload));
                dispatch(loadProfile());
            } else {
                let payload = {id};
                dispatch(unlikeProfileFailure(payload));
            }
        })
        .catch(error => {
            console.log('unlike profile error', error);
        });
};

// Route like button action
export const routeLikeProfile = (id, type, path) => (dispatch, getState) => {
    let likedProfiles = getState().user.data.likes;

    if (likedProfiles) {
        for (let dot of likedProfiles) {
            if (dot.id === id) {
                dispatch(unlikeProfile(id, type, path));
                return;
            }
        }
    }

    dispatch(likeProfile(id, type, path));
};
