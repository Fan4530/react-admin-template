import 'whatwg-fetch';

import { enqueueAlert } from '../../alerts/enqueue.js';
import { handleResponse, handleJsonResponse } from '../../../utils.js';
import { signOut } from '../../auth/signOut.js';
import { somethingWrongHappened } from '../../auth/somethingWrongHappened.js';
import { removeRecord } from '../../pages/removeRecord.js';
import { deleteDot as deleteDotFromDotStorage} from '../../dotStorage/deleteDot.js';

// Custom errors.
import { AuthError } from '../../../errors.js';
import { ComponentError } from '../../../errors.js';
import { IncorrectJsonError } from '../../../errors.js';
import { SomethingWrongError } from '../../../errors.js';

import { DELETE_DOT_URL } from '../../../urls.js';
import { SOMETHING_WRONG_ALERT_TEXT } from '../../../constants.js';
import { PROFILE_DOTS_PAGE_SIZE } from '../../../constants.js';


export const DELETE_DOT_REQUEST = 'DELETE_DOT_REQUEST';
export const DELETE_DOT_SUCCESS = 'DELETE_DOT_SUCCESS';
export const DELETE_DOT_FAILURE = 'DELETE_DOT_FAILURE';

export const deleteDotRequest = payload => ({
	type: DELETE_DOT_REQUEST,
	payload
});

export const deleteDotSuccess = payload => ({
	type: DELETE_DOT_SUCCESS,
	payload
});

export const deleteDotFailure = payload => ({
	type: DELETE_DOT_FAILURE,
	payload
});

// Delete from my dots 
export const deleteDot = ({id, type}) => (dispatch, getState) => {
	dispatch(deleteDotRequest());

	let data = {
		id,
		type
	};

	fetch(DELETE_DOT_URL, {
		body: JSON.stringify(data),
		method: 'post', 
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(handleResponse)
		.then(response => response.json())
		.then(handleJsonResponse)
		.then(responseData => {
			try {
				const myId = getState().user.data.id;
				const myProfile = getState().profiles[myId].data;
				const dot = getState().dotStorage[id];
				const collectionName = dot.dotCollection;
				const collectionId = myProfile.collectionMap[collectionName].id;
				const dotsVolume = 'dots';
				const likesVolume = 'likes';
				const pageSize = PROFILE_DOTS_PAGE_SIZE;
				const callback = record => record === id;

				dispatch(deleteDotSuccess());
				dispatch(removeRecord({ id: collectionId, volume: dotsVolume, callback, pageSize }));
				dispatch(removeRecord({ id: myId, volume: dotsVolume, callback, pageSize }));
				dispatch(removeRecord({ id: myId, volume: likesVolume, callback, pageSize }));
				dispatch(deleteDotFromDotStorage({ id }));
			} catch (e) {
				return Promise.reject(new ComponentError(e.message));
			}
		})
		.catch(error => {
			console.error('deleteDots error:', error);
			switch (true) {
				case error instanceof SomethingWrongError:
				case error instanceof IncorrectJsonError:
					dispatch(deleteDotFailure());
					dispatch(somethingWrongHappened());
					dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
					break;
				case error instanceof AuthError:
					dispatch(deleteDotFailure());
					dispatch(signOut());
					break;
				case error instanceof ComponentError:
					// Do nothing.
					break;
				default:
					dispatch(deleteDotFailure());
					dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
			}
		});
};