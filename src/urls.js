// find your api at https://stuffdot.com/api/swagger-ui.html#/user-cashout-controller

const STUFFDOT_WEBSITE = '35.185.6.32';
const API_PREFIX = '/api';

export const DOMAIN = '';


export const LOAD_ALL_PROFILES_URL = `${DOMAIN}${API_PREFIX}/userprofile/all`;
export const LOAD_ALL_CASHOURT_URL = `${DOMAIN}${API_PREFIX}/usercashout/all`;
export const CHECK_AUTH_URL = `${DOMAIN}${API_PREFIX}/auth/checkAuth`;
export const LOGIN_USER_URL = `${DOMAIN}${API_PREFIX}/login`;
export const LOGOUT_USER_URL = `${DOMAIN}${API_PREFIX}/logout`;
export const SIGN_UP_URL = `${DOMAIN}${API_PREFIX}/auth/register`;
export const COMPRESS_FOTO_SERVICE = `${STUFFDOT_WEBSITE}/image-service/size/%width%/%height%/bucket/stuffdot-dev/file`;
