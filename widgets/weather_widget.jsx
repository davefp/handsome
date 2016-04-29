import React from 'react';
import BaseWidget from './widget.jsx';

export default class WeatherWidget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {title: "Weather", temp: '0', unit: 'c', text: 'unknown'};
  }

  render() {
    return (
      <div className={"weather_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <div className='temperature'>{this.state.temp}&deg;{this.state.unit.toUpperCase()}</div>
        <div className='condition'>{this.state.text}</div>
      </div>
    );
  }
}
