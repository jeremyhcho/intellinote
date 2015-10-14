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
    })
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
    })
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
    })
  },

  fetchAllNotes: function () {
    $.ajax({
      url: "/api/notes",
      type: "GET",
      dataType: "json",
      success: function (notes) {
        NoteActions.resetNotes(notes);
      }
    })
  },

  deleteNote: function (note) {
    $.ajax({
      url: "/api/notes/" + note.id,
      type: "POST",
      data: {_method: "delete", note},
      success: function () {
        NoteActions.deleteNote(note)
      }
    })
  }
};
