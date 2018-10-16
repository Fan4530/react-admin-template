import { loadPartialProfiles } from '../../profiles/loadPartialProfiles.js';
import { checkResponseJson, getResponseData } from '../../../utils.js';
import { checkResponse } from '../../auth/checkResponse.js';

export const getProfilesForComments = data => dispatch => {
	const { comments } = data;
	let ids = comments.map(comment => comment.userId);
	dispatch(loadPartialProfiles({ ids }));
};