import { LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_URL} from '../../../urls.js';
import { checkResponseJson, getResponseData } from '../../../utils.js';
import { checkStatus } from '../../auth/checkStatus.js';
import { checkResponse } from '../../auth/checkResponse.js';
import { pushCollections } from '../../collections/pushCollections.js';

export const LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_REQUEST = 'LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_REQUEST';
export const LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_SUCCESS = 'LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_SUCCESS';
export const LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_FAILURE = 'LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_FAILURE';

export const loadAllCollectionsForAuthenticatedProfileRequest = payload => ({
	type: LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_REQUEST,
	payload
});

export const loadAllCollectionsForAuthenticatedProfileSuccess = payload => ({
	type: LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_SUCCESS,
	payload
});

export const loadAllCollectionsForAuthenticatedProfileFailure = payload => ({
	type: LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_FAILURE,
	payload
});

export const loadAllCollectionsForAuthenticatedProfile = data => (dispatch, getState) => {
	dispatch(loadAllCollectionsForAuthenticatedProfileRequest(data));

	const id = getState().user.data.id;
    if (id === undefined) {
        dispatch(loadAllCollectionsForAuthenticatedProfileFailure());
        return;
    }
	const url = LOAD_ALL_COLLECTIONS_FOR_AUTHENTICATED_PROFILE_URL;
	const body = JSON.stringify({
        "filters": [
            {
                "fieldName": "userId",
                "operator": "=",
                "value": id
            }
        ],
        "pageNumber": 0,
        "pageSize": 1000000
	});

	fetch(url, {
		method: 'post',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	})
		.then(
			response => {
				if (checkResponse(response, dispatch)) {
					return response.json();
				} else {
					dispatch(loadAllCollectionsForAuthenticatedProfileFailure());
					return Promise.reject();
				}
			},
			error => {
				dispatch(loadAllCollectionsForAuthenticatedProfileFailure());
				return Promise.reject();
			}
		)
		.then(response => {
			if (checkResponseJson(response)) {
				let responseData = getResponseData(response);
				dispatch(loadAllCollectionsForAuthenticatedProfileSuccess({ ...data, data: responseData }));
				dispatch(pushCollections({ collections: responseData }));
			} else {
				dispatch(loadAllCollectionsForAuthenticatedProfileFailure());
				return Promise.reject();
			}
		});
	
};