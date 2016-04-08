import React from 'react';
import BaseWidget from './widget.jsx'
import Numeral from 'numeral';

export default class NumberWidget extends BaseWidget {

  constructor() {
    super();
    this.state = {title: "init", number: 0};
  }

  render() {
    return (
      <div className={"number_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <div className='number'>{Numeral(this.state.number).format(this.props.formatString)}</div>
      </div>
    );
  }
}

NumberWidget.defaultProps = {formatString: '0.[00]a'};
