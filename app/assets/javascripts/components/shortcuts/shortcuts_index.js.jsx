var ShortcutsIndex = React.createClass({
  render: function() {
    return (
      <ul>
        {
          this.props.shortcuts.map(function (shortcut) {
            return <ShortcutIndexItem updateNote={this.props.updateNote} key={shortcut.id} shortcut={shortcut} />;
          }.bind(this))
        }
      </ul>
    );
  }
});
