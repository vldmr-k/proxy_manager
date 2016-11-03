import React, { Component } from 'react';
import { Link , Route }  from 'react-router';
import ReactTags from 'react-tag-autocomplete';


export default class TagForm extends Component {
    constructor(props) {
        super(props);

        this.propType = {
            errors: React.PropTypes.array.isRequired,
            onChange: React.PropTypes.func.isRequired,
            onSubmit: React.PropTypes.func.isRequired,
            name: React.PropTypes.string,
        }

    }

    render() {

        return (
            <form method="post" onSubmit={this.props.onSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="remote_addr"
                                type="text"
                                className="form-control"
                                placeholder="120.0.0.1"
                                value={this.props.name}
                                onChange={this.props.onChange.bind(this, 'name')}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Сохранить</button>
                </div>
            </form>
        );
    }
}