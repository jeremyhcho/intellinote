var NoteActions = {
  addNote: function (note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.CREATE_NOTE,
      note: note
    });
  },

  resetNotes: function (notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.RESET_NOTES,
      notes: notes
    });
  },

  updateNote: function (note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.UPDATE_NOTE,
      note: note
    });
  },

  deleteNote: function (note) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.DELETE_NOTE,
      note: note
    });
  }
};
