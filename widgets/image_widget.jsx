var ImageWidget = React.createClass({
  // mixins: [Widget],

  getInitialState: function() {
    return { image_url: "http://placekitten.com/g/208/258"};
  },

  render: function() {
    return (
      <div className={"image_widget widget w" + this.props.width + " h" + this.props.height}>
        <img src={this.state.image_url} />
      </div>
    );
  }
});
