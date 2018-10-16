import { SAVE_AVATAR_URL,SAVE_BACKGROUND_URL } from '../../../urls.js';
import { handleResponse, handleJsonResponse } from '../../../utils.js';
import { somethingWrongHappened } from '../../auth/somethingWrongHappened.js';
import {
	AuthError, 
	IncorrectJsonError,
	SomethingWrongError,
	ComponentError
} from '../../../errors.js';
import { signOut } from '../../auth/signOut.js';
import { enqueueAlert } from '../../alerts/enqueue.js';


export const SAVE_AVATAR_REQUEST = 'SAVE_AVATAR_REQUEST';
export const SAVE_AVATAR_SUCCESS = 'SAVE_AVATAR_SUCCESS';
export const SAVE_AVATAR_FAILURE = 'SAVE_AVATAR_FAILURE';

export const saveAvatarRequest = payload => ({
	type: SAVE_AVATAR_REQUEST,
	payload
});

export const saveAvatarSuccess = payload => ({
	type: SAVE_AVATAR_SUCCESS,
	payload
});

export const saveAvatarFailure = payload => ({
	type: SAVE_AVATAR_FAILURE,
	payload
});

export const saveAvatar = ({file, x, y, w, h, pos_x, pos_y}) => (dispatch, getState) => {
	dispatch(saveAvatarRequest());

	let data = new FormData();
	if (file){ data.append('file', file, file.name);
	data.append('x', x);
	data.append('y', y);
	data.append('w', w);
	data.append('h', h);
	data.append('pos_x', pos_x);
	data.append('pos_y', pos_y);

	fetch(SAVE_AVATAR_URL, {
		method: 'post',
		credentials: 'include',
		// headers: {
			// 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			// 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		// },
		body: data
	})
		.then(handleResponse)
		.then(response => response.json())
		.then(handleJsonResponse)
		.then(responseData => {
			try {
				//alert(1);
			///	location.reload();
			dispatch(enqueueAlert({ alert: { text: "Profilepic Successfully updated" } }));
			
				dispatch(saveAvatarSuccess({ id: getState().user.data.id, profileImage: responseData[0] }
			
			));
			} catch (e) {
				return Promise.reject(new ComponentError(e.message));
			}
		})
		.catch(error => {
			dispatch(enqueueAlert({ alert: { text: "Something error try again!" } }));
			
			console.error('saveAvatar error:', error);
			switch (true) {
				case error instanceof SomethingWrongError:
				case error instanceof IncorrectJsonError:
					dispatch(saveAvatarFailure());
					dispatch(somethingWrongHappened());
					dispatch(signOut());
					break;
				case error instanceof AuthError:
					dispatch(saveAvatarFailure());
					dispatch(signOut());
					break;
				case error instanceof ComponentError:
					// Do nothing.
					break;
				default:
					dispatch(saveAvatarFailure());
			}
		});	
	}
};