React.render(
  <div id="dashboard">
    <TextWidget name="hello" title="Hello" />
    <TextWidget name="number" title="Number" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <TextWidget name="number" title="Number" />
    <TextWidget name="reddit_headline" title="Top Reddit Post" width="2" />
    <TextWidget name="hello" title="Hello" />
    <TextWidget name="number" title="Number" />
    <TextWidget name="hello" title="Hello" />
  </div>,
  document.getElementById('content')
);

$("#dashboard").packery({
  itemSelector: ".widget",
  gutter: 10
});
