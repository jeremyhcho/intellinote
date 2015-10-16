var NotebookDropdownItem = React.createClass({
  render: function() {
    return (
      <li onClick={this.props.handleClick.bind(null, this.props.notebook)}>
        {this.props.notebook.title}
      </li>
    );
  }
});
