// Modules
import $ from 'jquery';
import { LOAD_RELEVANT_DOTS_URL } from '../urls.js';
import { getBase64 } from './actions-utils.js';
import { pushDots } from './dotStorage/pushDots.js'
import 'whatwg-fetch';

export const LOAD_RELEVANT_DOTS_REQUEST = 'LOAD_RELEVANT_DOTS_REQUEST';
export const LOAD_RELEVANT_DOTS_SUCCESS = 'LOAD_RELEVANT_DOTS_SUCCESS';
export const LOAD_RELEVANT_DOTS_FAILURE = 'LOAD_RELEVANT_DOTS_FAILURE';

export const sendRelevantdotsRequest = payload => ({
    type: LOAD_RELEVANT_DOTS_REQUEST,
    payload
});

export const sendRelevantdotsSuccess = payload => ({
    type: LOAD_RELEVANT_DOTS_SUCCESS,
    payload
});

export const sendRelevantdotsFailure = payload => ({
    type: LOAD_RELEVANT_DOTS_FAILURE,
    payload
});

// Send email
export const loadRelevantDots = (count, type, id) => dispatch => {
    dispatch(sendRelevantdotsRequest({ id }));

    let data = {
        count,
        type,
        id
    };

    fetch(`${LOAD_RELEVANT_DOTS_URL}?`+ $.param(data), { 
        method: 'get', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse && 
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let relevantDots = response.ServiceResponse.responseData;
                let payload = {
                    id,
                    data: relevantDots
                };
                dispatch(pushDots({ dots: relevantDots }));
                dispatch(sendRelevantdotsSuccess(payload));
            } else {
                dispatch(sendRelevantdotsFailure({ id }));
            }
        })
        .catch(error => {
            dispatch(sendRelevantdotsFailure({ id }));
        });
};

export const fillRelevantDotsWithBase64 = dots => {
    let promises = [];

    for (let dot of dots) {
        promises.push(
            getBase64(dot.object.dotSummary.dotImageUrl).then((base64) => {
                dot.object.dotSummary.dotImageBase64 = base64;
            }),
        );
    }

    return Promise.all(promises)
        .then(() => dots);
};
