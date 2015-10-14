(function(root) {
  'use strict';

  var _notes = [], CHANGE_EVENT = "CHANGE";
  root.NoteStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _notes.slice();
    },

    receiveAllNotes: function (notes) {
      _notes = notes;
      this.notesChanged();
    },

    notesChanged: function () {
      this.emit(CHANGE_EVENT);
    },

    addChangeHandler: function (handler) {
      this.on(CHANGE_EVENT, handler);
    },

    removeChangeHandler: function (handler) {
      this.removeListener(CHANGE_EVENT, handler);
    },

    addNote: function (note) {
      _notes.push(note);
      this.notesChanged();
    },

    find: function (noteId) {
      var ids = _notes.map(function (note) {
        return note.id;
      });

      var idx = ids.indexOf(noteId);

      if (idx !== -1) {
        return _notes[idx]
      }
    },

    updateNote: function (newNote) {
      var oldNote = this.find(newNote.id);
      var idx = _notes.indexOf(oldNote);

      _notes[idx] = newNote;
      this.notesChanged();
    },

    deleteNote: function (note) {
      var noteToDelete = this.find(note.id);
      var idx = _notes.indexOf(noteToDelete);

      _notes.splice(idx, 1);
      this.notesChanged();
    }
  });

  AppDispatcher.register(function (action) {
    switch (action.actionType) {
      case NoteConstants.CREATE_NOTE:
        NoteStore.addNote(action.note);
        break;
      case NoteConstants.RESET_NOTES:
        NoteStore.receiveAllNotes(action.notes);
        break;
      case NoteConstants.UPDATE_NOTE:
        NoteStore.updateNote(action.note);
        break;
      case NoteConstants.DELETE_NOTE:
        NoteStore.deleteNote(action.note);
        break;
    }
  });
}(this));
