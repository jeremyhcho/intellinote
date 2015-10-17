var Shortcuts = React.createClass({
  getInitialState: function() {
    return {
      shortcuts: NoteStore.findShortcuts()
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function () {
    NoteStore.removeChangeHandler(this._onChange);
  },

  _onChange: function () {
    this.setState({shortcuts: NoteStore.findShortcuts()});
  },

  render: function() {
    return (
      <div className="shortcuts-index">
        <div className="upper-shortcuts-index">
          <h1>SHORTCUTS</h1>
        </div>

        <div className="shortcuts-list-div">
          <ShortcutsIndex updateNote={this.props.updateNote} shortcuts={this.state.shortcuts}/>
        </div>
      </div>
    );
  }
});
