export const STORAGEPREFIX = 'StuffDOT_';
export const HOME_LASTUPDATETIME = STORAGEPREFIX + 'homeLastUpdateTime';
export const STORE = STORAGEPREFIX + 'store';

export const FOR_LOCALHOST = false;

export const DEFAULT_PAGE_SIZE = 30;
export const FEATURED_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const FOLLOWING_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PRICE_TRACKING_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const ALL_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const ALL_DOTS_FOR_MAINPAGE_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const SEARCH_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PROFILE_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PROFILE_COLLECTIONS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PROFILE_LIKES_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const MAINPAGE_TRENDING_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const MAINPAGE_FEATURED_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PROFILE_TRENDING_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PROFILE_COUPONS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const MAINPAGE_DEAL_DOTS_PAGE_SIZE = DEFAULT_PAGE_SIZE;
export const PROFILE_DEALS_PAGE_SIZE = DEFAULT_PAGE_SIZE;

export const PHOTO_FOLDER = 'image-store';


// USER TYPES
export const CUSTOMER = 'CUSTOMER';
export const INFLUENCER = 'INFLUENCER';
export const RETAILER = 'RETAILER';
export const CURATOR = 'CURATOR';

//DOT TYPES
export const COUPONDOT = 'CouponDot';
export const DEALDOT = 'DealDot';
export const SOCIALDOT = 'SocialDot';


export const SHARING_TEXT = "Take a look at Stuffdot - you can discover cool trendy stuff you are obsessed with. Share it with friends, earn cash back and get deals from over 20,000 online retailers. Plus, I'm already with Stuffdot, so if you follow this link you can receive $5 too!";
export const SHARING_TITLE = 'StuffDOT: Spot it. Dot it. Got it.';

export const TOKEN_NAME = 'sd_cookie';
export const AUTH_TOKEN = 'JSESSIONID';

// ERRORS

export const WRONG_EMAIL = 'Invalid e-mail address';
export const AN_ERROR = 'An error occurred, please try again later';
export const REPORT_SUCCESS = 'Your report has been successfully sent';
export const EMAIL_SUCCESS = 'Your e-mail has been successfully sent';


export const DEFAULT_AVATAR_SIZE = 38;


export const NO_CONTENT_TEXT = 'Something awesome is coming soon...';

// STUFFDOT SOCIALS
export const STUFFDOT_FACEBOOK = 'http://www.facebook.com/stuffdot';
export const STUFFDOT_INSTAGRAM = 'https://www.instagram.com/stuffdot';
export const STUFFDOT_TWITTER = 'http://www.twitter.com/stuffdot';
export const STUFFDOT_SNAPCHAT = 'https://www.snapchat.com/add/stuffdot';
export const STUFFDOT_EMAIL = 'info@stuffdot.com';


// Pagination
export const SEARCH_PAGINATION_ID = 'search';
export const SEARCH_DROPDOWN_PAGINATION_ID = 'search-dropdown';
export const MAINPAGE_PAGINATION_ID = 'main-page';

// Alerts
export const SAVE_PROFILE_SUCCESS_ALERT_TEXT = 'Profile changes saved';
export const REDOT_SUCCESS_ALERT_TEXT = ({ collectionName }) => `Dotted to %${collectionName}%`;
export const SAVE_DOT_SUCCESS_ALERT_TEXT = 'Successfully dotted!';
export const SOMETHING_WRONG_ALERT_TEXT = 'An error occurred please try again later.';
export const UPDATE_PASSWORD_SUCCESS_ALERT_TEXT = 'Password updated.';
export const UPDATE_EMAIL_SUCCESS_ALERT_TEXT = 'Email updated.';
export const VERIFY_EMAIL_SUCCESS_ALERT_TEXT = 'Email verification sent.';

// Download Extension Urls
export const DOWNLOAD_EXTENSION_CHROME = 'https://chrome.google.com/webstore/detail/stuffdot/dklbidkndcanolemabbfikagbkgomobi';

// Sort
export const BY_DEFAULT_SORT_BY = 'createdDate';
export const SORT_PROFILE_DOTS_BY = BY_DEFAULT_SORT_BY;
export const SORT_PROFILE_LIKES_BY = BY_DEFAULT_SORT_BY;
export const SORT_PROFILE_COLLECTIONS_BY = BY_DEFAULT_SORT_BY;
export const SORT_MAINPAGE_FEATURED_DOTS_BY = BY_DEFAULT_SORT_BY;
export const SORT_MAINPAGE_TRENDING_DOTS_BY = BY_DEFAULT_SORT_BY;
export const SORT_MAINPAGE_DEAL_DOTS_BY = BY_DEFAULT_SORT_BY;
export const SORT_COLLECTION_DOTS_BY = BY_DEFAULT_SORT_BY;


export const DOMAIN = 'https://stuffdot.com';

export const DEFAULT_IMAGE_URL = DOMAIN + '/image-store/share/emptyImage.png';
export const DEFAULT_AVATAR_IMAGE_URL = DOMAIN + '/image-store/share/emptyAvatarImage.png';

export const STUFFDOT_LOGO = DOMAIN + '/image-store/share/Dot_160x160.png';

