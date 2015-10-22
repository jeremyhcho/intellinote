var TagIndexItem = React.createClass({
  render: function() {
    return (
      <li className="tag-item">{this.props.tag.name}</li>
    );
  }
});
