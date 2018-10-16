// Modules
import { DELETE_DOT_URL, SAVE_DOT_URL, LOAD_DOT_URL, EDIT_DOT_URL, LOAD_DOT_CATEGORIES_URL} from '../urls.js';
import { LOAD_DOT_CATEGORIES_SUCCESS_INTERVAL, LOAD_DOT_CATEGORIES_FAILURE_INTERVAL } from '../intervals.js';
import { loadProfile } from '../actions/actions-profile.js';
import { getProfileById } from './actions-profiles.js';
import { addDotToCollection } from './collections/add-dot.js';
import { deleteDotFromCollection } from './collections/delete-dot.js';
import 'whatwg-fetch';
import { enqueueAlert } from './alerts/enqueue.js';
import { SAVE_DOT_SUCCESS_ALERT_TEXT, SOMETHING_WRONG_ALERT_TEXT, FOR_LOCALHOST } from '../constants.js';

export const DELETE_DOT_REQUEST = 'DELETE_DOT_REQUEST';
export const DELETE_DOT_SUCCESS = 'DELETE_DOT_SUCCESS';
export const DELETE_DOT_FAILURE = 'DELETE_DOT_FAILURE';

export const deleteDotRequest = payload => ({
    type: DELETE_DOT_REQUEST,
    payload
});

export const deleteDotSuccess = payload => ({
    type: DELETE_DOT_SUCCESS,
    payload
});

export const deleteDotFailure = payload => ({
    type: DELETE_DOT_FAILURE,
    payload
});

// Delete from my dots
export const deleteDot = ({id, type}) => (dispatch, getState) => {
    dispatch(deleteDotRequest());

    let data = {
        id,
        type
    };

    fetch(DELETE_DOT_URL, {
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
                dispatch(loadProfile());
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(deleteDotSuccess());
                dispatch(loadProfile());
                dispatch(getProfileById(getState().user.data.name))
            } else {
                dispatch(deleteDotFailure());
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const SAVE_DOT_REQUEST = 'SAVE_DOT_REQUEST';
export const SAVE_DOT_SUCCESS = 'SAVE_DOT_SUCCESS';
export const SAVE_DOT_FAILURE = 'SAVE_DOT_FAILURE';

export const saveDotRequest = payload => ({
    type: SAVE_DOT_REQUEST,
    payload
});

export const saveDotSuccess = payload => ({
    type: SAVE_DOT_SUCCESS,
    payload
});

export const saveDotFailure = payload => ({
    type: SAVE_DOT_FAILURE,
    payload
});

//export const saveDot = (type, url, title, description, imageUrl, collection) => (dispatch, getState) => {
export const saveDot = (data) => (dispatch, getState) => {
    const { userId, collectionName, description, image, pageUrl, dotMerchant, shopId=null, originalDotId=null, originalDotType=null, originalDotUserId=null, interstitialUrl=null, ownerId=null, collectionId } = data;
    let payload = {
        ...data
    };
    dispatch(saveDotRequest(payload));

    let body = [{
        dotUserId: userId,
        dotCollection: collectionName,
        dotSummary: {
            dotDescription: description,
            dotTitle: description,
            dotImageUrl: image,
            pageUrl: pageUrl
        },
        //dotMerchant: dotMerchant,
        shopId: shopId,
        originalDotId,
        originalDotType,
        originalDotUserId,
        interstitialUrl,
        ownerId
    }];

    fetch(SAVE_DOT_URL, {
        method: 'post',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
            response => response.json(),
            error => {
                dispatch(saveDotFailure());
                dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
            }
        )
        .then(json => {
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(saveDotSuccess(payload));
                dispatch(enqueueAlert({ alert: { text: SAVE_DOT_SUCCESS_ALERT_TEXT } }));
                (async () => {
                    await dispatch(addDotToCollection({
                        id: collectionId,
                        dot: {
                            id: json.ServiceResponse.responseData[0].id,
                            type: json.ServiceResponse.responseData[0].dotType

                        }
                    }));
                    await dispatch(loadProfile());
                    await dispatch(getProfileById(getState().user.data.name));
                })();
            } else {
                dispatch(saveDotFailure(payload));
                dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
            }
        })
        .catch(error => {
            console.log(error);
        });

};

export const LOAD_DOT_REQUEST = 'LOAD_DOT_REQUEST';
export const LOAD_DOT_SUCCESS = 'LOAD_DOT_SUCCESS';
export const LOAD_DOT_FAILURE = 'LOAD_DOT_FAILURE';

export const loadDotRequest = payload => ({
    type: LOAD_DOT_REQUEST,
    payload
});

export const loadDotSuccess = payload => ({
    type: LOAD_DOT_SUCCESS,
    payload
});

export const loadDotFailure = payload => ({
    type: LOAD_DOT_FAILURE,
    payload
});

export const loadDot = (id, type) => dispatch => {
    let payload = { id, type };
    dispatch(loadDotRequest(payload));

    let body = {
        id
    };
    if (type) {
        body.type = type;
    }

    fetch(LOAD_DOT_URL, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify([body]),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    data: json.ServiceResponse.responseData[0]
                };
                dispatch(loadDotSuccess(payload));
            } else {
                dispatch(loadDotFailure(payload));
            }
        })
        .catch(error => {
                dispatch(loadDotFailure(payload));
        });
};

export const EDIT_DOT_REQUEST = 'EDIT_DOT_REQUEST';
export const EDIT_DOT_SUCCESS = 'EDIT_DOT_SUCCESS';
export const EDIT_DOT_FAILURE = 'EDIT_DOT_FAILURE';

export const editDotRequest = payload => ({
    type: EDIT_DOT_REQUEST,
    payload
});

export const editDotSuccess = payload => ({
    type: EDIT_DOT_SUCCESS,
    payload
});

export const editDotFailure = payload => ({
    type: EDIT_DOT_FAILURE,
    payload
});

export const editDot = ({ id, type, description, link, collection }) => (dispatch, getState) => {
    let payload = { id, type, description, link, collection };
    dispatch(editDotRequest(payload));

    let dot = {
        id,
        dotSummary: {
            dotDescription: description,
            pageUrl: link,
        }
    };

    let body = JSON.stringify([dot]);

    let url = EDIT_DOT_URL(type);
    fetch(url, {
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
                dispatch(editDotSuccess());
                (async () => {
                    let currentCollectionName = getState().dotStorage[id].dotCollection;
                    let currentCollectionId = getState().user.data.collectionMap[currentCollectionName].id;
                    let newCollectionId = getState().user.data.collectionMap[collection].id;
                    if (currentCollectionId !== newCollectionId) {
                        await dispatch(deleteDotFromCollection({
                            id: currentCollectionId,
                            dot: {
                                id: response.ServiceResponse.responseData[0].id,
                                type: response.ServiceResponse.responseData[0].dotType

                            }
                        }));
                        await dispatch(addDotToCollection({
                            id: newCollectionId,
                            dot: {
                                id: response.ServiceResponse.responseData[0].id,
                                type: response.ServiceResponse.responseData[0].dotType

                            }
                        }));
                    }
                    await dispatch(loadProfile());
                    await dispatch(getProfileById(getState().user.data.name))
                })();
            } else {
                dispatch(editDotFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(editDotFailure(payload));
        });
};


export const LOAD_DOT_CATEGORIES_REQUEST = 'LOAD_DOT_CATEGORIES_REQUEST';
export const LOAD_DOT_CATEGORIES_SUCCESS = 'LOAD_DOT_CATEGORIES_SUCCESS';
export const LOAD_DOT_CATEGORIES_FAILURE = 'LOAD_DOT_CATEGORIES_FAILURE';

export const loadDotCategoriesRequest = payload => ({
    type: LOAD_DOT_CATEGORIES_REQUEST,
    payload
});

export const loadDotCategoriesSuccess = payload => ({
    type: LOAD_DOT_CATEGORIES_SUCCESS,
    payload
});

export const loadDotCategoriesFailure = payload => ({
    type: LOAD_DOT_CATEGORIES_FAILURE,
    payload
});

export const loadDotCategories = count => (dispatch, getState) => {
    if (!getState().auth.loggedIn) return;
    dispatch(loadDotCategoriesRequest());

    let body = JSON.stringify({
        pageSize: count
    });

    fetch(LOAD_DOT_CATEGORIES_URL, {
        method: 'post',
        credentials: 'include',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(
            json => {
                if (json.ServiceResponse &&
                    json.ServiceResponse.responseCode === 'SUCCESS') {
                    let payload = {
                        data: json.ServiceResponse.responseData
                    };
                    dispatch(loadDotCategoriesSuccess(payload));
                    setTimeout(() => {
                        dispatch(loadDotCategories(count));
                    }, LOAD_DOT_CATEGORIES_SUCCESS_INTERVAL);
                } else {
                    dispatch(loadDotCategoriesFailure());
                    setTimeout(() => {
                        dispatch(loadDotCategories(count));
                    }, LOAD_DOT_CATEGORIES_FAILURE_INTERVAL);
                }

            },
            error => {
                console.log(error);
                dispatch(loadDotCategoriesFailure());
                setTimeout(() => {
                    dispatch(loadDotCategories(count));
                }, LOAD_DOT_CATEGORIES_FAILURE_INTERVAL);
            });
}

