// Modules
import { LOAD_PROFILE_URL, SAVE_PROFILE_URL, UPDATE_PASSWORD_URL, UPDATE_EMAIL_URL, VERIFY_EMAIL_URL } from '../urls.js';
import 'whatwg-fetch';

import { loadProfileById } from './actions-profiles.js';
import { enqueueAlert } from './alerts/enqueue.js';

import { SAVE_PROFILE_SUCCESS_ALERT_TEXT, SOMETHING_WRONG_ALERT_TEXT, UPDATE_PASSWORD_SUCCESS_ALERT_TEXT } from '../constants.js';
import { VERIFY_EMAIL_SUCCESS_ALERT_TEXT, UPDATE_EMAIL_SUCCESS_ALERT_TEXT } from "../constants";

export const LOAD_PROFILE_REQUEST = 'LOAD_PROFILE_REQUEST';
export const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE';

export const loadProfileRequest = payload => ({
    type: LOAD_PROFILE_REQUEST,
    payload
});

export const loadProfileSuccess = payload => ({
    type: LOAD_PROFILE_SUCCESS,
    payload
});

export const loadProfileFailure = payload => ({
    type: LOAD_PROFILE_FAILURE,
    payload
});

// Load profile
export const loadProfile = () => dispatch => {
    console.log(LOAD_PROFILE_URL)
    dispatch(loadProfileRequest());

    fetch(LOAD_PROFILE_URL, {
        method: 'post',
        body: '{}',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = response.ServiceResponse.responseData[0];
                dispatch(loadProfileSuccess(payload));
            } else {
                dispatch(loadProfileFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadProfileFailure());
        });
};


export const SAVE_PROFILE_REQUEST = 'SAVE_PROFILE_REQUEST';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const SAVE_PROFILE_FAILURE = 'SAVE_PROFILE_FAILURE';

export const saveProfileRequest = payload => ({
    type: SAVE_PROFILE_REQUEST,
    payload
});

export const saveProfileSuccess = payload => ({
    type: SAVE_PROFILE_SUCCESS,
    payload
});

export const saveProfileFailure = payload => ({
    type: SAVE_PROFILE_FAILURE,
    payload
});

// Load profile
export const saveProfile = data => (dispatch, getState) => {
    dispatch(saveProfileRequest());
    const id = getState().user.data.id;
    const user = getState().user.data;

    let body = {
        id
    };

    if (data.name && user.name !== data.name) body.name = data.name;
    if (data.firstName && user.firstName !== data.firstName) body.firstName = data.firstName;
    if (data.lastName && user.lastName !== data.lastName) body.lastName = data.lastName;
    if (data.age && user.age !== data.age) body.age = data.age;
    if (data.gender && user.gender !== data.gender) body.gender = data.gender;
    if (data.bio && user.bio !== data.bio) body.bio = data.bio;
    if (data.email && user.email !== data.email) body.email = data.email;
    //social detail
    if (data.social && (data.social.facebookProfileLink || data.social.facebookProfileLink === '')) {
        if (!body.social) body.social = {};
        body.social.facebookProfileLink = data.social.facebookProfileLink;
    }
    if (data.social && (data.social.twitterProfileLink || data.social.twitterProfileLink === '')) {
        if (!body.social) body.social = {};
        body.social.twitterProfileLink = data.social.twitterProfileLink;
    }
    if (data.social && (data.social.instagramProfileLink || data.social.instagramProfileLink === '')) {
        if (!body.social) body.social = {};
        body.social.instagramProfileLink = data.social.instagramProfileLink;
    }
    if (data.social && (data.social.snapchatProfileLink || data.social.snapchatProfileLink === '')) {
        if (!body.social) body.social = {};
        body.social.snapchatProfileLink = data.social.snapchatProfileLink;
    }
    if (data.social && (data.social.pinterestProfileLink || data.social.pinterestProfileLink === '')) {
        if (!body.social) body.social = {};
        body.social.pinterestProfileLink = data.social.pinterestProfileLink;
    }
    if (data.social && (data.social.youtubeProfileLink || data.social.pinterestProfileLink === '')) {
        if (!body.social) body.social = {};
        body.social.youtubeProfileLink = data.social.youtubeProfileLink;
    }
    if (data.userPreference) { // todo : also check inside
        body.userPreference = data.userPreference;
    }
    if(data.backgroundImage){ body.backgroundImage = data.backgroundImage; }
    if(data.profileImage){ body.profileImage = data.profileImage; }

    fetch(SAVE_PROFILE_URL, {
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
                console.log(error);
                dispatch(saveProfileFailure());
                dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = { profile: response.ServiceResponse.responseData[0] };
                dispatch(saveProfileSuccess(payload));
                dispatch(enqueueAlert({ alert: { text: SAVE_PROFILE_SUCCESS_ALERT_TEXT } }));

            } else {
                dispatch(saveProfileFailure());
                dispatch(enqueueAlert({ alert: { text: response.ServiceResponse.responseMessage || SOMETHING_WRONG_ALERT_TEXT } }));
            }
        })
        .catch(error => {
            console.log(error);
        });
};




export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

export const updatePasswordRequest = payload => ({
    type: UPDATE_PASSWORD_REQUEST,
    payload
});

export const updatePasswordSuccess = payload => ({
    type: UPDATE_PASSWORD_SUCCESS,
    payload
});

export const updatePasswordFailure = payload => ({
    type: UPDATE_PASSWORD_FAILURE,
    payload
});

// Load profile
export const updatePassword = data => dispatch => {
    const { password } = data;
  ////  console.log('PASSWORD', password);
    dispatch(updatePasswordRequest());

    const newPassword = JSON.stringify({ password });

    let body = new FormData();
    body.append('password', password);

    fetch(UPDATE_PASSWORD_URL, {
        method: 'post',
        body,
        credentials: 'include',
    })
        .then(

            response => response.json(),
            error => {
                console.log(error);
                dispatch(updatePasswordFailure());
                dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(updatePasswordSuccess());
                dispatch(enqueueAlert({ alert: { text: UPDATE_PASSWORD_SUCCESS_ALERT_TEXT } }));
            } else {
                dispatch(updatePasswordFailure());
                dispatch(enqueueAlert({ alert: { text: response.ServiceResponse.responseMessage || SOMETHING_WRONG_ALERT_TEXT } }));
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const UPDATE_EMAIL_REQUEST = 'UPDATE_EMAIL_REQUEST';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_EMAIL_FAILURE = 'UPDATE_EMAIL_FAILURE';

export const updateEmailRequest = payload => ({
    type: UPDATE_EMAIL_REQUEST,
    payload
});

export const updateEmailSuccess = payload => ({
    type: UPDATE_EMAIL_SUCCESS,
    payload
});

export const updateEmailFailure = payload => ({
    type: UPDATE_EMAIL_FAILURE,
    payload
});

// Load profile
export const updateEmail = data => dispatch => {
    const { email } = data;
    dispatch(updateEmailRequest());

    let body = new FormData();
    body.append('email', email);

    fetch(UPDATE_EMAIL_URL, {
        method: 'post',
        body,
        credentials: 'include',
    })
        .then(

            response => response.json(),
            error => {
                console.log(error);
                dispatch(updateEmailFailure());
                dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(updateEmailSuccess());
            } else {
                dispatch(updateEmailFailure());
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';

export const verifyEmailRequest = payload => ({
    type: VERIFY_EMAIL_REQUEST,
    payload
});

export const verifyEmailSuccess = payload => ({
    type: VERIFY_EMAIL_SUCCESS,
    payload
});

export const verifyEmailFailure = payload => ({
    type: VERIFY_EMAIL_FAILURE,
    payload
});

export const verifyEmail = ({ email, id }) => dispatch => {
    dispatch(verifyEmailRequest({ email, id }));
    fetch(VERIFY_EMAIL_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `email=${email}&id=${id}`
    })
        .then(
            res => {
                return res.json();
            },
            error => {
                dispatch(verifyEmailFailure({ email, id }));
            }
        )
        .then(res => {
            if (
                res &&
                res.ServiceResponse &&
                res.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(verifyEmailSuccess({ email, id }));
                dispatch(enqueueAlert({ alert: { text: VERIFY_EMAIL_SUCCESS_ALERT_TEXT } }));
            } else {
                dispatch(verifyEmailFailure({ email, id }));
                dispatch(enqueueAlert({ alert: { text: res.ServiceResponse ?
                            res.ServiceResponse.responseMessage : SOMETHING_WRONG_ALERT_TEXT} }));
            }
        });
};
