import _ from 'lodash'

export const initialState = {
};

import {
	LOAD_RELEVANT_DOTS_REQUEST,
	LOAD_RELEVANT_DOTS_SUCCESS,
	LOAD_RELEVANT_DOTS_FAILURE
} from '../actions/actions-relevant_dots.js';

export const relevantDots = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_RELEVANT_DOTS_REQUEST:
			return _.merge({}, state, { 
				[action.payload.id]: {
					isLoading: true,
					isErrored: false
				}
			});
		case LOAD_RELEVANT_DOTS_SUCCESS:
			return _.merge({}, state, {
				[action.payload.id]: {
					data: action.payload.data,
					isLoading: false,
					isErrored: false
				}
			});
		case LOAD_RELEVANT_DOTS_FAILURE:
			return _.merge({}, state, {
				[action.payload.id]: {
					isLoading: false,
					isErrored: true
				}
			});
	}
	return state;
};

