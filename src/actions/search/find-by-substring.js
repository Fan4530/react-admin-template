import { SEARCH_URL } from '../../urls.js';
import { SEARCH_PAGE_SIZE } from '../../constants.js';
import { checkResponse, checkResponseJson, getResponseData, getNextPage } from '../../utils.js';
import { SEARCH_PAGINATION_ID, SEARCH_DROPDOWN_PAGINATION_ID } from '../../constants.js';
import { loadPartialProfiles } from '../profiles/loadPartialProfiles.js';
import { addPage } from '../pages/addPage.js';
import { pushDots } from '../dotStorage/pushDots.js';
import { pushCollections } from '../collections/pushCollections.js';
import { pushProfiles } from '../profiles/pushProfiles.js';
import 'whatwg-fetch';
import { flushVolumes } from '../pages/flushVolumes.js';

export const FIND_BY_SUBSTRING_REQUEST = 'FIND_BY_SUBSTRING_REQUEST';
export const FIND_BY_SUBSTRING_SUCCESS = 'FIND_BY_SUBSTRING_SUCCESS';
export const FIND_BY_SUBSTRING_FAILURE = 'FIND_BY_SUBSTRING_FAILURE';

export const GET_SEARCH_RESULT_PAGE_SUCCESS = 'GET_SEARCH_RESULT_PAGE_SUCCESS';


export const findBySubstringRequest = payload => ({
    type: FIND_BY_SUBSTRING_REQUEST,
    payload
});

export const findBySubstringSuccess = payload => ({
    type: FIND_BY_SUBSTRING_SUCCESS,
    payload
});

export const findBySubstringFailure = payload => ({
    type: FIND_BY_SUBSTRING_FAILURE,
    payload
});

export const getSearchResultPageSuccess = payload => ({
    type: GET_SEARCH_RESULT_PAGE_SUCCESS,
    payload
});

export const findBySubstring = data => (dispatch, getState) => {
    console.log('FIND BY SUBSTRING');
    const { categories, substring, id, forTab = 'all', pageSize, signal } = data;
    
    dispatch(findBySubstringRequest(
        {
            ...data
        }
    ));

    let result, merged = {
        dots: [],
        deals: [],
        people: [],
        collections: [],
        dotCollectionsData: {}
    };

    let volume;
    switch (categories[0]) {
        case 'dealDot':
            volume = 'deals'; break;
        case 'socialDot':
            volume = 'dots'; break;
        case 'userProfile':
            volume = 'people'; break;
        case 'collection':
            volume = 'collections'; break;
    }

    const nextPage = getNextPage({ state: getState(), id, volume });
    let pageSizeVar = pageSize ? pageSize : SEARCH_PAGE_SIZE;
    const url = SEARCH_URL(categories, substring, categories, pageSizeVar, nextPage);

    fetch(url, {signal})
    .then(
        response => response.json(),
        error => {
            console.log(error);
            dispatch(findBySubstringFailure({
                ...data
            }));
        }
    )
    .then(response => {
        console.log('search response', response);
        if (response.ServiceResponse && response.ServiceResponse.responseCode === 'SUCCESS') {
            let data = response.ServiceResponse.responseData[0];
            result = {
                dots: data.hitSocialDots,
                deals: data.hitDealDots,
                people: data.hitUserProfiles,
                collections: data.hitCollections,
                ids: []
            };
            result.dots.map(dot => {
                dot._source.id = dot._id;
                merged.dots.push(dot._source);
                if (dot._source.dotUserId) merged.ids.push(dot._source.dotUserId);
                if (dot._source.ownerId) merged.ids.push(dot._source.ownerId);
            });
            result.deals.map(dot => {
                dot._source.id = dot._id;
                merged.deals.push(dot._source);
                if (dot._source.shopId) result.ids.push(dot._source.shopId);
            });
            result.collections.map(collection => {
                collection._source.id = collection._id;
                merged.collections.push(collection._source);
                if (collection._source.userId) result.ids.push(collection._source.userId);
            });
            result.people.map(person => {
                person._source.id = person._id;
                merged.people.push(person._source);
            });

            dispatch(pushDots({ dots: merged.dots || []}));
            dispatch(addPage({id, records: merged.dots.map(dot => dot.id) || [], volume, pageSize: pageSizeVar}));

            dispatch(pushDots({ dots: merged.deals || [] }));
            dispatch(addPage({id, records: merged.deals.map(dot => dot.id) || [], volume, pageSize: pageSizeVar}));

            dispatch(pushProfiles({ profiles: merged.people || []}));
            dispatch(addPage({id, records: merged.people.map(dot => dot.id) || [], volume, pageSize: pageSizeVar}));

            dispatch(pushCollections({ collections: merged.collections || []}));
            dispatch(addPage({id, records: merged.collections.map(dot => dot.id) || [], volume, pageSize: pageSizeVar}));

            dispatch(loadPartialProfiles({ ids: merged.ids }));

            dispatch(findBySubstringSuccess({ merged }));
        } else {
            dispatch(findBySubstringFailure({ ...data }));
        }
    })
    .catch(error => {
        console.log(error);
    });
};