import _ from 'lodash'

import {
	CHECK_AUTH_REQUEST,
	CHECK_AUTH_SUCCESS,
	CHECK_AUTH_FAILURE
} from '../actions/auth/checkAuth.js';

import { SIGN_UP_SUCCESS } from '../actions/auth/signUp.js';

import { SIGN_IN_SUCCESS } from '../actions/auth/signIn.js';

import { SIGN_OUT_SUCCESS } from '../actions/auth/signOut.js';

import { FILLED_PROFILE_INFO } from '../actions/auth/filledProfileInfo.js';

import { FOR_LOCALHOST } from '../utils/constants.js';

import { SOMETHING_WRONG_HAPPENED } from '../actions/auth/somethingWrongHappened.js';

export const initialState = {
	loggedIn: false,
	token: '',
	justSignedUp: false,
	somethingWrongHappened: false,
	signedOut: false
};

export const auth = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_AUTH_REQUEST:
			return state;
		case SIGN_IN_SUCCESS:
		case CHECK_AUTH_SUCCESS:
			return _.merge({}, state,
				{
					loggedIn: true,
					token: action.payload.token
				}
			);
		case SIGN_OUT_SUCCESS:
		case CHECK_AUTH_FAILURE:
			return _.merge({}, state,
				{
					loggedIn: FOR_LOCALHOST,
					token: '',
                    signedOut: true
				}
			);
		case SIGN_UP_SUCCESS:
			return _.merge({}, state, {
				justSignedUp: true
			});
		case FILLED_PROFILE_INFO:
			return _.merge({}, state,
				{
					justSignedUp: false
				}
			);
		case SOMETHING_WRONG_HAPPENED:
			return _.merge({}, state,
				{
					loggedIn: false,
					somethingWrongHappened: true
				}
			);
	}
	return state;
};

