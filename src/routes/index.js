/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import AllComponents from '../components';
import routesConfig from './config';

export default class CRouter extends Component {
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

    route = r => {
        const Component = AllComponents[r.component];
        return (
            <Route
                key={r.route || r.key}
                exact
                path={r.route || r.key}
                render={props => r.login ?
                    <Component {...props} />
                    : this.requireLogin(<Component {...props} />, r.auth)}
            />
        )
    }

    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        // key = menu, other
                        // each r is one `title object`, for example, `dashboard object`
                        // r.component is the name of `title object`
                        routesConfig[key].map(r => {
                            return r.component ? this.route(r) : r.subs.map(r => this.route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404"/>}/>
            </Switch>
        )
    }
}
