import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import App from './App';

class Page extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/app/dashboard/index"/>}/>
                    <Route path="/app" component={App}/>
                    <Route path="/404" component={NotFound}/>
                    <Route path="/login" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default Page
