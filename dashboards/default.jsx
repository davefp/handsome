React.render(
  <div id="dashboard">
    <NumberWidget name="number" title="Number" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <NumberWidget name="number" title="Number" />
    <ImageWidget name="kitten" title="Kitten" />
    <ListWidget name="top_subreddits" title="Most Popular Subreddits" />
  </div>,
  document.getElementById('content')
);

$("#dashboard").packery({
  itemSelector: ".widget",
  gutter: 10
});
