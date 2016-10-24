import React, { Component } from 'react';
import { Link , Route }  from 'react-router';

export default class ProxyForm extends Component {
    constructor(props) {
        super(props);

        this.propType = {
            errors: React.PropTypes.array.isRequired,
            onChange: React.PropTypes.func.isRequired,
            onSubmit: React.PropTypes.func.isRequired,
            remote_addr: React.PropTypes.string,
            remote_port: React.PropTypes.number,
            local_addr: React.PropTypes.string,
            local_port: React.PropTypes.number,
        }
    }

    render() {
        console.log('props',this.props);
        return (
            <form method="post" onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label htmlFor="remote_addr" >Remote Addr</label>
                    <input
                        id="remote_addr"
                        type="text"
                        className="form-control"
                        placeholder="120.0.0.1"
                        value={this.props.remote_addr}
                        onChange={this.props.onChange.bind(this, 'remote_addr')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="remote_port" >Remote Port</label>
                    <input
                        type="text"
                        className="form-control"
                        id="remote_port"
                        placeholder="8080" value={this.props.remote_port}
                        onChange={this.props.onChange.bind(this, 'remote_port')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="local_addr" >Local Addr</label>
                    <input
                        type="text"
                        className="form-control"
                        id="local_addr"
                        placeholder="120.0.0.1"
                        value={this.props.local_addr}
                        onChange={this.props.onChange.bind(this, 'local_addr')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="local_port" >Local Port</label>
                    <input
                        type="text"
                        className="form-control"
                        id="local_port"
                        placeholder="8080"
                        value={this.props.local_port}
                        onChange={this.props.onChange.bind(this, 'local_port')}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Сохранить</button>
                </div>
            </form>
        );
    }
}