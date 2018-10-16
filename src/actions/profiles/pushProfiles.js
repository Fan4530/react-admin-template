export const PUSH_PROFILES_REQUEST = 'PUSH_PROFILES_REQUEST';

export const pushProfilesRequest = payload => ({
    type: PUSH_PROFILES_REQUEST,
    payload
});

export const pushProfiles = ({ profiles }) => dispatch => {
    dispatch(pushProfilesRequest({ profiles }));
};