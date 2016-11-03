import React, { Component } from 'react';
import { Link , Route }  from 'react-router';
import { ProxyMultipleForm } from './_form.jsx';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import ProxyParser from  './_helper.jsx';


export default class ProxyMultipleCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: [],
            proxy_list: []
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        alert("в процессе");
        let proxyList = ProxyParser(this.state.input);
        this.setState({proxy_list: proxyList});
    }

    onChange(key, e) {
        let o = new Object();
        o[key] = e.target.value;
        this.setState(o);
    }

    render() {

        return (
            <div>
                <Breadcrumbs list={[{to: "/", name: "Proxy List"}, {name: "Multiple Proxy"}]} />
                <ProxyMultipleForm onSubmit={this.onSubmit} input={this.state.input} proxy_list={this.state.proxy_list} onChange={this.onChange} />
            </div>
        )
    }

}