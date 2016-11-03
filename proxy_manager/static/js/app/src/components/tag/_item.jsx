import React, { Component } from 'react';
import { Link , Route }  from 'react-router';

export default class TagItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td className="text-center">
                    <Link className="btn btn-success btn-xs" to={`/tag/edit/${this.props.id}`}>Edit</Link>&nbsp;|&nbsp;
                    <button className="btn btn-danger btn-xs" onClick={this.props.onClickDelete.bind(this, this.props.id)}>Delete</button>
                </td>
            </tr>
        )
    }
}