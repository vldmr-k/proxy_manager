import React, { Component } from 'react';
import RestApi from 'restful-js';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import TagForm from  './_form.jsx';

export  default class TagEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            name: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        RestApi.fetch('/api/tag/' + this.props.params.tag_id).then(response => {
            this.setState({
                name: response.tag.name
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
        RestApi.put('/api/tag/' + this.props.params.tag_id,
            {
                name: this.state.name
            }
        ).then(response => {
                alert("Запись сохранена!")
        }).fail(x => {
            let errors = x.responseJSON.errors;
            alert("Ошибка: \n" + errors.join())
        });
    }


    render() {
        return (
            <div>
                <Breadcrumbs list={[{to: "/tags", name: "Tag List"}, {name: "Edit Tag"}]} />

                <TagForm
                    errors = {this.state.errors}
                    name={this.state.name}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}
