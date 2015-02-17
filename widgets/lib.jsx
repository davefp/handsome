var PollingWidget = {

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

  componentDidMount: function() {
    this.updateWidget();
    setInterval(this.updateWidget, this.props.pollInterval);
  }
};
