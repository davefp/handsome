var TextWidget = React.createClass({
  mixins: [Widget],

  getInitialState: function() {
    return {title: "init", text: "init"};
  },

  render: function() {
    return (
      <div className={"text_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <h2>{this.state.text}</h2>
      </div>
    );
  }
});
