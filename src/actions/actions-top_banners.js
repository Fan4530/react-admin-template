import { LOAD_TOP_BANNERS_URL } from '../urls.js';
import { getBase64 } from './actions-utils.js';
import 'whatwg-fetch';

export const LOAD_TOP_BANNERS_REQUEST = 'LOAD_TOP_BANNERS_REQUEST';
export const LOAD_TOP_BANNERS_SUCCESS = 'LOAD_TOP_BANNERS_SUCCESS';
export const LOAD_TOP_BANNERS_FAILURE = 'LOAD_TOP_BANNERS_FAILURE';

export const loadTopBannersRequest = payload => ({
    type: LOAD_TOP_BANNERS_REQUEST,
    payload
})

export const loadTopBannersSuccess = payload => ({
    type: LOAD_TOP_BANNERS_SUCCESS,
    payload
})

export const loadTopBannersFailure = payload => ({
    type: LOAD_TOP_BANNERS_FAILURE,
    payload
})

// Load top banners
export const loadTopBanners = () => dispatch => {
    dispatch(loadTopBannersRequest());

    fetch(LOAD_TOP_BANNERS_URL, { 
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
                dispatch(loadTopBannersSuccess(payload));
            } else {
                dispatch(loadTopBannersFailure());
            }
        })
        .catch(error => {
            dispatch(loadTopBannersFailure());
        });
}


export const fillTopBannersWithBase64 = topBanners => {
    let promises = [];

    for (let banner of topBanners) {
        promises.push(
            getBase64(banner.imageUrl).
            then((base64) => {
                banner.imageBase64 = base64;
            })
        );
    }

    return Promise.all(promises)
        .then(() => topBanners);
}
