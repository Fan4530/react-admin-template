import { ADD_COMMENT_TO_DOT_URL } from '../../../urls.js';
import { loadDot } from '../../actions-dot.js';

export const ADD_COMMENT_TO_DOT_REQUEST = 'ADD_COMMENT_TO_DOT_REQUEST';
export const ADD_COMMENT_TO_DOT_SUCCESS = 'ADD_COMMENT_TO_DOT_SUCCESS';
export const ADD_COMMENT_TO_DOT_FAILURE = 'ADD_COMMENT_TO_DOT_FAILURE';

export const addCommentToDotRequest = payload => ({
    type: ADD_COMMENT_TO_DOT_REQUEST,
    payload
});

export const addCommentToDotSuccess = payload => ({
    type: ADD_COMMENT_TO_DOT_SUCCESS,
    payload
});

export const addCommentToDotFailure = payload => ({
    type: ADD_COMMENT_TO_DOT_FAILURE,
    payload
});

export const addCommentToDot = data => dispatch => {
    dispatch(addCommentToDotRequest({ ...data }));
    const {dot: { id, type }, message } = data;

    const url = ADD_COMMENT_TO_DOT_URL;
    const body = JSON.stringify({
        dotRef: {
            id,
            type
        },
        message
    });
    console.log('add dot action', url, body);

    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
        .then(
            response => {
                console.log('response for add comment API', response);
                return response.json();
            },
            error => {
                console.log('add comment error', error);
                dispatch(addCommentToDotFailure({ ...data }));
            }
        )
        .then(response => {
            if (
                response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS'
            ) {
                const payload = {
                    dot: {
                        id,
                        type
                    },
                    data: response.ServiceResponse.responseData[0]
                };
                dispatch(addCommentToDotSuccess(payload));
                dispatch(loadDot(id, type));
            } else {
                dispatch(addCommentToDotFailure({ ...data }));
            }
        })
        .catch(error => {
            console.log(error);
        });

};