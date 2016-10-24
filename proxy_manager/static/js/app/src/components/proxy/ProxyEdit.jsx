import React, { Component } from 'react';
import RestApi from 'restful-js';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import ProxyForm from  './_form.jsx';

export  default class ProxyEdit extends Component {

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
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        RestApi.fetch('/api/proxy/' + this.props.params.proxy_id).then(response => {
            this.setState({
                remote_addr: response.proxy.remote_addr,
                remote_port: response.proxy.remote_port,
                local_addr: response.proxy.local_addr,
                local_port: response.proxy.local_port
            })
        });
    }

    onChange(name, e) {
        let o = new Object();
        o[name] = e.target.value;
        this.setState(o);
    }

    onSubmit(e) {
        e.preventDefault();

        RestApi.put('/api/proxy/' + this.props.params.proxy_id,
            {
                remote_addr: this.state.remote_addr,
                remote_port: this.state.remote_port,
                local_addr: this.state.local_addr,
                local_port: this.state.local_port
            }
        ).then(response => {
                console.log('response', response);
        });
    }

    render() {
        return (
            <div>
                <Breadcrumbs list={[{to: "/", name: "Proxy List"}, {name: "Edit Proxy"}]} />

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
