var ShortcutsIndex = React.createClass({
  render: function() {
    return (
      <ul>
        {
          this.props.shortcuts.map(function (shortcut) {
            return <ShortcutIndexItem key={shortcut.id} shortcut={shortcut} />;
          })
        }
      </ul>
    );
  }
});
