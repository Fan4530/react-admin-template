import {combineReducers} from 'redux';
import {httpData} from "./reducer-httpData";
import {initialState as profileInitialState, profile} from './reducer-profile.js';
import {allDots} from './reducer-all_dots.js';
import {initialState as profilesInitialState, profiles} from './reducer-profiles.js';
import {auth, initialState as authInitialState} from './reducer-auth.js';
import {allProfiles, initialState as allProfilesInitialState} from "./reducer-all_profiles";

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

export const initialState = {
    user: profileInitialState,
    profiles: profilesInitialState,
    auth: authInitialState,
    allProfiles: allProfilesInitialState,

};
export const appReducer = combineReducers({
    user: profile,
    allProfiles,

    allDots,


    profiles,


    httpData,
    auth,
});

export const rootReducer = (state, action) => {
    // if (action.type === SIGN_OUT_REQUEST || action.type === CHECK_AUTH_FAILURE) {
    //     if (!FOR_LOCALHOST) state = initialState;
    // }
    return appReducer(initialState, action)
};
