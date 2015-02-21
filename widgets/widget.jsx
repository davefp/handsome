var Widget = {

  timeout_id: null,

  getDefaultProps: function() {
    return {
      width: 1,
      height: 1
    };
  },

  updateWidget: function() {
    $.ajax({
      url: 'widgets/' + this.props.name + '.json',
      dataType: 'json',
      success: function(data) {
        this.setState(data['payload']);
        this.reschedule(data['updates_in_millis']);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.reschedule(1000);
      }.bind(this)
    });
  },

  reschedule: function(interval) {
    console.log(interval)
    if(this.timeout_id) {
      clearTimeout(this.timeout_id)
      this.timeout_id = null;
    }
    if(interval < 1000) { interval = 1000; }
    this.timeout_id = setTimeout(this.updateWidget, interval)
  },

  componentDidMount: function() {
    this.updateWidget();
  }
};
