var TextWidget = React.createClass({
  mixins: [PollingWidget],

  getInitialState: function() {
    return {title: "init", text: "init"};
  },
  
  render: function() {
    return (
      <div className="helloWorld widget">
        <h1>{this.props.title}</h1>
        <h2>{this.state.text}</h2>
      </div>
    );
  }
});
