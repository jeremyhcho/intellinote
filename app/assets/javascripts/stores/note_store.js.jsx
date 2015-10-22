(function(root) {
  'use strict';

  var _notes = [], lastDeletedNote, CHANGE_EVENT = "CHANGE",
      ADD_EVENT = "ADD", DELETE_EVENT="DELETE", FETCH_EVENT = "FETCH",
      UPDATE_EVENT = "UPDATE";

  root.NoteStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _notes.slice();
    },

    lastAddedNote: function () {
      return _notes.slice(-1)[0];
    },

    receiveAllNotes: function (notes) {
      _notes = notes;
      this.notesChanged();
      this.notesFetched();
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

    addDeleteHandler: function (handler) {
      this.on(DELETE_EVENT, handler);
    },

    removeDeleteHandler: function (handler) {
      this.removeListener(DELETE_EVENT, handler);
    },

    addAddedHandler: function (handler){
      this.on(ADD_EVENT, handler);
    },

    removeAddedHandler: function (handler) {
      this.removeListener(DELETE_EVENT, handler);
    },

    addNote: function (note) {
      _notes.push(note);
      this.notesChanged();
      this.noteAdded();
    },

    noteAdded: function () {
      this.emit(ADD_EVENT);
    },

    find: function (noteId) {
      var ids = _notes.map(function (note) {
        return note.id;
      });

      var idx = ids.indexOf(noteId);

      if (idx !== -1) {
        return _notes[idx];
      }
    },

    updateNote: function (newNote) {
      var oldNote = this.find(newNote.id);
      var idx = _notes.indexOf(oldNote);

      _notes[idx] = newNote;
      this.notesChanged();
      this.notesUpdated();
    },

    deleteNote: function (note) {
      var noteToDelete = this.find(note.id);
      var idx = _notes.indexOf(noteToDelete);

      lastDeletedNote = _notes.splice(idx, 1)[0];
      this.notesChanged();
      this.noteDeleted();
    },

    lastRemovedNote: function () {
      return lastDeletedNote;
    },

    noteDeleted: function () {
      this.emit(DELETE_EVENT);
    },

    findByNotebook: function (notebookId) {
      return (
        _notes.filter(function (note) {
          return note.notebook_id === notebookId;
        }.bind(this))
      );
    },

    addFetchHandler: function (handler) {
      this.on(FETCH_EVENT, handler);
    },

    removeFetchHandler: function (handler) {
      this.removeListener(FETCH_EVENT, handler);
    },

    notesFetched: function () {
      this.emit(FETCH_EVENT);
    },

    notebookNotes: function (notebook) {
      return (
        _notes.filter(function (note) {
          return note.notebook_id === notebook.id;
        }.bind(this))
      );
    },

    findShortcuts: function () {
      return (
        _notes.filter(function (note) {
          return note.shortcut;
        }.bind(this))
      );
    },

    addUpdateHandler: function (handler) {
      this.on(UPDATE_EVENT, handler);
    },

    removeUpdateHandler: function (handler) {
      this.removeListener(UPDATE_EVENT, handler);
    },

    notesUpdated: function () {
      this.emit(UPDATE_EVENT);
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
