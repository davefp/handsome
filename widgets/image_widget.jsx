import React from 'react';
import BaseWidget from './widget.jsx'

export default class ImageWidget extends BaseWidget {

  constructor() {
    super();
    this.state =  {image_url: "http://placekitten.com/g/208/258"};
  }

  render() {
    return (
      <div className={"image_widget widget w" + this.props.width + " h" + this.props.height}>
        <img src={this.state.image_url} />
      </div>
    );
  }
}
