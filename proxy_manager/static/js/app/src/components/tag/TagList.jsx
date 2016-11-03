import React, { Component } from 'react';
import RestApi from 'restful-js';
import { Link , Route }  from 'react-router';
import Breadcrumbs from '../breacbrumbs/Breadcrumbs.jsx';
import TagForm from  './_form.jsx';
import TagItem from './_item.jsx';

export  default class TagList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tag_list: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadTagListFromServer = this.loadTagListFromServer.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);

    }

    loadTagListFromServer() {
        RestApi.fetch('/api/tags').then(response => {
            this.setState({"tag_list": response.tags});
        });
    }

    componentDidMount() {
        this.loadTagListFromServer()
    }

    onClickDelete(proxy_id) {
        let that = this
        let response = prompt("Вы подтверждаете удаление? Если да, напишите: yes");
        if(response === 'yes') {
            RestApi.destroy('/api/tag/' + proxy_id).then(response => {
                this.loadTagListFromServer()
            })
        }
    }

    render() {

        let tag_list = [];

        this.state.tag_list.forEach((item, i) => {
            tag_list.push((
                <TagItem
                    key={i}
                    id={item.id}
                    name={item.name}
                    onClickDelete={this.onClickDelete}
                />
            ));
        })

        return (
            <div>
                <Breadcrumbs list={[{name: "Tag List"}]} />
                <Link className="btn btn-success btn-xs" to="/tag/create">Create</Link>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style={{width: 40}}>ID</th>
                        <th>Name</th>
                        <th style={{width: 150}}></th>
                    </tr>
                    </thead>
                    <tbody>
                        {tag_list}
                    </tbody>
                </table>
            </div>
        )
    }


}