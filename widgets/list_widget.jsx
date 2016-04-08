import React from 'react';
import BaseWidget from './widget.jsx'

export default class ListWidget extends BaseWidget {

  constructor() {
    super();
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
