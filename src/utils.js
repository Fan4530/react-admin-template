import React from 'react';
import { PHOTO_FOLDER } from './constants';
import { COMPRESS_FOTO_SERVICE } from './urls';
import { HOUR, DAY, MINUTE } from './intervals';
import { STORE, HOME_LASTUPDATETIME, AUTH_TOKEN } from './constants';
import { AuthError, IncorrectJsonError, SomethingWrongError } from './errors.js';

export class FormatString extends React.Component {
    render() {
        //console.log(this.props.str.indexOf('%'));
        if (this.props.str.indexOf('%')) {
            let parts = this.props.str.split('%');

            return (

                <div>{this.props.str.replace(/%/g, "")}</div>
                // <div>{parts.map((part, index) => {
                //     if (index % 2 !== 0) {
                //        /// console.log(parts[index - 1], part, parts[index + 1]);
                //         return (
                //             <span key={index}>{parts[index - 1]}
                //                 <span className={this.props.className}>{part}</span>
                //                 {parts[index + 1]}
                //             </span>
                //         );
                //     }
                // })}</div>
            )
        } else {
           /// console.log('else');
           /// console.log(this.props.str);
            return (
                <span>{this.props.str}</span>
            );
        }
    }
}

export class GetFirstCapitalLetter extends React.Component {
    render() {
        if (this.props.name) {
            let letter = this.props.name[0].toUpperCase();
            return (
                <span className={this.props.className}>{letter}</span>
            );
        } else {
            return (
                <span className={this.props.className}>U</span>
            );
        }
    }
}

String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? `${this.substr(0, n - 1)}...` : this;
    };

export function resizePhoto(sourceImg, width, height = '1000') {
    if (sourceImg) {
        let filename = sourceImg.split(PHOTO_FOLDER)[1];
        return COMPRESS_FOTO_SERVICE.replace('%width%', width).replace('%height%', height) + filename;
    } else {
        return sourceImg;
    }
}

export function validation(target, targetType) {
    let value = document.getElementById(target.id).value;

    if (targetType) {
        switch (targetType) {
            case 'textarea':
                if (value === '') {
                    return false;
                } else {
                    return true;
                }
        }
    }

    switch (target.type) {
        case 'text':
            if (value === '') {
                return false;
            } else {
                return true;
            }
        case 'email':
            let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value === '' || !emailRegexp.test(value)) {
                return false;
            } else {
                return true;
            }
            break;
        case 'password':
            if (value === '') {
                return false;
            } else {
                return true;
            }
    }
}

// obj - source object,
// num - number of key which you want to allocate in the new object
// start - index of the key which you want to start from

export function sliceObject(obj, num, start = 0) {
    let newObject = {};

    Object.keys(obj).forEach((key, index) => {
        if ((index >= start) && (index < start + num)) {
            newObject[key] = obj[key];
        }
    });

    return newObject;
}

export function getDomain(url) {
    if (url) {
        let match = /(?:https?:\/\/)?(?:\w+:\/)?[^:?#\/\s]*?([^.\s]+\.(?:[a-z]{2,}|co\.uk|org\.uk|ac\.uk|org\.au|com\.au))(?:[:?#\/]|$)/gi.exec(url);

        return match ? match[1].toLowerCase() : null;
    } else
        return null;
}

export function getDomainLong(url) {
    let domain;
    if (url){
        if (url.indexOf("://") > -1) {
            if (url.indexOf("click.linksynergy.com/deeplink?id=qokTrc2bUOI&") > -1) {
                domain = url.split('/')[5];
            } else {
                domain = url.split('/')[2];
            }
        }
        else {
            domain = url.split('/')[0];
        }
        if (url.indexOf("click.linksynergy.com/link?id=4slmEvXc5cI") > -1) {
            domain = url.split('url=')[1];
            if (url.indexOf("%3A%2F%2F") > -1) {
                domain = domain.split('%2F')[2];
            } else {
                domain = domain.split('%2F')[0];
            }
        }
    }
    if (domain) {
        let domainNew = domain.split(':')[0].toLowerCase();
        if (domainNew.split('.').length > 2) {
            return domainNew.slice(domainNew.indexOf('.') + 1)
        } else {
            return domainNew;
        }
    } else {
        return domain;
    }
}

/**
 * @getBrowser
 * @returns Object: {name, version}
 */
export function getBrowser(){
    let userAgent = navigator.userAgent,
        browser = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
        tem;
    // IE
    if (/trident/i.test(browser[1])){
        tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return { name : 'IE ', version : tem[1] || '' };
    }
    // Opera, Edge, Yandex
    if (browser[1] === 'Chrome'){
        tem = userAgent.match(/\b(OPR|Edge|YaBrowser)\/(\d+)/);
        if (tem !== null) {
            tem[1] = tem[1].replace('OPR', 'Opera');
            return { name : tem[1], version : tem[2] || '' };
        }
    }
    // Chrome, Safari, Firefox
    browser = browser[2] ? [browser[1], browser[2]] : [navigator.appName, navigator.appVersion, '-?'];
    tem = userAgent.match(/version\/(\d+)/i);
    if (tem !== null) {
        browser.splice(1, 1, tem[1]);
    }
    return { name : browser[0], version : browser[1] || '' };
}

export function calculatePassedTime(createdDate) {
    let passedMillisec = new Date().getTime() - createdDate;
    let passedDays = parseInt(passedMillisec / DAY);
    let passedHours = parseInt(passedMillisec / HOUR);
    let passedMinutes = parseInt(passedMillisec / MINUTE);

    if (passedMinutes < 1) {
        return 'now';
    } else {
        if (passedHours < 1) {
            if (passedMinutes === 1) {
                return 'a minute ago';
            } else {
                return `${passedMinutes} minutes ago`;
            }
        } else {
            if (passedDays < 1) {
                if (passedHours === 1) {
                    return 'an hour ago';
                } else {
                    return `${passedHours} hours ago`;
                }
            } else {
                if (passedDays === 1) {
                    return 'a day ago';
                } else {
                    return `${passedDays} days ago`;
                }
            }
        }
    }
}

export function getDefaultTabName(type) {
    if (type.toLowerCase() === 'curator') return 'obsessed';
    if (type.toLowerCase() === 'retailer') return 'trending';
    return 'dots';
}

export let getDataFromUrl = () => {
    let urlGetSubstr = window.location.search.substring(1);
    let getParams = urlGetSubstr.split('&');
    let dotData = {};
    getParams.forEach((element)=>{
        dotData[element.split('=')[0]] = element.substring(element.indexOf('=')+1)
    });
    return dotData;
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
    const { state, id, volume } = data;

    const profile = state.pages[id];
    if (!profile) return 0;
    
    const volumeData = profile[volume];
    if (!volumeData) return 0;

    return volumeData.nextPage || 0;
};

export const flushSearchRequest = searchBar => {
    return searchBar.value
        .replace(/\s{2,}/g, ' ')
        .replace(/(^\s+)|(\s+)$/g, '')
        .toLowerCase();
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