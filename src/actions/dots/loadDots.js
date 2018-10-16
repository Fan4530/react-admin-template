import { LOAD_DOT_URL } from '../../urls.js';

export const LOAD_DOTS_REQUEST = 'LOAD_DOTS_REQUEST';
export const LOAD_DOTS_SUCCESS = 'LOAD_DOTS_SUCCESS';
export const LOAD_DOTS_FAILURE = 'LOAD_DOTS_FAILURE';

export const loadDotsRequest = payload => ({
    type: LOAD_DOTS_REQUEST,
    payload
});

export const loadDotsSuccess = payload => ({
    type: LOAD_DOTS_SUCCESS,
    payload
});

export const loadDotsFailure = payload => ({
    type: LOAD_DOTS_FAILURE,
    payload
});

export const loadDots = ({ list }) => dispatch => {
    dispatch(loadDotsRequest());

	const body = JSON.stringify(list);

    fetch(LOAD_DOT_URL, {
        method: 'post',
        credentials: 'include',
		body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = {
                    dots: json.ServiceResponse.responseData[0]
                };
                dispatch(loadDotsSuccess(payload));
            } else {
                dispatch(loadDotsFailure());
            }
        })
        .catch(error => {
                dispatch(loadDotsFailure());
        });
};
