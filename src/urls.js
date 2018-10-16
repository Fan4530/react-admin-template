export const STUFFDOT_WEBSITE = 'http://localhost:8080';
export const API_PREFIX = '/api';

export const DIRECT_IP = '35.185.6.32';

export const DOMAIN = STUFFDOT_WEBSITE;

export const PRIVACY = `${DOMAIN}/web/privacy.html`;
export const TERMS = `${DOMAIN}/web/terms.html`;

export const LOAD_HOME_URL = `${DOMAIN}${API_PREFIX}/home/data/all`;
export const LOAD_TOP_BANNERS_URL = `${DOMAIN}${API_PREFIX}/topbanner/find`;
export const LOAD_TOP_SHOPS_URL = `${DOMAIN}${API_PREFIX}/topshop/find`;
export const EDIT_DOT_URL = dotType => (
    `${DOMAIN}${API_PREFIX}/${dotType.toLowerCase()}/save/`
);
export const LIKE_DOT_URL = `${DOMAIN}${API_PREFIX}/useractivity/like`;
export const UNLIKE_DOT_URL = `${DOMAIN}${API_PREFIX}/useractivity/unlike`;
export const LIKE_PROFILE_URL = `${DOMAIN}${API_PREFIX}/useractivity/like`;
export const UNLIKE_PROFILE_URL = `${DOMAIN}${API_PREFIX}/useractivity/unlike`;
export const REDOT_URL = `${DOMAIN}${API_PREFIX}/useractivity/re-dot`;
export const LOAD_RELEVANT_DOTS_URL = `${DOMAIN}${API_PREFIX}/suggestion/find/dots`;
export const SEND_EMAIL_URL = `${DOMAIN}${API_PREFIX}/message/email`;
export const SEND_REPORT_URL = `${DOMAIN}${API_PREFIX}/message/abuse-report`;
export const LOAD_DOT_URL = `${DOMAIN}${API_PREFIX}/ref/resolve`;
export const DELETE_DOT_URL = `${DOMAIN}${API_PREFIX}/useractivity/delete-dot`;
export const SAVE_DOT_URL = `${DOMAIN}${API_PREFIX}/socialdot/save`;
export const LOAD_PROFILE_URL = `${DOMAIN}${API_PREFIX}/userprofile/find`;
export const SAVE_PROFILE_URL = `${DOMAIN}${API_PREFIX}/userprofile/save`;
export const FOLLOW_USER_URL = `${DOMAIN}${API_PREFIX}/useractivity/follow`;
export const UNFOLLOW_USER_URL = `${DOMAIN}${API_PREFIX}/useractivity/unfollow`;
export const LOAD_PROFILE_BY_ID_URL = username => (
`${DOMAIN}${API_PREFIX}/profile/view/UserProfile/${username}/`
);
export const LOAD_FOLLOWING_USER_PROFILES_URL = id => (
`${DOMAIN}${API_PREFIX}/userprofile/${id}/followings/`
);
export const LOAD_FOLLOWERS_USER_PROFILES_URL = id => (
    `${DOMAIN}${API_PREFIX}/userprofile/${id}/followers/`
);
export const LOAD_FAVORITE_RETAILERS_URL = id => (
`${DOMAIN}${API_PREFIX}/userprofile/${id}/favoriteRetailers/`
);
export const LOAD_LIKED_DOTS_URL = (id, pageNumber = 0, pageSize = 30) => (
`${DOMAIN}${API_PREFIX}/userprofile/${id}/likes/${pageNumber}/${pageSize}`
);
export const LOAD_DOT_COLLECTIONS_URL = id => (
`${DOMAIN}${API_PREFIX}/userprofile/${id}/dotCollections/`
);
export const LOAD_RELATED_USERS_FOR_PROFILE_URL = `${DOMAIN}${API_PREFIX}/ref/resolve`;
export const LOAD_NOTIFICATIONS_URL = `${DOMAIN}${API_PREFIX}/notification/load`;
export const LOAD_NOTIFICATIONS_READ = `${DOMAIN}${API_PREFIX}/notification/setRead`;
export const LOAD_FEATURED_DOTS_URL = `${DOMAIN}${API_PREFIX}/userprofile/dots/featureDots`;
export const LOAD_FOLLOWING_DOTS_URL = `${DOMAIN}${API_PREFIX}/userprofile/dots/followingDots`;
export const LOAD_PRICE_TRACKING_DOTS_URL = `${DOMAIN}${API_PREFIX}/userprofile/dots/priceTracking`;
export const LOAD_ALL_DOTS_URL = `${DOMAIN}${API_PREFIX}/home/data/socialdots`;
export const REGISTER_USER_URL = `${DOMAIN}${API_PREFIX}/auth/register`;  // is not used
export const SEND_INVITE_URL = `  ${DOMAIN}${API_PREFIX}/auth/sendInvite/`;
export const CASH_OUT_URL = `  ${DOMAIN}${API_PREFIX}/usercashout/save/`;

export const COMPRESS_FOTO_SERVICE = `${STUFFDOT_WEBSITE}/image-service/size/%width%/%height%/bucket/stuffdot-dev/file`;

export const SHARE_URL = `${STUFFDOT_WEBSITE}/api/share/`;

export const AUTH_PAGE = `${DOMAIN}/auth`;

export const LOAD_DOT_CATEGORIES_URL = `${DOMAIN}${API_PREFIX}/dotcategory/find`;

export const SAVE_COLLECTION_URL = `${DOMAIN}${API_PREFIX}/collection/save`;
export const DELETE_COLLECTION_URL = `${DOMAIN}${API_PREFIX}/collection/delete`;
export const ADD_DOT_TO_COLLECTION_URL = `${DOMAIN}${API_PREFIX}/collection/add-dot`;
export const DELETE_DOT_FROM_COLLECTION_URL = `${DOMAIN}${API_PREFIX}/collection/delete-dot`;

export const LOAD_DEALSHOP_URL = `${DOMAIN}${API_PREFIX}/dealshop/find`;
export const INTERSTITIAL_CLICK_SAVE_URL = `${DOMAIN}${API_PREFIX}/userclick/save`;
export const LOGIN_USER_URL = `${DOMAIN}${API_PREFIX}/login`;
export const FACEBOOK_LOGIN_USER_URL = `${DOMAIN}${API_PREFIX}/login/facebook`;
export const LOGOUT_USER_URL = `${DOMAIN}${API_PREFIX}/logout`;
export const RESET_PASSWORD_URL = `${DOMAIN}${API_PREFIX}/auth/reset`;
export const CONFIRM_PASSWORD_URL = `${DOMAIN}${API_PREFIX}/auth/confirmreset`;
export const CONFIRM_EMAIL_URL = `${DOMAIN}${API_PREFIX}/auth/confirm`;
export const VERIFY_EMAIL_URL = `${DOMAIN}${API_PREFIX}/resendconfirm`;
export const SIGN_UP_URL = `${DOMAIN}${API_PREFIX}/auth/register`;
export const SEARCH_URL = (forTab, substring, categories, pageSize, pageNumber) => (
    `${DOMAIN}/search/${forTab}?text=${substring}&category=${categories.join(',')}&pageNumber=${pageNumber}&pageSize=${pageSize}`
);
export const UPDATE_EMAIL_URL = `${DOMAIN}${API_PREFIX}/email/update`;
export const UPDATE_PASSWORD_URL = `${DOMAIN}${API_PREFIX}/password/update`;
export const ADD_COMMENT_TO_DOT_URL = `${DOMAIN}${API_PREFIX}/useractivity/comment`;
export const LOAD_LAST_THREE_COLLECTOINS_URL = `${DOMAIN}${API_PREFIX}/userprofile/lastThreeCollections`;
export const LOAD_DOTS_PAGE_FOR_PROFILE_URL = `${DOMAIN}${API_PREFIX}/socialdot/find`;
export const LOAD_COLLECTIONS_PAGE_FOR_PROFILE_URL = `${DOMAIN}${API_PREFIX}/collection/find`;
export const LOAD_COLLECTIONS_BY_IDS = `${DOMAIN}${API_PREFIX}/collection/find`;
export const LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_URL = `${DOMAIN}${API_PREFIX}/collection/find`;
export const LOAD_DOTS_PAGE_FOR_COLLECTION_URL = (id, pageNumber, pageSize) => (
    `${DOMAIN}${API_PREFIX}/collection/dots/${id}/${pageNumber}/${pageSize}`
);
export const CHECK_AUTH_URL = `${DOMAIN}${API_PREFIX}/auth/checkAuth`;
export const LOAD_TRENDING_PAGE_FOR_MAINPAGE_URL = `${DOMAIN}${API_PREFIX}/userprofile/dots/trendingDots`;
export const LOAD_TRENDING_PAGE_FOR_PROFILE_URL = `${DOMAIN}${API_PREFIX}/userprofile/dots/trendingDots`;
export const LOAD_COUPONS_PAGE_FOR_PROFILE_URL = `${DOMAIN}${API_PREFIX}/coupondot/find`;
export const LOAD_DEALS_PAGE_FOR_PROFILE_URL = `${DOMAIN}${API_PREFIX}/dealdot/find`;
export const LOAD_DEAL_DOTS_PAGE_FOR_MAINPAGE_URL = `${DOMAIN}${API_PREFIX}/dealdot/find`;
export const SAVE_AVATAR_URL = `${DOMAIN}${API_PREFIX}/userprofile/avatar`;
export const SAVE_BACKGROUND_URL = `${DOMAIN}${API_PREFIX}/userprofile/backgroundImage`;
export const LOAD_DEFAULT_RETAILER_AND_CURATOR_URL = `${DOMAIN}${API_PREFIX}/home/data/defaults`;

export const SAVE_NOTIFICATION_URL = `${DOMAIN}${API_PREFIX}/notification/save`;

