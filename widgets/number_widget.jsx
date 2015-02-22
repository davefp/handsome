var NumberWidget = React.createClass({
  mixins: [Widget],

  getInitialState: function() {
    return {title: "init", number: 0};
  },

  render: function() {
    return (
      <div className={"number_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <div className='number'>{numeral(this.state.number).format('000a')}</div>
      </div>
    );
  }
});
