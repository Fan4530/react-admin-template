import _ from 'lodash';

import { SET_VALUE_FOR_KEY_IN_MAP_USERNAME_TO_ID } from '../actions/mapUsernameToId/setValueForKey.js';
import { SET_VALUES_FOR_KEYS_IN_MAP_USERNAME_TO_ID } from '../actions/mapUsernameToId/setValuesForKeys.js';

export const initialState = {};

export const mapUsernameToId = (state=initialState, action) => {
	let newState = _.merge({}, state);
	switch (action.type) {
		case SET_VALUE_FOR_KEY_IN_MAP_USERNAME_TO_ID:
			{
				newState[action.payload.key] = action.payload.value;
				return newState;
			}
		case SET_VALUES_FOR_KEYS_IN_MAP_USERNAME_TO_ID:
			{
				action.payload.pairs.map(({key, value}) => {
						newState[key] = value;
						});
				return newState;
			}

	}
	return state;
};