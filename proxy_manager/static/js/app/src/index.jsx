import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import App from  './App.jsx';
import NoMatch from  './NoMatch.jsx';
import { ProxyCreate, ProxyList, ProxyEdit } from "./components/proxy/index.jsx";

ReactDOM.render((
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={ProxyList} />
                <Route path='proxy/create' component={ProxyCreate} />
                <Route path="proxy/edit/:proxy_id" component={ProxyEdit}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    )
), document.getElementById('root'));