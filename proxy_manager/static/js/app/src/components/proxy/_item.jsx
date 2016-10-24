import React, { Component } from 'react';
import { Link , Route }  from 'react-router';

export default class ProxyItem extends Component {
    render() {
        return (
            <tr className={this.props.is_enabled ? 'success' : 'warning'}>
                <td>{this.props.id}</td>
                <td>{this.props.remote_addr}</td>
                <td>{this.props.remote_ip}</td>
                <td>{this.props.local_addr}</td>
                <td>{this.props.local_ip}</td>
                <td>{this.props.is_enabled ? "Yes" : "No"}</td>
                <td className="text-center">{this.props.last_check_date == null ? "—" : this.props.last_check_date}</td>
                <td className="text-center">
                    <Link className="btn btn-success btn-xs" to={`/proxy/edit/${this.props.id}`}>Edit</Link>&nbsp;|&nbsp;
                    <Link className="btn btn-danger btn-xs" to={`/proxy/delete/${this.props.id}`}>Delete</Link>
                </td>
            </tr>
        )
    }
}