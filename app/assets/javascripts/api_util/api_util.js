var ApiUtil = {
  fetchCurrentUser: function () {
    $.ajax({
      url: "/api/logins/find",
      type: "GET",
      dataType: "json",
      success: function (user) {
        LoginActions.addCurrentUser(user);
      },
      error: function () {
        return false;
      }
    });
  },

  logUserOut: function (user) {
    $.ajax({
      url: "/session",
      type: "POST",
      data: {_method: 'delete'},
      success: function () {
        window.location = "/";
        NoteStore.receiveAllNotes([]);
        LoginAction.removeCurrentUser(user);
      },

      error: function (e) {
      }
    });
  },

  addNote: function (note) {
    $.ajax({
      url: "/api/notes",
      type: "POST",
      data: {note: note},
      dataType: "json",
      success: function (newNote) {
        NoteActions.addNote(newNote);
      }
    });
  },

  updateNote: function (note) {
    $.ajax({
      url: "/api/notes/" + note.id,
      type: "PATCH",
      data: {note: note},
      dataType: "json",
      success: function () {
        NoteActions.updateNote(note);
      }
    });
  },

  fetchAllNotes: function () {
    $.ajax({
      url: "/api/notes",
      type: "GET",
      dataType: "json",
      success: function (notes) {
        NoteActions.resetNotes(notes);
      }
    });
  },

  deleteNote: function (note) {
    $.ajax({
      url: "/api/notes/" + note.id,
      type: "POST",
      data: {_method: "delete", note},
      success: function () {
        NoteActions.deleteNote(note);
      }
    });
  },

  fetchAllNotebooks: function () {
    $.ajax({
      url: "/api/notebooks",
      type: "GET",
      dataType: "json",
      success: function (notebooks) {
        NotebookActions.receiveAllNotebooks(notebooks);
      }
    });
  },

  addNotebook: function (notebook) {
    $.ajax({
      url: "/api/notebooks",
      type: "POST",
      data: {notebook: notebook},
      success: function (newNotebook) {
        NotebookActions.addNotebook(newNotebook);
      }
    });
  },

  deleteNotebook: function (notebook) {
    $.ajax({
      url: "/api/notebooks/" + notebook.id,
      type: "POST",
      data: {_method: "delete", notebook: notebook},
      success: function (delNotebook) {
        NotebookActions.deleteNotebook(delNotebook);
      }
    });
  },

  retrieveNotebookDetail: function (notebook) {
    $.ajax({
      url: "/api/notebooks/" + notebook.id,
      type: "GET",
      data: {notebook: notebook},
      success: function (newNotebook) {
        notebook = newNotebook;
      }.bind(this)
    });

    return notebook;
  },

  addShortcut: function (note) {
    note.shortcut = !note.shortcut;

    $.ajax({
      url: "/api/notes/" + note.id,
      type: "PATCH",
      data: {note: note},
      dataType: "json",
      success: function (note) {
        NoteActions.updateNote(note);
      }
    });
  }
};
