// Modules
import { SEND_REPORT_URL } from '../urls.js';
import 'whatwg-fetch';

export const SEND_REPORT_REQUEST = 'SEND_REPORT_REQUEST';
export const SEND_REPORT_SUCCESS = 'SEND_REPORT_SUCCESS';
export const SEND_REPORT_FAILURE = 'SEND_REPORT_FAILURE';

export const sendReportRequest = payload => ({
    type: SEND_REPORT_REQUEST,
    payload
})

export const sendReportSuccess = payload => ({
    type: SEND_REPORT_SUCCESS,
    payload
})

export const sendReportFailure = payload => ({
    type: SEND_REPORT_FAILURE,
    payload
})

// Send email
export const sendReport = (dotId, dotType, message) => dispatch => {
    dispatch(sendReportRequest());

    let data = {
        dotId,
        dotTypeId: dotType,
        message,
    }

    fetch(SEND_REPORT_URL, { 
        body: JSON.stringify(data),
        method: 'post', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse && 
                response.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(sendReportSuccess());
            } else {
                dispatch(sendReportFailure());
            }
        })
        .catch(error => {
            dispatch(sendReportFailure());
        });
}
