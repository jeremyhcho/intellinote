var NotebookDetail = React.createClass({
  componentDidMount: function() {
    NoteStore.addAddedHandler(this._onAdd);
    NoteStore.addDeleteHandler(this._onDelete);
    ApiUtil.fetchAllNotes();
  },

  _onAdd: function () {
    var notebook = ApiUtil.retrieveNotebookDetail(this.props.notebook);
    var note = NoteStore.lastAddedNote();

    if (notebook.id === note.notebook_id) {
      notebook.notes.push(note);
      this.props.showNotebookDetail.call(null, notebook);
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
    var notes = [];

    if (typeof this.props.notebook.notes !== "undefined") {
      notes = this.props.notebook.notes;
    }

    return (
      <div className="notebook-detail">
        <div className="upper-detail">
          <h1>{this.props.notebook.title}</h1>
          <p>Created by {user.extract.username}</p>
        </div>

        <ul>
          {
            typeof notes[0] === "undefined" ? (
              <li className="no-notes">
                <div onClick={this.props.addNote.bind(null, this.props.notebook)}
                     className="add-note"></div>
                <h1>Start adding notes!</h1>
              </li>
            ) : (
              notes.map(function (note) {
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
