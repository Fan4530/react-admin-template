import { LOAD_TOP_SHOPS_URL } from '../urls.js';
import { getBase64 } from './actions-utils.js';
import 'whatwg-fetch';

export const LOAD_TOP_SHOPS_REQUEST = 'LOAD_TOP_SHOPS_REQUEST';
export const LOAD_TOP_SHOPS_SUCCESS = 'LOAD_TOP_SHOPS_SUCCESS';
export const LOAD_TOP_SHOPS_FAILURE = 'LOAD_TOP_SHOPS_FAILURE';

export const loadTopShopsRequest = payload => ({
    type: LOAD_TOP_SHOPS_REQUEST,
    payload
})

export const loadTopShopsSuccess = payload => ({
    type: LOAD_TOP_SHOPS_SUCCESS,
    payload
})

export const loadTopShopsFailure = payload => ({
    type: LOAD_TOP_SHOPS_FAILURE,
    payload
})

// Load top shops
export const loadTopShops = () => dispatch => {
    dispatch(loadTopShopsRequest());

    fetch(LOAD_TOP_SHOPS_URL, { 
        method: 'post', 
        body: '{}',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.ServiceResponse && 
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = response.ServiceResponse.responseData[0];
                dispatch(loadTopShopsSuccess(payload));
            } else {
                dispatch(loadTopShopsFailure());
            }
        })
        .catch(error => {
            dispatch(loadTopShopsFailure());
        });
}


export const fillTopShopsWithBase64 = topShops => {
    let promises = [];

    for (let shop of topShops) {
        promises.push(
            getBase64(shop.shopImage).then((base64) => {
                shop.shopImageBase64 = base64;
            }),
            getBase64(shop.shopGrayImage).then((base64) => {
                shop.shopGrayImageBase64 = base64;
            })
        );
    }

    return Promise.all(promises)
        .then(() => topShops);
}

export const sortTopShops = topShops => topShops.sort((a, b) => a.topPosition - b.topPosition);
