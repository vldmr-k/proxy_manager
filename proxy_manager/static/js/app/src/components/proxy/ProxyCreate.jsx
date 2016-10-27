import React, { Component } from 'react';
import { Link , Route }  from 'react-router';
import { ProxyForm } from './_form.jsx';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import RestApi from 'restful-js';

export default class ProxyCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            suggestions: [],
            selected_tags: [],
            remote_addr: '',
            remote_port: '',
            local_addr: '',
            local_port: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onHandleTagInputChange = this.onHandleTagInputChange.bind(this);
        this.onHandleDeleteTag = this.onHandleDeleteTag.bind(this);
        this.onHandleAdditionTag = this.onHandleAdditionTag.bind(this)
    }

    onChange(name, e) {
        let o = new Object();
        o[name] = e.target.value;
        this.setState(o);
    }

    onSubmit(e) {
        e.preventDefault();

        RestApi.post('/api/proxy',
            {
                remote_addr: this.state.remote_addr,
                remote_port: this.state.remote_port,
                local_addr: this.state.local_addr,
                local_port: this.state.local_port
            }
        ).then(response => {
                alert("Запись сохранена!")
        }).fail(x => {
            let errors = x.responseJSON.errors;
            alert("Ошибка: \n" + errors.join())
        });
    }

    onHandleTagInputChange(input) {
        RestApi.fetch('/api/tag/suggest/' + input).then(response => {
            this.setState({suggestions: response.tags});
        })
    }

    onHandleDeleteTag(i) {
        let tags = this.state.selected_tags;
        tags.splice(i, 1);
        this.setState({selected_tags: tags});
    }

    onHandleAdditionTag(tag) {
        let tags = this.state.selected_tags;
        tags.push({
            id: tag.id,
            name: tag.name
        });
        this.setState({selected_tags: tags});
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
                    tags={this.state.selected_tags}
                    suggestions={this.state.suggestions}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onHandleDeleteTag={this.onHandleDeleteTag}
                    onHandleAdditionTag={this.onHandleAdditionTag}
                    onHandleTagInputChange={this.onHandleTagInputChange}
                />
            </div>
        );
    }

}
