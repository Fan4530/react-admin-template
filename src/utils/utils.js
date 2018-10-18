import React from 'react';
import {AuthError, IncorrectJsonError, SomethingWrongError} from './errors.js';

String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? `${this.substr(0, n - 1)}...` : this;
    };


export const getCookie = name => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const eraseCookie = name => {
    document.cookie = name + '=; Max-Age=-999999999';
};
export const clearCache = () => {
    // window.localStorage.removeItem(STORE);
    // window.localStorage.removeItem(HOME_LASTUPDATETIME);
    // window.localStorage.removeItem(AUTH_TOKEN);
};

export const handleResponse = response => {
    switch (true) {
        case response.ok:
            return response;
        case response.status === 401:
            return Promise.reject(new AuthError());
        default:
            return Promise.reject(new SomethingWrongError());
    }
};

export const handleJsonResponse = json => {
    if (
        json &&
        json.ServiceResponse &&
        json.ServiceResponse.responseCode === 'SUCCESS'
    ) {
        return json.ServiceResponse.responseData;
    } else {
        return Promise.reject(new IncorrectJsonError());
    }
};

export const checkResponse = response => {
    ///console.log('checkResponse', response);
    return response.status === 200;
};

export const checkResponseJson = response => {
    if (
        response &&
        response.ServiceResponse &&
        response.ServiceResponse.responseCode === 'SUCCESS'
    ) {
        return true;
    }

    return false;
};

export const getResponseData = response => {
    return response.ServiceResponse.responseData;
};

export const getNextPage = data => {
    const {state, id, volume} = data;

    const profile = state.pages[id];
    if (!profile) return 0;

    const volumeData = profile[volume];
    if (!volumeData) return 0;

    return volumeData.nextPage || 0;
};


export const formatNumber = (num, digit) => {
    if (num > 999999) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num > 999) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num;
};
