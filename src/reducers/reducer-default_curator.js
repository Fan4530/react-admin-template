import _ from 'lodash'

export const initialState = {
	data: {},
	isLoading: false,
	isErrored: false,
};

import {
	LOAD_DEFAULT_CURATOR_REQUEST,
	LOAD_DEFAULT_CURATOR_SUCCESS,
	LOAD_DEFAULT_CURATOR_FAILURE
} from '../actions/actions-default_curator.js';

export const defaultCurator = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DEFAULT_CURATOR_REQUEST:
			return _.merge({}, state, { 
				isLoading: true,
				isErrored: false
			});
		case LOAD_DEFAULT_CURATOR_SUCCESS:
			return _.merge({}, {
                data: action.payload,
				isLoading: false,
				isErrored: false
			});
		case LOAD_DEFAULT_CURATOR_FAILURE:
			return _.merge({}, state, {
				isLoading: false,
				isErrored: true
			});
	}
	return state;
};

