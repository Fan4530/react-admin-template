import {
    LOAD_ALL_PROFILES_FAILURE,
    LOAD_ALL_PROFILES_REQUEST,
    LOAD_ALL_PROFILES_SUCCESS
} from '../actions/actions-all_profiles.js';

export const initialState = {
    data: [],
    isLoading: false,
    isErrored: false,
    nextPageNumber: 0
};

export const allProfiles = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_PROFILES_REQUEST: {
            console.log("what is the request state")
            console.log(state)
            return Object.assign({}, state, {
                isLoading: true,

            })
        }
        case LOAD_ALL_PROFILES_SUCCESS: {
            console.log("what is the succuss state")
            console.log(state)
            console.log(action.payload.data.profiles)
            return Object.assign({}, state, {
                    isLoading: true,
                    data: action.payload.data.profiles,
                }
            )
        }
        //     [
        //     ...state,
        //     {
        //         isLoading: false,
        //         data: action.payload.data.profiles,
        //     }
        // ]
        // state.isLoading = false;
        // state.isErrored = false;
        // let pageSize = ALL_DOTS_PAGE_SIZE;
        // let start = pageSize * (action.payload.nextPageNumber);
        // state.data.splice(start, pageSize, ...action.payload.data.dots.slice(0, pageSize));
        // if (action.payload.nextPageNumber >= state.nextPageNumber) state.nextPageNumber++;
        // return state;

        case LOAD_ALL_PROFILES_FAILURE:
            return Object.assign({}, state, {
                    isLoading: false,
                    isErrored: true,
                }
            );
        // return [
        //     ...state,
        //     {
        //         isLoading: false,
        //         isErrored: true,
        //     }
        // ]
    }
    return state;
};


