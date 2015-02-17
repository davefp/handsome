React.render(
  <div>
    <TextWidget name="hello" title="Hello" pollInterval={1000} />
    <TextWidget name="number" title="Number" pollInterval={1000} />
  </div>,
  document.getElementById('content')
);
