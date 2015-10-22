var ShortcutIndexItem = React.createClass({
  handleClick: function () {
    this.props.updateNote.call(null, this.props.shortcut);
  },

  removeShortcut: function (e) {
    e.stopPropagation();
    ApiUtil.removeShortcut(this.props.shortcut);
  },

  render: function() {
    return (
      <li onClick={this.handleClick} className="shortcuts-item">
        <span className="black-note"></span>&nbsp;&nbsp;
        {this.props.shortcut.title}
        <span onClick={this.removeShortcut} className="black-close"></span>
      </li>
    );
  }
});
