var NumberWidget = React.createClass({
  mixins: [Widget],

  getDefaultProps: function() {
    return {formatString: '0.00a'};
  },

  getInitialState: function() {
    return {title: "init", number: 0};
  },

  render: function() {
    return (
      <div className={"number_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <div className='number'>{numeral(this.state.number).format(this.props.formatString)}</div>
      </div>
    );
  }
});
