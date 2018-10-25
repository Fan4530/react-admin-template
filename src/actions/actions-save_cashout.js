import 'whatwg-fetch';
import {USERCASHOUT_SAVE_BY_ID} from "../utils/urls";

export const SAVE_CASHOUT_BY_ID_REQUEST = 'SAVE_CASHOUT_BY_ID_REQUEST';
export const SAVE_CASHOUT_BY_ID_SUCCESS = 'SAVE_CASHOUT_BY_ID_SUCCESS';
export const SAVE_CASHOUT_BY_ID_FAILURE = 'SAVE_CASHOUT_BY_ID_FAILURE';

export const saveCashoutByIdRequest = payload => ({
    type: SAVE_CASHOUT_BY_ID_REQUEST,
    payload
});

export const saveCashoutByIdSuccess = payload => ({
    type: SAVE_CASHOUT_BY_ID_SUCCESS,
    payload
});

export const saveCashoutByIdFailure = payload => ({
    type: SAVE_CASHOUT_BY_ID_FAILURE,
    payload
});


export const saveCashoutById = (request) => (dispatch) => {
    dispatch(saveCashoutByIdRequest());

    let body = JSON.stringify({
        id: request.id,
        status: request.status,
    });


    fetch(USERCASHOUT_SAVE_BY_ID, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then(response => response.json())
        .then(json => {
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                dispatch(saveCashoutByIdSuccess());

            } else {
                dispatch(saveCashoutByIdFailure());
            }
        })
        .catch(error => {
            dispatch(saveCashoutByIdFailure());
        });
};
