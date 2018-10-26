import {
    LOAD_ALL_CASHOUTS_FAILURE,
    LOAD_ALL_CASHOUTS_REQUEST,
    LOAD_ALL_CASHOUTS_SUCCESS
} from "../actions/actions-all_cashouts";

export const initialState = {
    data: [],
    isLoading: true,
    isErrored: false,
    nextPageNumber: 0
};

export const allCashouts = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_CASHOUTS_REQUEST: {
            // console.log("what is the request state")
            // console.log(state)
            return Object.assign({}, state, {
                isLoading: true,

            })
        }
        case LOAD_ALL_CASHOUTS_SUCCESS: {
            // console.log("what is the succuss state cashout")
            // console.log(state)
            // console.log(action.payload.data.cashouts)
            state.data = action.payload.data.cashouts;
            state.isLoading = false;
            return state;
            // return Object.assign({}, state, {
            //         isLoading: true,
            //         data: action.payload.data.cashouts,
            //     }
            // )
        }
        case LOAD_ALL_CASHOUTS_FAILURE:
            return Object.assign({}, state, {
                    isLoading: false,
                    isErrored: true,
                }
            );

    }
    return state;
};


