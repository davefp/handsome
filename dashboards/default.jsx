React.render(
  <div id="dashboard">
    <TextWidget name="hello" title="Hello" />
    <NumberWidget name="number" title="Number" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <NumberWidget name="number" title="Number" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <TextWidget name="hello" title="Hello" />
    <ImageWidget name="kitten" title="Kitten" />
    <TextWidget name="hello" title="Hello" />
  </div>,
  document.getElementById('content')
);

$("#dashboard").packery({
  itemSelector: ".widget",
  gutter: 10
});
