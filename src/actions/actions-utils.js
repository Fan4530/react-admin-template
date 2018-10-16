import {encode} from 'base64-arraybuffer';
import 'whatwg-fetch';

import {LOAD_HOME_SUCCESS_INTERVAL,} from '../intervals.js';

export const getBase64 = url => {
    return fetch(url, {
        //credentials: 'include',
        method: 'get'
    })
        .then(response => response.arrayBuffer())
        //.then(buffer => btoa(String.fromCharCode(...new Uint8Array(buffer))))
        .then(buffer => encode(buffer))
        .catch(error => {
            ///	console.log(`getBase64 ${url}:`, error);
        });
};

export const routeLoad = (interval, lastUpdateTimeKey, loadFromServer) => (dispatch, getState) => {
    let now = Date.now();
    let lastUpdateTime = localStorage.getItem(lastUpdateTimeKey);
    if (!lastUpdateTime || now - lastUpdateTime >= interval) {
        ///console.warn('LOAD HOME DATA ALL NOW');
        dispatch(loadFromServer());
    } else {
        //console.warn('LOAD HOME DATA ALL LATER');
        let remainingTime = LOAD_HOME_SUCCESS_INTERVAL - (now - lastUpdateTime);
        setTimeout(() => {
            dispatch(loadFromServer());
        }, remainingTime);
    }
};

export const findDot = id => (dispatch, getState) => {
    let state = getState();
    let dot = state.dotStorage[id];
    return dot;
};
