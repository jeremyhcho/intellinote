var NoteIndex = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.all()
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeHandler(this._onChange);
    ApiUtil.fetchAllNotes();
  },

  _onChange: function () {
    this.setState({notes: NoteStore.all()});
  },

  render: function() {
    return (
      <div className="note-index">
        <h1>NOTES</h1>
        <ul className="notes-ul">
          {
            this.state.notes.map(function (note) {
              return <NoteIndexItem key={note.id} note={note} updateNote={this.props.updateNote} />
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});
