import 'whatwg-fetch';
import {LOAD_ALL_PROFILES_URL} from "../urls";

export const LOAD_ALL_PROFILES_REQUEST = 'LOAD_ALL_PROFILES_REQUEST';
export const LOAD_ALL_PROFILES_SUCCESS = 'LOAD_ALL_PROFILES_SUCCESS';
export const LOAD_ALL_PROFILES_FAILURE = 'LOAD_ALL_PROFILES_FAILURE';

export const loadAllProfilesRequest = payload => ({
    type: LOAD_ALL_PROFILES_REQUEST,
    payload
});

export const loadAllProfilesSuccess = payload => ({
    type: LOAD_ALL_PROFILES_SUCCESS,
    payload
});

export const loadAllProfilesFailure = payload => ({
    type: LOAD_ALL_PROFILES_FAILURE,
    payload
});


export const loadAllProfiles = () => (dispatch, getState) => {
    dispatch(loadAllProfilesRequest());

    // let pageNumber = getState().allDots.nextPageNumber;
    let pageNumber = 1// TODO
    let body = JSON.stringify({
        pageNumber,
        pageSize: 30 // ALL_DOTS_PAGE_SIZE = 30
        // TODO
    });


    fetch(LOAD_ALL_PROFILES_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
        .then(response => response.json())
        .then(json => {
            console.log("what is the json")
            console.log(json)
            if (json.ServiceResponse &&
                json.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = { //  define yourself
                    data: {
                        profiles: json.ServiceResponse.responseData[0].profiles.responseData,
                        // relatedUsers: json.ServiceResponse.responseData[1].relatedUsers.responseData[0]
                    },
                    nextPageNumber: pageNumber
                };
                dispatch(loadAllProfilesSuccess(payload));
                // let ids = [];
                // payload.data.profiles.map(profile => {
                //     if (profile.dotUserId) ids.push(profile.dotUserId);
                //     if (profile.ownerId) ids.push(profile.ownerId);
                // });
                // dispatch(loadPartialProfiles({ ids }));
            } else {
                dispatch(loadAllProfilesFailure());
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(loadAllProfilesFailure());
        });
};
