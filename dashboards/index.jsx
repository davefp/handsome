import React from 'react';
import ReactDOM from 'react-dom';
import Packery from 'packery';
import ImageWidget from 'widgets/image_widget';
import ListWidget from 'widgets/list_widget';
import NumberWidget from 'widgets/number_widget';
import TextWidget from 'widgets/text_widget';

import "styles/default.scss";

ReactDOM.render(
  <div id="dashboard">
    <NumberWidget name="reddit_score" title="Score" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <ListWidget name="top_subreddits" title="Most Popular Subreddits" height="2" />
    <ImageWidget name="kitten" title="Kitten" image_url="http://placekitten.com/g/208/258" />
  </div>,
  document.getElementById('content')
);

new Packery("#dashboard", {itemSelector: ".widget", gutter: 10});
