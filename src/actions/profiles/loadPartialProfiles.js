import _ from 'lodash';

import { LOAD_RELATED_USERS_FOR_PROFILE_URL } from '../../urls.js';
import { checkResponse, checkResponseJson, getResponseData } from '../../utils.js';
import { checkStatus } from '../auth/checkStatus.js';

import { setValuesForKeysInMapUsernameToId } from '../mapUsernameToId/setValuesForKeys.js';

export const LOAD_PARTIAL_PROFILES_REQUEST = 'LOAD_PARTIAL_PROFILES_REQUEST';
export const LOAD_PARTIAL_PROFILES_SUCCESS = 'LOAD_PARTIAL_PROFILES_SUCCESS';
export const LOAD_PARTIAL_PROFILES_FAILURE = 'LOAD_PARTIAL_PROFILES_FAILURE';

export const loadPartialProfilesRequest = payload => ({
    type: LOAD_PARTIAL_PROFILES_REQUEST,
    payload
});

export const loadPartialProfilesSuccess = payload => ({
    type: LOAD_PARTIAL_PROFILES_SUCCESS,
    payload
});

export const loadPartialProfilesFailure = payload => ({
    type: LOAD_PARTIAL_PROFILES_FAILURE,
    payload
});

export const loadPartialProfiles = data => dispatch => {
    dispatch(loadPartialProfilesRequest({ ...data}));

    let { ids, cache=false } = data;
    ids = _.uniq(ids);
    const url = LOAD_RELATED_USERS_FOR_PROFILE_URL;
    const body = JSON.stringify(ids.map(id => ({ id, type: 'UserProfile' })));

    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then(
        response => {
            if (checkResponse(response)) {
                return response.json();
            } else {
                dispatch(loadPartialProfilesFailure({ ...data }));
                dispatch(checkStatus(response.status));
            }
        },
        error => {
            console.log('load partial profiles error', error);
            dispatch(loadPartialProfilesFailure({ ...data }));
        }
    )
    .then(response => {
        if (checkResponseJson(response)) {
            dispatch(loadPartialProfilesSuccess({ profiles: getResponseData(response).map(profile => _.merge({}, profile, { cache })) || [] }));
            dispatch(setValuesForKeysInMapUsernameToId({ pairs: getResponseData(response).map(profile => ({ key: profile.name, value: profile.id}))}));
        } else {
            dispatch(loadPartialProfilesFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log('load partial profiles error', error);
    });
};

