import React, { Component } from 'react';
import ProxyItem from './_item.jsx';
import RestApi from 'restful-js';
import { Link , Route }  from 'react-router';

export default class ProxyList extends Component {

    constructor() {
        super()
        this.state = {
            proxy_list: []
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        RestApi.fetch('/api/proxies').then(response => {

            this.setState({"proxy_list": response.proxies});
        });
    }

    render() {

        let proxy_list = [];

        this.state.proxy_list.forEach((item, i) => {
            proxy_list.push((
                <ProxyItem
                    key={i}
                    id={item.id}
                    remote_addr={item.remote_addr}
                    remote_ip={item.remote_port}
                    local_addr={item.local_addr}
                    local_ip={item.local_port}
                    is_enabled={item.is_enabled}
                    last_ckeck_date={item.last_check_date}
                />
            ));
        })

        return (
            <div>
                <ol className="breadcrumb">
                  <li><Link to="/">Home</Link></li>
                  <li class="active">Proxy List</li>
                </ol>
                <Link className="btn btn-success btn-xs" to="/proxy/create">Create</Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Remote Addr</th>
                        <th>Remote Port</th>
                        <th>Local Addr</th>
                        <th>Local Port</th>
                        <th>Enabled</th>
                        <th>Last Check Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {proxy_list}
                    </tbody>
                </table>
            </div>
        );
    }
}
