export const getNextPage = ({ id, volume }) => (dispatch, getState) => {
	const pages = getState().pages;

	const volumes = pages[id];
	if (!volumes) return 0;

	const specificVolume = volumes[volume];
	if (!specificVolume) return 0;

	const { nextPage = 0 } = specificVolume;
	return nextPage;
};