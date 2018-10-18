import 'whatwg-fetch';
import {LOAD_ALL_COMMISSIONS_URL} from "../urls";

export const LOAD_ALL_COMMISSIONS_REQUEST = 'LOAD_ALL_COMMISSIONS_REQUEST';
export const LOAD_ALL_COMMISSIONS_SUCCESS = 'LOAD_ALL_COMMISSIONS_SUCCESS';
export const LOAD_ALL_COMMISSIONS_FAILURE = 'LOAD_ALL_COMMISSIONS_FAILURE';

export const loadAllCommissionsRequest = payload => ({
    type: LOAD_ALL_COMMISSIONS_REQUEST,
    payload
});

export const loadAllCommissionsSuccess = payload => ({
    type: LOAD_ALL_COMMISSIONS_SUCCESS,
    payload
});

export const loadAllCommissionsFailure = payload => ({
    type: LOAD_ALL_COMMISSIONS_FAILURE,
    payload
});


export const loadAllCommissions = () => (dispatch, getState) => {
    dispatch(loadAllCommissionsRequest());

    // let pageNumber = getState().allDots.nextPageNumber;
    let pageNumber = 1// TODO
    let body = JSON.stringify({
        pageNumber,
        pageSize: 30 // ALL_DOTS_PAGE_SIZE = 30
        // TODO
    });


    fetch(LOAD_ALL_COMMISSIONS_URL, {
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
                let payload = { //  define yourself
                    data: {
                        allCommissions: json.ServiceResponse.responseData,
                        // relatedUsers: json.ServiceResponse.responseData[1].relatedUsers.responseData[0]
                    },
                    nextPageNumber: pageNumber
                };

                dispatch(loadAllCommissionsSuccess(payload));

            } else {
                dispatch(loadAllCommissionsFailure());
            }
        })
        .catch(error => {
            dispatch(loadAllCommissionsFailure());
        });
};

