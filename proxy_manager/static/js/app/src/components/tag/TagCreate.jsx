import React, { Component } from 'react';
import { Link , Route }  from 'react-router';
import TagForm from './_form.jsx';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import RestApi from 'restful-js';

export default class TagCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            name: ''
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

        RestApi.post('/api/tag',
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
                <Breadcrumbs list={[{to: "/tags", name: "Tag List"}, {name: "Create Tag"}]} />

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
