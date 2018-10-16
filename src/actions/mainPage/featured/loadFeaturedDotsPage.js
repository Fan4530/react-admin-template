import { LOAD_FEATURED_DOTS_URL } from '../../../urls.js';
import { MAINPAGE_FEATURED_DOTS_PAGE_SIZE } from '../../../constants.js';
import 'whatwg-fetch';
import { loadPartialProfiles } from '../../profiles/loadPartialProfiles.js';
import { handleResponse, handleJsonResponse, getNextPage } from '../../../utils.js';
import { somethingWrongHappened } from '../../auth/somethingWrongHappened.js';
import {
    AuthError, 
    IncorrectJsonError,
    SomethingWrongError,
} from '../../../errors.js';
import { signOut } from '../../auth/signOut.js';
import { addPage } from '../../pages/addPage.js';
import { pushDots } from '../../dotStorage/pushDots.js';

import { MAINPAGE_PAGINATION_ID } from '../../../constants.js';
import { SORT_MAINPAGE_FEATURED_DOTS_BY } from '../../../constants.js';


export const LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_REQUEST = 'LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_REQUEST';
export const LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_SUCCESS = 'LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_SUCCESS';
export const LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_FAILURE = 'LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_FAILURE';

export const loadFeaturedDotsPageForMainpageRequest = payload => ({
    type: LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_REQUEST,
    payload
});

export const loadFeaturedDotsPageForMainpageSuccess = payload => ({
    type: LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_SUCCESS,
    payload
});

export const loadFeaturedDotsPageForMainpageFailure = payload => ({
    type: LOAD_FEATURED_DOTS_PAGE_FOR_MAINPAGE_FAILURE,
    payload
});

export const loadFeaturedDotsPageForMainpage = () => (dispatch, getState) => {
    dispatch(loadFeaturedDotsPageForMainpageRequest());

    const id = MAINPAGE_PAGINATION_ID;
    const volume = 'featured';
    const nextPage = getNextPage({ state: getState(), id, volume });
    const pageSize = MAINPAGE_FEATURED_DOTS_PAGE_SIZE;
    const body = JSON.stringify({
        "sort": {
            "fieldName": SORT_MAINPAGE_FEATURED_DOTS_BY,
            "ascending": false
        },
        pageNumber: nextPage,
        pageSize: pageSize
    });
    fetch(LOAD_FEATURED_DOTS_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then(handleResponse)
        .then(response => response.json())
        .then(handleJsonResponse)
        .then(responseData => {
            dispatch(loadFeaturedDotsPageForMainpageSuccess({ dots: responseData[0].dots.responseData }));
            let ids = [];
            responseData[0].dots.responseData.map(dot => {
                if (dot.dotUserId) ids.push(dot.dotUserId);
                if (dot.ownerId) ids.push(dot.ownerId);
            });
            dispatch(pushDots({ dots: responseData[0].dots.responseData }));
            dispatch(addPage({ id, records: responseData[0].dots.responseData.map(dot => dot.id), volume, pageSize }));
            dispatch(loadPartialProfiles({ ids }));
        })
        .catch(error => {
            console.error('loadFeaturedDotsPageForMainpage error:', error);
            switch (true) {
                case error instanceof SomethingWrongError:
                case error instanceof IncorrectJsonError:
                    dispatch(loadFeaturedDotsPageForMainpageFailure());
                    dispatch(somethingWrongHappened());
                    dispatch(signOut());
                    break;
                case error instanceof AuthError:
                    dispatch(loadFeaturedDotsPageForMainpageFailure());
                    dispatch(signOut());
                    break;
            }
        });

};











