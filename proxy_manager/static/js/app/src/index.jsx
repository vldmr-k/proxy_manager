import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

import App from  './App.jsx';
import NoMatch from  './NoMatch.jsx';
import { ProxyCreate, ProxyList, ProxyEdit } from "./components/proxy/index.jsx";
import { TagList, TagCreate, TagEdit } from  "./components/tag/index.jsx";

ReactDOM.render((
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={ProxyList} />
                <Route path='proxy/create' component={ProxyCreate} />
                <Route path="proxy/edit/:proxy_id" component={ProxyEdit}/>
                <Route path='tags' component={TagList} />
                <Route path="tag/create" component={TagCreate}/>
                <Route path="tag/edit/:tag_id" component={TagEdit}/>
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
    )
), document.getElementById('root'));