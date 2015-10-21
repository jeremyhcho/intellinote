var NotebookDetail = React.createClass({
  getInitialState: function() {
    return {
      notes: []
    };
  },

  componentDidMount: function() {
    NoteStore.addAddedHandler(this._onAdd);
    NoteStore.addDeleteHandler(this._onDelete);
    NoteStore.addFetchHandler(this._onFetch);
    ApiUtil.fetchAllNotes();
  },

  componentWillUnmount: function () {
    NoteStore.removeAddedHandler(this._onAdd);
    NoteStore.removeDeleteHandler(this._onDelete);
    NoteStore.removeFetchHandler(this._onFetch);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({notes: newProps.notebook.notes});
  },

  _onFetch: function () {
    this.setState({notes: NoteStore.notebookNotes(this.props.notebook)});
  },

  _onAdd: function () {
    var note = NoteStore.lastAddedNote();

    if (this.props.notebook.id === note.notebook_id) {
      this.props.notebook.notes.push(note);
      this.props.showNotebookDetail.call(null, this.props.notebook);
    }
  },

  _onDelete: function () {
    var deletedNote = NoteStore.lastRemovedNote();
    var notebookToUpdate = NotebookStore.find(deletedNote.notebook_id);
    var replacementNotes = NoteStore.findByNotebook(notebookToUpdate.id);

    notebookToUpdate.notes = replacementNotes;
    this.props.showNotebookDetail.call(null, notebookToUpdate);
  },

  render: function() {
    var user = LoginStore.returnUser();

    return (
      <div className="notebook-detail">
        <div className="upper-detail">
          <h1>{this.props.notebook.title}</h1>
          <p>Created by {user.extract.username}</p>
        </div>

        <ul>
          {
            typeof this.state.notes[0] === "undefined" ? (
              <li className="no-notes">
                <div onClick={this.props.addNote.bind(null, this.props.notebook)}
                     className="add-note"></div>
                <h1>Start adding notes!</h1>
              </li>
            ) : (
              this.state.notes.map(function (note) {
                return <NoteIndexItem key={note.id}
                                      note={note}
                                      updateNote={this.props.updateNote} />
              }.bind(this))
            )
          }
        </ul>
      </div>
    );
  }
});
