import 'whatwg-fetch';
import {LOAD_ALL_CASHOURT_URL} from "../utils/urls";

export const LOAD_ALL_CASHOUTS_REQUEST = 'LOAD_ALL_CASHOUTS_REQUEST';
export const LOAD_ALL_CASHOUTS_SUCCESS = 'LOAD_ALL_CASHOUTS_SUCCESS';
export const LOAD_ALL_CASHOUTS_FAILURE = 'LOAD_ALL_CASHOUTS_FAILURE';

export const loadAllCashoutsRequest = payload => ({
    type: LOAD_ALL_CASHOUTS_REQUEST,
    payload
});

export const loadAllCashoutsSuccess = payload => ({
    type: LOAD_ALL_CASHOUTS_SUCCESS,
    payload
});

export const loadAllCashoutsFailure = payload => ({
    type: LOAD_ALL_CASHOUTS_FAILURE,
    payload
});


export const loadAllCashouts = () => (dispatch, getState) => {
    dispatch(loadAllCashoutsRequest());

    // let pageNumber = getState().allDots.nextPageNumber;
    let pageNumber = 1// TODO
    let body = JSON.stringify({
        pageNumber,
        pageSize: 20 // ALL_DOTS_PAGE_SIZE = 30
        // TODO
    });


    fetch(LOAD_ALL_CASHOURT_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then(response => response.json())
        .then(json => {
            // console.log("what is the json")
            // console.log(json)
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = { //  define yourself, this will be used in reducer
                    data: {
                        cashouts: json.ServiceResponse.responseData,
                        // relatedUsers: json.ServiceResponse.responseData[1].relatedUsers.responseData[0]
                    },
                    nextPageNumber: pageNumber
                };
                // console.log("show me the playload")
                // console.log(payload)
                dispatch(loadAllCashoutsSuccess(payload));
            } else {
                dispatch(loadAllCashoutsFailure());
            }
        })
        .catch(error => {
            // console.log(error);
            // console.log("fail catch error")
            dispatch(loadAllCashoutsFailure());
        });
};


