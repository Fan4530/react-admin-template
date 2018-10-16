import { enqueueAlert } from '../../alerts/enqueue.js';
import { handleResponse, handleJsonResponse } from '../../../utils.js';
import { signOut } from '../../auth/signOut.js';
import { somethingWrongHappened } from '../../auth/somethingWrongHappened.js';
import { removeRecord } from '../../pages/removeRecord.js';
import { replaceDot } from '../../dotStorage/replaceDot.js';
import { addDotToCollection } from '../../collections/add-dot.js';
import { deleteDotFromCollection } from '../../collections/delete-dot.js';

// Custom errors.
import { AuthError } from '../../../errors.js';
import { ComponentError } from '../../../errors.js';
import { IncorrectJsonError } from '../../../errors.js';
import { SomethingWrongError } from '../../../errors.js';

import { EDIT_DOT_URL } from '../../../urls.js';
import { SOMETHING_WRONG_ALERT_TEXT } from '../../../constants.js';
import { PROFILE_DOTS_PAGE_SIZE } from '../../../constants.js';

export const EDIT_DOT_REQUEST = 'EDIT_DOT_REQUEST';
export const EDIT_DOT_SUCCESS = 'EDIT_DOT_SUCCESS';
export const EDIT_DOT_FAILURE = 'EDIT_DOT_FAILURE';

export const editDotRequest = payload => ({
    type: EDIT_DOT_REQUEST,
    payload
});

export const editDotSuccess = payload => ({
    type: EDIT_DOT_SUCCESS,
    payload
});

export const editDotFailure = payload => ({
    type: EDIT_DOT_FAILURE,
    payload
});

export const editDot = ({ id, type, description, link, collection }) => (dispatch, getState) => {
	console.log('EDIT DOT', collection);
    let payload = { id, type, description, link, collection };
    dispatch(editDotRequest(payload));

    let dot = {
        id,
        dotSummary: {
            dotDescription: description,
            pageUrl: link,
		},
		dotCollection: collection,
    };

    let body = JSON.stringify([dot]);

    let url = EDIT_DOT_URL(type);
    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
		.then(handleResponse)
		.then(response => response.json())
		.then(handleJsonResponse)
		.then(responseData => {
			try {
				dispatch(editDotSuccess());
				(async () => {
					let currentCollectionName = getState().dotStorage[id].dotCollection;
					let currentCollectionId = getState().user.data.collectionMap[currentCollectionName].id;
					let newCollectionId = getState().user.data.collectionMap[collection].id;
					console.log('compare collections', currentCollectionId, newCollectionId);
					if (currentCollectionId !== newCollectionId) {
						console.log('SWITCH');
						await dispatch(deleteDotFromCollection({
							id: currentCollectionId,
							dot: {
								id: responseData[0].id,
								type: responseData[0].dotType

							}
						}));
						await dispatch(addDotToCollection({
							id: newCollectionId,
							dot: {
								id: responseData[0].id,
								type: responseData[0].dotType

							}
						}));
					}
					dispatch(replaceDot({ dot: responseData[0] }));
				})();
			} catch (e) {
				return Promise.reject(new ComponentError(e.message));
			}
		})
		.catch(error => {
			console.error('deleteDots error:', error);
			switch (true) {
				case error instanceof SomethingWrongError:
				case error instanceof IncorrectJsonError:
					dispatch(editDotFailure());
					dispatch(somethingWrongHappened());
					dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
					break;
				case error instanceof AuthError:
					dispatch(editDotFailure());
					dispatch(signOut());
					break;
				case error instanceof ComponentError:
					// Do nothing.
					break;
				default:
					dispatch(editDotFailure());
					dispatch(enqueueAlert({ alert: { text: SOMETHING_WRONG_ALERT_TEXT } }));
			}
		});
};

