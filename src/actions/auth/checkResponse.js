import { signOut } from './signOut.js';
import { somethingWrongHappened } from './somethingWrongHappened.js';

export const checkResponse = (response, dispatch) => {
	if (response.ok) {
		return true;
	} else {
		if (response.status === 401) {
			dispatch(signOut());
		} else {
			dispatch(somethingWrongHappened());
		}
		return false;
	}
};