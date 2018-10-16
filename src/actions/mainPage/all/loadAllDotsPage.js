import 'whatwg-fetch';
import { AuthError } from '../../../errors.js';
import { IncorrectJsonError } from '../../../errors.js';
import { SomethingWrongError } from '../../../errors.js';
import { ComponentError } from '../../../errors.js';
import { addPage } from '../../pages/addPage.js';
import { getNextPage } from '../../../utils.js';
import { handleJsonResponse } from '../../../utils.js';
import { handleResponse } from '../../../utils.js';
import { loadPartialProfiles } from '../../profiles/loadPartialProfiles.js';
import { pushDots } from '../../dotStorage/pushDots.js';
import { signOut } from '../../auth/signOut.js';
import { somethingWrongHappened } from '../../auth/somethingWrongHappened.js';

import { ALL_DOTS_FOR_MAINPAGE_PAGE_SIZE } from '../../../constants.js';
import { LOAD_ALL_DOTS_URL } from '../../../urls.js';
import { MAINPAGE_PAGINATION_ID } from '../../../constants.js';

export const LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_REQUEST = 'LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_REQUEST';
export const LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_SUCCESS = 'LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_SUCCESS';
export const LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_FAILURE = 'LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_FAILURE';

export const loadAllDotsPageForMainpageRequest = payload => ({
    type: LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_REQUEST,
    payload
});

export const loadAllDotsPageForMainpageSuccess = payload => ({
    type: LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_SUCCESS,
    payload
});

export const loadAllDotsPageForMainpageFailure = payload => ({
    type: LOAD_ALL_DOTS_PAGE_FOR_MAINPAGE_FAILURE,
    payload
});

export const loadAllDotsPageForMainpage = () => (dispatch, getState) => {
    dispatch(loadAllDotsPageForMainpageRequest());

    const id = MAINPAGE_PAGINATION_ID;
    const volume = 'all';
    const nextPage = getNextPage({ state: getState(), id, volume });
    const pageSize = ALL_DOTS_FOR_MAINPAGE_PAGE_SIZE;
    const body = JSON.stringify({
        "sort": {
            "fieldName": "createdDate",
            "ascending": false
        },
        "pageNumber": nextPage,
        "pageSize": ALL_DOTS_FOR_MAINPAGE_PAGE_SIZE
    });
    fetch(LOAD_ALL_DOTS_URL, {
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
            try {
                dispatch(loadAllDotsPageForMainpageSuccess({ dots: responseData }));
                dispatch(pushDots({ dots: responseData })); // Push dots to dot storage
                dispatch(addPage({ id, records: responseData.map(dot => dot.id), volume, pageSize })); // add page to pages
                let ids = []; // ids of profiles that are required for showing dots
                responseData.map(dot => {
                    if (dot.dotUserId) ids.push(dot.dotUserId); // Who redotted exactly this dot
                    if (dot.ownerId) ids.push(dot.ownerId); // Creator of origin dot
                });
                dispatch(loadPartialProfiles({ ids })); // load profiles related to downloaded dots
            } catch (e) {
                return Promise.reject(new ComponentError(e.message));
            }
        })
        .catch(error => {
            console.error('loadAlldotsPageForMainPage error:', error);
            switch (true) {
                case error instanceof SomethingWrongError:
                case error instanceof IncorrectJsonError:
                    dispatch(loadAllDotsPageForMainpageFailure());
                    dispatch(somethingWrongHappened());
                    dispatch(signOut());
                    break;
                case error instanceof AuthError:
                    dispatch(loadAllDotsPageForMainpageFailure());
                    dispatch(signOut());
                    break;
                case error instanceof ComponentError:
                    // Do nothing.
                    break;
                default:
                    dispatch(loadAllDotsPageForMainpageFailure());
                    
            }
        });
};
