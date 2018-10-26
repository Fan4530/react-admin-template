import {
    LOAD_ALL_COMMISSIONS_FAILURE,
    LOAD_ALL_COMMISSIONS_REQUEST,
    LOAD_ALL_COMMISSIONS_SUCCESS
} from "../actions/actions-all_commissions";

export const initialState = {
    data: [],
    isLoading: true,
    isErrored: false,
    nextPageNumber: 0
};


//TODO: change way to represent case, ex.  LOAD_ALL_COMMISSIONS_SUCCESS -> succeuss
export const allCommissions = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_COMMISSIONS_REQUEST: {
            // console.log("what is the request state")
            // console.log(state)
            return Object.assign({}, state, {
                isLoading: true,

            })
        }
        case LOAD_ALL_COMMISSIONS_SUCCESS:
            // console.log("what is the succuss state commissions")
            // console.log(state)
            // console.log(action.payload.data.allCommissions)
            // console.log("show me the new state");

            // const newState =  state.setState('data', action.payload.data.allCommissions, breakWhil)
            // console.log("show me the new state");
            // // console.log(newState);
            //
            // const originalMethodState = Object.assign({}, state, {
            //         isLoading: true,
            //         data: action.payload.data.allCommissions,
            //     }
            // )
            // console.log("show me the originalMethod state")
            // console.log(originalMethodState)
            //
            //
            // return newState;
            // return Object.assign({}, state, {
            //         isLoading: true,
            //         data: action.payload.data.allCommissions,
            //     }
            // )

            // TODO: this is wrong, but why returning a state cannot change state
            state.data = action.payload.data.allCommissions;
            state.isLoading = false;
            return state;


        case LOAD_ALL_COMMISSIONS_FAILURE:
            return Object.assign({}, state, {
                    isLoading: false,
                    isErrored: true,
                }
            );
    }
    return state;
};


