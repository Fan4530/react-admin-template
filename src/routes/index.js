
import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AllComponents from '../components';
import routesConfig from './config';

export default class xCRouter extends Component {
    requireAuth = (permission, component) => {
        const {auth} = this.props;
        const {permissions} = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'}/>;
        return component;
    };
    requireLogin = (component, permission) => {
        const {auth} = this.props;
        const {permissions} = auth.data;
        if (process.env.NODE_ENV === 'production' && !permissions) { // 线上环境判断是否登录
            return <Redirect to={'/login'}/>;
        }
        return permission ? this.requireAuth(permission, component) : component;
    };

    route = (r, data) => {
        const isLoading = !data ? true : data.isLoading
        const Component = isLoading ? AllComponents['isLanding'] : AllComponents[r.component];
        console.log("check data here")
        console.log(r)
        console.log(data)

        return (
            <Route

                key={r.key}
                exact
                path={r.key}
                render={props => r.login ?
                    // TODO:
                    // why this if else??
                    <Component {...props}
                               data={data}/>
                    : this.requireLogin(<Component {...props} data={data}/>, r.auth)}
            />
        )
    }

    render() {

        const dataMapping = this.props.adminData
        console.log("check the data mapping")
        console.log(dataMapping)
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        // key = menu layer, for example: menu
                        // r:  the layer beside the menu
                        // for example: dashboard, user profiles

                        routesConfig[key].map(r => {
                            // if has sub routes, then mapping to sub routes
                            // else route to current rout

                            // TODO: use lodash get
                            // const data = _get(dataMapping, r.key, null).__wrapped__;
                            const data = dataMapping[r.idx]
                            if(r.idx == 'allCashouts') {
                                console.log("what is the data here")
                                console.log(r)
                                console.log(data)
                            }

                            return r.component ? this.route(r, data) : r.subs.map((r, data) => this.route(r, data));
                        })
                    )
                }

                <Route render={() => <Redirect to="/app/dashboard"/>}/>
            </Switch>
        )
    }
}
