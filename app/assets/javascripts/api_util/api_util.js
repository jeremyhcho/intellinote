var ApiUtil = {
  fetchCurrentUser: function () {
    $.ajax({
      url: "/api/logins/find",
      type: "GET",
      dataType: "json",
      success: function (user) {
        LoginActions.addCurrentUser(user);
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
        newNote.body = JSON.parse(newNote.body);
        NoteActions.addNote(newNote);
        ResponseActions.addResponse(["Note Add Success", newNote.message]);
      }
    });
  },

  updateNote: function (note) {
    $.ajax({
      url: "/api/notes/" + note.id,
      type: "PATCH",
      data: {note: note},
      dataType: "json",
      success: function (newNote) {
        newNote.body = JSON.parse(newNote.body);
        NoteActions.updateNote(newNote);
        ResponseActions.addResponse(["Note Update Success", newNote.message]);
      }
    });
  },

  fetchAllNotes: function () {
    $.ajax({
      url: "/api/notes",
      type: "GET",
      dataType: "json",
      success: function (notes) {
        notes = notes.map(function (note) {
          note.body = JSON.parse(note.body);
          return note;
        });

        NoteActions.resetNotes(notes);
      }
    });
  },

  deleteNote: function (note) {
    $.ajax({
      url: "/api/notes/" + note.id,
      type: "DELETE",
      success: function (delNote) {
        NoteActions.deleteNote(delNote);
      }
    });
  },

  fetchAllNotebooks: function () {
    $.ajax({
      url: "/api/notebooks",
      type: "GET",
      dataType: "json",
      success: function (notebooks) {
        notebooks = notebooks.map(function (notebook) {
          notebook.notes.map(function (note) {
            note.body = JSON.parse(note.body);
            return note.body;
          });

          return notebook;
        })

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
      },

      error: function (error) {
        ResponseActions.addResponse(["Notebook Add Error", error.responseText]);
      }
    });
  },

  deleteNotebook: function (notebook) {
    $.ajax({
      url: "/api/notebooks/" + notebook.id,
      type: "DELETE",
      success: function (delNotebook) {
        NotebookActions.deleteNotebook(delNotebook);
        ResponseActions.addResponse(["Notebook Delete Success", delNotebook.message]);
      },

      error: function (error) {
        ResponseActions.addResponse(["Notebook Delete Fail", error.responseText]);
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
  },

  addShortcut: function (note) {
    note.shortcut = true;

    $.ajax({
      url: "/api/notes/" + note.id,
      type: "PATCH",
      data: {note: note},
      dataType: "json",
      success: function (updatedNote) {
        NoteActions.updateNote(updatedNote);
        ResponseActions.addResponse(["Note Update Success", updatedNote.message]);
      }
    });
  },

  removeShortcut: function (note) {
    note.shortcut = false;

    $.ajax({
      url: "/api/notes/" + note.id,
      type: "PATCH",
      data: {note: note},
      dataType: "json",
      success: function (updatedNote) {
        NoteActions.updateNote(updatedNote);
        ResponseActions.addResponse(["Note Update Success", updatedNote.message]);
      }
    });
  },

  fetchAllMessages: function () {
    $.ajax({
      url: "/api/messages",
      type: "GET",
      dataType: "json",
      success: function (messages) {
        MessageActions.resetMessages(messages);
      }
    });
  },

  sendMessage: function (message) {
    $.ajax({
      url: "/api/messages",
      type: "POST",
      dataType: "json",
      data: {message: message},
      success: function (newMessage) {
        MessageActions.addMessage(newMessage);
      }.bind(this)
    });
  }
};
