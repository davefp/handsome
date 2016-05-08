import React from 'react';
import BaseWidget from './widget.jsx';

import './list_widget.scss';

export default class ListWidget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {title: "init", list: ["init"]};
  }

  render() {
    var list = this.state.list.map(function (item) {
      return (
        <li key={item}>
          {item}
        </li>
      );
    });
    return (
      <div className={"list_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}
