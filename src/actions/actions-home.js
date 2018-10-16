// Modules
import 'whatwg-fetch';
import { LOAD_HOME_URL } from '../urls.js';
import { fillTopShopsWithBase64, sortTopShops } from './actions-top_shops.js';
import { loadPartialProfiles } from './profiles/loadPartialProfiles.js';
import { handleResponse, handleJsonResponse } from '../utils.js';
import { somethingWrongHappened } from './auth/somethingWrongHappened.js';
import {
	AuthError, 
	IncorrectJsonError,
	SomethingWrongError,
} from '../errors.js';
import { signOut } from './auth/signOut.js';

export const LOAD_HOME_REQUEST = 'LOAD_HOME_REQUEST';
export const LOAD_HOME_SUCCESS = 'LOAD_HOME_SUCCESS';
export const LOAD_HOME_FAILURE = 'LOAD_HOME_FAILURE';

export const loadHomeRequest = payload => ({
	type: LOAD_HOME_REQUEST,
	payload
});

export const loadHomeSuccess = payload => ({
	type: LOAD_HOME_SUCCESS,
	payload
});

export const loadHomeFailure = payload => ({
	type: LOAD_HOME_FAILURE,
	payload
});

import {
	loadProfileRequest,
	loadProfileSuccess,
	loadProfileFailure
} from './actions-profile.js';
import {
	loadTopBannersRequest,
	loadTopBannersSuccess,
	loadTopBannersFailure
} from './actions-top_banners.js';
import {
	loadTopShopsRequest,
	loadTopShopsSuccess,
	loadTopShopsFailure
} from './actions-top_shops.js';
import {
	loadDealShopsRequest,
	loadDealShopsSuccess,
	loadDealShopsFailure
} from './actions-deal_shops.js';
import {
	loadStyleShopsRequest,
	loadStyleShopsSuccess,
	loadStyleShopsFailure
} from './actions-style_shops.js';
import {
	loadFeaturedDotsRequest,
	loadFeaturedDotsSuccess,
	loadFeaturedDotsFailure
} from './actions-featured_dots.js';
import {
	loadDealDotsRequest,
	loadDealDotsSuccess,
	loadDealDotsFailure
} from './actions-deal_dots.js';
import {
	loadAllDotsRequest,
	loadAllDotsSuccess,
	loadAllDotsFailure
} from './actions-all_dots.js';
import {
	loadDotTabsRequest,
	loadDotTabsSuccess,
	loadDotTabsFailure
} from './actions-dot_tabs.js';
import {
	loadPriceTrackingDotsRequest,
	loadPriceTrackingDotsSuccess,
	loadPriceTrackingDotsFailure
} from './actions-price_tracking_dots.js';
import {
	loadFollowingDotsRequest,
	loadFollowingDotsSuccess,
	loadFollowingDotsFailure
} from './actions-following_dots.js';
import {
	loadTopDottersRequest,
	loadTopDottersSuccess,
	loadTopDottersFailure
} from './actions-top_dotters.js';
import {
	loadRelatedUsersRequest,
	loadRelatedUsersSuccess,
	loadRelatedUsersFailure
} from './actions-related_users.js';
import {
	loadLeftBannerRequest,
	loadLeftBannerSuccess,
	loadLeftBannerFailure
} from './actions-left_banner.js';
import {
	loadDefaultRetailerRequest,
	loadDefaultRetailerSuccess,
	loadDefaultRetailerFailure
} from './actions-default_retailer.js';
import {
	loadDefaultCuratorRequest,
	loadDefaultCuratorSuccess,
	loadDefaultCuratorFailure
} from './actions-default_curator.js';

import {
	LOAD_HOME_SUCCESS_INTERVAL,
	LOAD_HOME_FAILURE_INTERVAL,
} from '../intervals.js';

import {
	HOME_LASTUPDATETIME,
	STORE
} from '../constants.js';


const onLoadHomeRequest = () => dispatch => {
	dispatch(loadHomeRequest());

	dispatch(loadProfileRequest());
	dispatch(loadTopBannersRequest());
	dispatch(loadTopShopsRequest());
	dispatch(loadDealShopsRequest());
	dispatch(loadStyleShopsRequest());
	dispatch(loadFeaturedDotsRequest());
	dispatch(loadDealDotsRequest());
	dispatch(loadAllDotsRequest());
	dispatch(loadDotTabsRequest());
	dispatch(loadPriceTrackingDotsRequest());
	dispatch(loadFollowingDotsRequest());
	dispatch(loadTopDottersRequest());
	dispatch(loadRelatedUsersRequest());
	dispatch(loadLeftBannerRequest());
	dispatch(loadDefaultRetailerRequest());
	dispatch(loadDefaultCuratorRequest());
};

export const onLoadHomeSuccess = delay => dispatch => {
	//console.log('remaining time to next loading', delay ? delay: LOAD_HOME_SUCCESS_INTERVAL);
	dispatch(loadHomeSuccess());

	setTimeout(() => {
		dispatch(loadHomeFromServer());
	}, delay ? delay : LOAD_HOME_SUCCESS_INTERVAL);
};

const onLoadHomeFailure = () => dispatch => {
	dispatch(loadProfileFailure());
	dispatch(loadTopBannersFailure());
	dispatch(loadTopShopsFailure());
	dispatch(loadDealShopsFailure());
	dispatch(loadStyleShopsFailure());
	dispatch(loadFeaturedDotsFailure());
	dispatch(loadDealDotsFailure());
	dispatch(loadAllDotsFailure());
	dispatch(loadDotTabsFailure());
	dispatch(loadPriceTrackingDotsFailure());
	dispatch(loadFollowingDotsFailure());
	dispatch(loadTopDottersFailure());
	dispatch(loadRelatedUsersFailure());
	dispatch(loadLeftBannerFailure());
	dispatch(loadDefaultRetailerFailure());
	dispatch(loadDefaultCuratorFailure());

	dispatch(loadHomeFailure());


	setTimeout(() => {
		dispatch(loadHomeFromServer());
	}, LOAD_HOME_FAILURE_INTERVAL);
};

const handleResponseFromServer = response => dispatch => {
	for (let object of response) {
		if (object.profile && object.profile.responseCode === 'SUCCESS') {
			dispatch(loadProfileSuccess(object.profile.responseData[0]));
		}
		if (object.topBanners && object.topBanners.responseCode === 'SUCCESS') {
			dispatch(loadTopBannersSuccess(object.topBanners.responseData));
		}
		if (object.topShops && object.topShops.responseCode === 'SUCCESS') {
			fillTopShopsWithBase64(object.topShops.responseData)
				.then(filledTopShops => sortTopShops(filledTopShops))
				.then(filledAndSortedTopShops => {
					dispatch(loadTopShopsSuccess(filledAndSortedTopShops));
				})
				.catch(error => {
					console.log('fill top shops with base64', error);
				});
		}
		if (object.dealShops && object.dealShops.responseCode === 'SUCCESS') {
			dispatch(loadDealShopsSuccess(object.dealShops.responseData));
		}
		if (object.styleShops && object.styleShops.responseCode === 'SUCCESS') {
			dispatch(loadStyleShopsSuccess(object.styleShops.responseData));
		}
		if (object.featuredDots && object.featuredDots.responseCode === 'SUCCESS') {
			let payload = {
				data: {
					dots: object.featuredDots.responseData.map(dot => {dot.cache = true; return dot;}),
				},
				nextPageNumber: 0
			};
			dispatch(loadFeaturedDotsSuccess(payload));
			let ids = [];
			payload.data.dots.map(dot => {
				if (dot.dotUserId) ids.push(dot.dotUserId);
				if (dot.ownerId) ids.push(dot.ownerId);
			});
			dispatch(loadPartialProfiles({ ids, cache: true }));
		}
		if (object.dealDots && object.dealDots.responseCode === 'SUCCESS') {
			dispatch(loadDealDotsSuccess(object.dealDots.responseData));
		}
		if (object.allDots && object.allDots.responseCode === 'SUCCESS') {
			let payload = {
				data: {
					dots: object.allDots.responseData.map(dot => {dot.cache = true; return dot;}),
				},
				nextPageNumber: 0
			};
			dispatch(loadAllDotsSuccess(payload));
			let ids = [];
			payload.data.dots.map(dot => {
				if (dot.dotUserId) ids.push(dot.dotUserId);
				if (dot.ownerId) ids.push(dot.ownerId);
			});
			dispatch(loadPartialProfiles({ ids, cache: true }));
		}
		if (object.dotTabs && object.dotTabs.responseCode === 'SUCCESS') {
			dispatch(loadDotTabsSuccess(object.dotTabs.responseData));
		}
		if (object.priceTrackingDots && object.priceTrackingDots.responseCode === 'SUCCESS') {
			let payload = {
				data: {
					dots: object.priceTrackingDots.responseData,
				},
				nextPageNumber: 0
			};
			dispatch(loadPriceTrackingDotsSuccess(payload));
		}
		if (object.followingDots && object.followingDots.responseCode === 'SUCCESS') {
			let payload = {
				data: {
					dots: object.followingDots.responseData.map(dot => {dot.cache = true; return dot}),
				},
				nextPageNumber: 0
			};
			dispatch(loadFollowingDotsSuccess(payload));
		}
		if (object.topDotters && object.topDotters.responseCode === 'SUCCESS') {
			dispatch(loadTopDottersSuccess(object.topDotters.responseData));
		}
		if (object.relatedUsers && object.relatedUsers.responseCode === 'SUCCESS') {
			let payload = {};
			for (let item of object.relatedUsers.responseData) {
				for (let id in item) {
					payload[id] = item[id];
				}
			}
			dispatch(loadRelatedUsersSuccess(payload));
		}
		if (object.leftBanner && object.leftBanner.responseCode === 'SUCCESS') {
			dispatch(loadLeftBannerSuccess(object.leftBanner.responseData[0]));
		}
		if (object.defaultRetailer && object.defaultRetailer.responseCode === 'SUCCESS') {
			dispatch(loadDefaultRetailerSuccess(object.defaultRetailer.responseData[0]));
		}
		if (object.defaultCurator && object.defaultCurator.responseCode === 'SUCCESS') {
			dispatch(loadDefaultCuratorSuccess(object.defaultCurator.responseData[0]));
		}
	}
};

// Get data from remote server
export const loadHomeFromServer = () => dispatch => {
	dispatch(onLoadHomeRequest());
	fetch(LOAD_HOME_URL, {
		method: 'get',
		credentials: 'include'
	})
		.then(handleResponse)
		.then(response => response.json())
		.then(handleJsonResponse)
		.then(responseData => {
			dispatch(handleResponseFromServer(responseData));
			dispatch(onLoadHomeSuccess());
		})
		.catch(error => {
			console.error('loadHomeFromServer error:', error);
			switch (true) {
				case error instanceof SomethingWrongError:
				case error instanceof IncorrectJsonError:
					dispatch(onLoadHomeFailure());
					dispatch(somethingWrongHappened());
					dispatch(signOut());
					break;
				case error instanceof AuthError:
					dispatch(onLoadHomeFailure());
					dispatch(signOut());
					break;
			}
		});
};

// Fetch all data for home page
export const loadHome = () => dispatch => {
	dispatch(loadHomeFromServer());
};

