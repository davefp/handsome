var ListWidget = React.createClass({
  mixins: [Widget],

  getInitialState: function() {
    return {title: "init", list: "init"};
  },

  render: function() {
    var list = this.state.list;
    return (
      <div className={"text_widget widget w" + this.props.width + " h" + this.props.height}>
        <h1>{this.props.title}</h1>
        <ul>
          {list.map(function(item) {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
});
