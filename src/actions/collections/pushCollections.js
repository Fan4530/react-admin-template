export const PUSH_COLLECTIONS_REQUEST = 'PUSH_COLLECTIONS_REQUEST';

export const pushCollectionsRequest = payload => ({
    type: PUSH_COLLECTIONS_REQUEST,
    payload
});

export const pushCollections = ({ collections }) => dispatch => {
    dispatch(pushCollectionsRequest({ collections }));
};