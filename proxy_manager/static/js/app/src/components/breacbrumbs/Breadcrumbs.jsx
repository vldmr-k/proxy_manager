import React, { Component } from 'react';
import { Link , Route }  from 'react-router';

export default class Breadcrumbs extends Component {

    render() {
        let items = [];

        this.props.list.unshift({to: '/', name: "Home"});

        this.props.list.forEach((item, i) => {
            if(!item.hasOwnProperty('to')) {
                items.push((
                    <li  key={i} className="active">{item.name}</li>
                ))
            } else {
                items.push((
                    <li key={i}><Link to={item.to}>{item.name}</Link></li>
                ))
            }
        });

        return (
            <ol className="breadcrumb">
                {items}
            </ol>
        )
    }
}