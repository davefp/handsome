var TextWidget = React.createClass({
  updateWidget: function() {
    $.ajax({
      url: 'widgets/' + this.props.name + '.json',
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {title: "init", text: "init"};
  },
  componentDidMount: function() {
    this.updateWidget();
    setInterval(this.updateWidget, this.props.pollInterval);
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
