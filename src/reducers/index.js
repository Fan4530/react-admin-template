import {combineReducers} from 'redux';
import {httpData} from "./reducer-httpData";
import {auth, initialState as authInitialState} from './reducer-auth.js';
import {allProfiles, initialState as allProfilesInitialState} from "./reducer-all_profiles";
import {allCashouts, initialState as allCashoutsInitialState} from "./reducer-all_cashouts";

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

export const initialState = {
    auth: authInitialState,
    allProfiles: allProfilesInitialState,
    allCashouts: allCashoutsInitialState,
};
export const appReducer = combineReducers({
    allProfiles,
    allCashouts,
    httpData,
    auth,
});

export const rootReducer = (state, action) => {
    // if (action.type === SIGN_OUT_REQUEST || action.type === CHECK_AUTH_FAILURE) {
    //     if (!FOR_LOCALHOST) state = initialState;
    // }
    return appReducer(initialState, action)
};
