export const LOAD_DEFAULT_CURATOR_REQUEST = 'LOAD_DEFAULT_CURATOR_REQUEST';
export const LOAD_DEFAULT_CURATOR_SUCCESS = 'LOAD_DEFAULT_CURATOR_SUCCESS';
export const LOAD_DEFAULT_CURATOR_FAILURE = 'LOAD_DEFAULT_CURATOR_FAILURE';
import 'whatwg-fetch';

export const loadDefaultCuratorRequest = payload => ({
	type: LOAD_DEFAULT_CURATOR_REQUEST,
	payload
})

export const loadDefaultCuratorSuccess = payload => ({
	type: LOAD_DEFAULT_CURATOR_SUCCESS,
	payload
})

export const loadDefaultCuratorFailure = payload => ({
	type: LOAD_DEFAULT_CURATOR_FAILURE,
	payload
})

