import React, { Component } from 'react';
import RestApi from 'restful-js';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import { ProxyForm } from  './_form.jsx';

export  default class ProxyEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            remote_addr: '',
            remote_port: '',
            local_addr: '',
            local_port: '',
            selected_tags: [],
            suggestions: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onHandleDeleteTag = this.onHandleDeleteTag.bind(this);
        this.onHandleAdditionTag = this.onHandleAdditionTag.bind(this);
        this.onHandleTagInputChange = this.onHandleTagInputChange.bind(this);
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

    componentDidMount() {
        RestApi.fetch('/api/proxy/' + this.props.params.proxy_id).then(response => {
            this.setState({
                remote_addr: response.proxy.remote_addr,
                remote_port: response.proxy.remote_port,
                local_addr: response.proxy.local_addr,
                local_port: response.proxy.local_port,
                selected_tags: response.tags
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
                local_port: this.state.local_port,
                tags: this.state.selected_tags
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
                <Breadcrumbs list={[{to: "/", name: "Proxy List"}, {name: "Edit Proxy"}]} />

                <ProxyForm
                    errors = {this.state.errors}
                    remote_addr={this.state.remote_addr}
                    remote_port={this.state.remote_port}
                    local_addr={this.state.local_addr}
                    local_port={this.state.local_port}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    tags={this.state.selected_tags}
                    suggestions={this.state.suggestions}
                    onHandleDeleteTag={this.onHandleDeleteTag}
                    onHandleAdditionTag={this.onHandleAdditionTag}
                    onHandleTagInputChange={this.onHandleTagInputChange}
                />
            </div>
        );
    }
}
