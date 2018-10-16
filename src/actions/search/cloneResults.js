import { cloneVolumes } from '../pages/cloneVolumes.js';

export const CLONE_RESULTS_REQUEST = 'CLONE_RESULTS_REQUEST';

export const cloneResultsRequest = payload => ({
    type: CLONE_RESULTS_REQUEST,
    payload
});

export const cloneResults = ({ sourceId, destinationId }) => dispatch => {
    dispatch(cloneResultsRequest({ sourceId, destinationId }));
    dispatch(cloneVolumes({ sourceId, destinationId }));
};
