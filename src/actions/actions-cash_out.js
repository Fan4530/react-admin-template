// Modules
import { CASH_OUT_URL } from '../urls';
import { loadNotificationOnce } from "./actions-notification";
import { loadProfile } from './actions-profile.js';
import 'whatwg-fetch';

export const CASH_OUT_REQUEST = 'CASH_OUT_REQUEST';
export const CASH_OUT_SUCCESS = 'CASH_OUT_SUCCESS';
export const CASH_OUT_FAILURE = 'CASH_OUT_FAILURE';

export const cashOutRequest = payload => ({
    type: CASH_OUT_REQUEST,
    payload
});

export const cashOutSuccess = payload => ({
    type: CASH_OUT_SUCCESS,
    payload
});

export const cashOutFailure = payload => ({
    type: CASH_OUT_FAILURE,
    payload
});

export const cashOut = (amount, paymentType) => dispatch => {
    let payload = { amount, paymentType };
    dispatch(cashOutRequest(payload));

    let body = JSON.stringify(
        {
            amount,
            paymentType: paymentType.toUpperCase()
        }
    );
    fetch (CASH_OUT_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(
            response => response.json(),
            error => {
                dispatch(cashOutFailure(payload));
                console.log(error);
            }
        )
        .then(
            response => {
                if (response.ServiceResponse &&
                    response.ServiceResponse.responseCode === 'SUCCESS') {
                    dispatch(cashOutSuccess(payload));
                    dispatch(loadNotificationOnce());
                    dispatch(loadProfile());
                } else {
                    dispatch(cashOutFailure(payload));
                }
            }
        )
        .catch(error => {
            console.log(error);
        });
};
