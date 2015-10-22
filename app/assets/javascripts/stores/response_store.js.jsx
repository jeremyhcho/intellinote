(function(root) {
  'use strict';

  var _responses = {}, NOTEBOOK_ADD_ERROR = "NOTEBOOK_ADD_ERROR",
    NOTEBOOK_DELETE_SUCCESS = "NOTEBOOK_DELETE_SUCCESS",
    NOTEBOOK_DELETE_FAIL = "NOTEBOOK_DELETE_FAIL",
    NOTE_ADD_SUCCESS = "NOTE_ADD_SUCCESS", NOTE_UPDATE_SUCCESS = "NOTE_UPDATE_SUCCESS",
    NOTE_ADD_FAIL = "NOTE_ADD_FAIL";

  root.ResponseStore = $.extend({}, EventEmitter.prototype, {
    addResponse: function (type, msg) {
      _responses[type] = [msg];

      switch (type) {
        case "Notebook Add Error":
          this.notebookErrorsChanged();
          break;
        case "Notebook Delete Success":
          this.notebookDeleteSuccess();
          break;
        case "Notebook Delete Fail":
          this.notebookDeleteFail();
          break;
        case "Note Add Success":
          this.noteAddSuccess();
          break;
        case "Note Update Success":
          this.noteUpdateSuccess();
          break;
        case "Note Add Fail":
          this.noteAddFail();
          break;
      }
    },

    addNoteAddSuccessHandler: function (handler) {
      this.on(NOTE_ADD_SUCCESS, handler);
    },

    removeNoteAddSuccessHandler: function (handler) {
      this.removeListener(NOTE_ADD_SUCCESS, handler);
    },

    addNoteAddFailHandler: function (handler) {
      this.on(NOTE_ADD_FAIL, handler);
    },

    removeNoteAddFailHandler: function (handler) {
      this.removeListener(NOTE_ADD_FAIL, handler);
    },

    addNotebookDeleteSuccessHandler: function (handler) {
      this.on(NOTEBOOK_DELETE_SUCCESS, handler);
    },

    removeNotebookDeleteSuccessHandler: function () {
      this.removeListener(NOTEBOOK_DELETE_SUCCESS);
    },

    addNotebookDeleteFailHandler: function (handler) {
      this.on(NOTEBOOK_DELETE_FAIL, handler);
    },

    removeNotebookDeleteFailHandler: function (handler) {
      this.removeListener(NOTEBOOK_DELETE_FAIL, handler);
    },

    addNoteUpdateSuccessHandler: function (handler) {
      this.on(NOTE_UPDATE_SUCCESS, handler);
    },

    removeNoteUpdateSuccessHandler: function (handler) {
      this.removeListener(NOTE_UPDATE_SUCCESS, handler);
    },

    noteUpdateSuccess: function () {
      this.emit(NOTE_UPDATE_SUCCESS);
    },

    notebookDeleteSuccess: function () {
      this.emit(NOTEBOOK_DELETE_SUCCESS);
    },

    notebookDeleteFail: function () {
      this.emit(NOTEBOOK_DELETE_FAIL);
    },

    notebookErrorsChanged: function () {
      this.emit(NOTEBOOK_ADD_ERROR);
    },

    noteAddSuccess: function () {
      this.emit(NOTE_ADD_SUCCESS);
    },

    noteAddFail: function () {
      this.emit(NOTE_ADD_FAIL);
    },

    findNoteAddFail: function () {
      return _responses["Note Add Fail"];
    },

    findNoteAddSuccess: function () {
      return _responses["Note Add Success"];
    },

    findNoteUpdateSuccess: function () {
      return _responses["Note Update Success"];
    },

    findNotebookErrors: function () {
      return _responses["Notebook Add Error"];
    },

    findNotebookDeleteFail: function () {
      return _responses["Notebook Delete Fail"];
    },

    findNotebookDeleteSuccess: function () {
      return _responses["Notebook Delete Success"];
    },

    addNotebookErrorHandler: function (handler) {
      this.on(NOTEBOOK_ADD_ERROR, handler);
    },

    removeNotebookErrorHandler: function (handler) {
      this.removeListener(NOTEBOOK_ADD_ERROR, handler);
    }
  });

  AppDispatcher.register(function (action) {
    switch (action.actionType) {
      case ResponseConstants.ADD_RESPONSE:
        ResponseStore.addResponse(action.type, action.message);
        break;
    }
  });
}(this));
