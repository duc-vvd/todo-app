import React, { Component } from 'react';
import classNames from 'classnames';
import './TodoItem.css';

export default class TodoItem extends Component {
    render() {
        const { item, onItemClicked } = this.props
        return(
            <div onClick={onItemClicked} className={classNames("TodoItem", {"TodoItem-complete": item.isComplete})}>
                <p className="TodoItem-title">{item.title}</p>
            </div>
        );
    }
}