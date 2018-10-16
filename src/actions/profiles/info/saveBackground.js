import { SAVE_BACKGROUND_URL } from '../../../urls.js';
import { handleResponse, handleJsonResponse } from '../../../utils.js';
import { somethingWrongHappened } from '../../auth/somethingWrongHappened.js';
import {
	AuthError,
	IncorrectJsonError,
	SomethingWrongError,
	ComponentError,
} from '../../../errors.js';
import { signOut } from '../../auth/signOut.js';
import {enqueueAlert} from "../../alerts/enqueue";


export const SAVE_BACKGROUND_REQUEST = 'SAVE_BACKGROUND_REQUEST';
export const SAVE_BACKGROUND_SUCCESS = 'SAVE_BACKGROUND_SUCCESS';
export const SAVE_BACKGROUND_FAILURE = 'SAVE_BACKGROUND_FAILURE';

export const saveBackgroundRequest = payload => ({
	type: SAVE_BACKGROUND_REQUEST,
	payload
});

export const saveBackgroundSuccess = payload => ({
	type: SAVE_BACKGROUND_SUCCESS,
	payload
});

export const saveBackgroundFailure = payload => ({
	type: SAVE_BACKGROUND_FAILURE,
	payload
});

export const saveBackground = ({file, x, y, w, h, pos_x, pos_y}) => (dispatch, getState) => {
	dispatch(saveBackgroundRequest());

	///console.log('bgfile',file);

	let data = new FormData();

    if (file) {
        file.name.replace(".jpeg", ".jpg");

        data.append('file', file, file.name);
        data.append('x', x);
        data.append('y', y);
        data.append('w', w);
        data.append('h', h);
        data.append('pos_x', pos_x);
        data.append('pos_y', pos_y);


        fetch(SAVE_BACKGROUND_URL, {
            method: 'post',
            credentials: 'include',
            // headers: {
            // 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            // },
            body: data
        })
            .then(
                handleResponse
            )
            .then(
                response => response.json()
            )
            .then(
                handleJsonResponse
            )
            .then(
                responseData => {
                    try {
                        dispatch(enqueueAlert({alert: {text: "Coverpic Successfully updated"}}));
                        dispatch(saveBackgroundSuccess({
                            id: getState().user.data.id,
                            backgroundImage: responseData[0]
                        }));
                    } catch (e) {
                        return Promise.reject(new ComponentError(e.message));
                    }
                })
            .catch(error => {
                dispatch(enqueueAlert({alert: {text: "Something error. Please try again!"}}));

                ///console.error('saveBackground error:', error);
                switch (true) {
                    case error instanceof SomethingWrongError:
                    case error instanceof IncorrectJsonError:
                        dispatch(saveBackgroundFailure());
                        dispatch(somethingWrongHappened());
                        dispatch(signOut());
                        break;
                    case error instanceof AuthError:
                        dispatch(saveBackgroundFailure());
                        dispatch(signOut());
                        break;
                    case error instanceof ComponentError:
                        // Do nothing.
                        break;
                    default:
                        dispatch(saveBackgroundFailure());

                }
            });
    }
};
