export const DECREMENT_PROFILE_LIKE_COUNT = 'DECREMENT_PROFILE_LIKE_COUNT';

export const decrementProfileLikeCount = payload => ({
	type: DECREMENT_PROFILE_LIKE_COUNT,
	payload
});