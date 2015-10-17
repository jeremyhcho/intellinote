var ShortcutIndexItem = React.createClass({
  handleClick: function () {
    this.props.updateNote.call(null, this.props.shortcut);
  },

  toggleShortcut: function (e) {
    e.stopPropagation();
    ApiUtil.addShortcut(this.props.shortcut);
  },

  render: function() {
    return (
      <li onClick={this.handleClick} className="shortcuts-item">
        <span className="black-note"></span>&nbsp;&nbsp;
        {this.props.shortcut.title}
        <span onClick={this.toggleShortcut} className="black-close"></span>
      </li>
    );
  }
});
