import { signOut } from './signOut';

export const checkStatus = status => dispatch => {
    if (status === 401) {
        dispatch(signOut());
    }
};