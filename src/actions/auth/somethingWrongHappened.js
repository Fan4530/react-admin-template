export const SOMETHING_WRONG_HAPPENED = 'SOMETHING_WRONG_HAPPENED';

export const somethingWrongHappened = payload => ({
	type: SOMETHING_WRONG_HAPPENED,
	payload
});