export const LOAD_DEFAULT_RETAILER_REQUEST = 'LOAD_DEFAULT_RETAILER_REQUEST';
export const LOAD_DEFAULT_RETAILER_SUCCESS = 'LOAD_DEFAULT_RETAILER_SUCCESS';
export const LOAD_DEFAULT_RETAILER_FAILURE = 'LOAD_DEFAULT_RETAILER_FAILURE';
import 'whatwg-fetch';

export const loadDefaultRetailerRequest = payload => ({
	type: LOAD_DEFAULT_RETAILER_REQUEST,
	payload
})

export const loadDefaultRetailerSuccess = payload => ({
	type: LOAD_DEFAULT_RETAILER_SUCCESS,
	payload
})

export const loadDefaultRetailerFailure = payload => ({
	type: LOAD_DEFAULT_RETAILER_FAILURE,
	payload
});