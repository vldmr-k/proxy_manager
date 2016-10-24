import React, { Component } from 'react';
import { Link , Route }  from 'react-router';
import ProxyForm from './_form.jsx';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';


export default class ProxyCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            remote_addr: '',
            remote_port: '',
            local_addr: '',
            local_port: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(name, e) {
        let o = new Object();
        o[name] = e.target.value;
        this.setState(o);
    }

    onSubmit(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <Breadcrumbs list={[{to: "/", name: "Proxy List"}, {name: "Create Proxy"}]} />

                <ProxyForm
                    errors = {this.state.errors}
                    remote_addr={this.state.remote_addr}
                    remote_port={this.state.remote_port}
                    local_addr={this.state.local_addr}
                    local_port={this.state.local_port}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }

}
