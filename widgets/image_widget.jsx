import React from 'react';
import BaseWidget from './widget.jsx';

import './image_widget.scss';

export default class ImageWidget extends BaseWidget {

  updateWidget() {
    // no-op since this is a static image
    return;
  }

  render() {
    return (
      <div className={"image_widget widget w" + this.props.width + " h" + this.props.height}>
        <img src={this.props.image_url} />
      </div>
    );
  }
}

ImageWidget.defaultProps.image_url = "http://placehold.it/208x258"
