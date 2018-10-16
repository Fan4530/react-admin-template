import {LOAD_DEALSHOP_URL} from "../urls";

export const LOAD_DEALSHOP_BY_DOMAIN_REQUEST = 'LOAD_DEALSHOP_BY_DOMAIN_REQUEST';
export const LOAD_DEALSHOP_BY_DOMAIN_SUCCESS = 'LOAD_DEALSHOP_BY_DOMAIN_SUCCESS';
export const LOAD_DEALSHOP_BY_DOMAIN_FAILURE = 'LOAD_DEALSHOP_BY_DOMAIN_FAILURE';

export const loadDealShopByDomainRequest = payload => ({
    type: LOAD_DEALSHOP_BY_DOMAIN_REQUEST,
    payload
});

export const loadDealShopByDomainSuccess = payload => ({
    type: LOAD_DEALSHOP_BY_DOMAIN_SUCCESS,
    payload
});

export const loadDealShopByDomainFailure = payload => ({
    type: LOAD_DEALSHOP_BY_DOMAIN_FAILURE,
    payload
});

export const loadDealShopByDomain = data => dispatch => {
    dispatch(loadDealShopByDomainRequest({ ...data }));
    const { domain } = data;
    const body = {
        "filters": [
            {
                "fieldName": "domain",
                "operator": "in",
                "value": domain
            }
        ]
    };

    fetch(LOAD_DEALSHOP_URL, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(
            response => response.json(),
            error => {
                dispatch(loadDealShopByDomainFailure({ ...data }))
            }
        )
        .then(response => {
            if (response.ServiceResponse &&
                response.ServiceResponse.responseCode === 'SUCCESS') {
                let payload = response.ServiceResponse.responseData[0];
                dispatch(loadDealShopByDomainSuccess(payload));
            } else {
                dispatch(loadDealShopByDomainFailure({ ...data }));
            }
        });
};