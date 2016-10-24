import React, { Component } from 'react';
import { browserHistory, Router, Route, Link, Redirect } from 'react-router'

export default class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">PROXY MANAGER</Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="active">
                                    <Link to="/">Proxy List</Link>
                                </li>
                                <li><a href="#about">Account</a></li>
                                <li><a href="#contact">Group</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container proxy-manager">
                    {this.props.children}
                </div>
            </div>
        );
    }
}