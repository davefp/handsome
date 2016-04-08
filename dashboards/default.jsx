ReactDOM.render(
  <div id="dashboard">
    <NumberWidget name="reddit_score" title="Score" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <ListWidget name="top_subreddits" title="Most Popular Subreddits" height="2" />
    <ImageWidget name="kitten" title="Kitten" />
  </div>,
  document.getElementById('content')
);

$("#dashboard").packery({
  itemSelector: ".widget",
  gutter: 10
});
