(function(root) {
  'use strict';

  var _notebooks = [], CHANGE_EVENT = "CHANGE";
  root.NotebookStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _notebooks.slice();
    },

    addChangeHandler: function (handler) {
      this.on(CHANGE_EVENT, handler);
    },

    removeChangeHandler: function (handler) {
      this.removeListener(CHANGE_EVENT, handler);
    },

    addNotebook: function (notebook) {
      _notebooks.push(notebook);
      this.notebooksChanged();
    },

    removeNotebook: function (notebook) {
      if (typeof this.find(notebook.id) !== "undefined") {
        var idx = _notebooks.indexOf(notebook);
        _notebooks.splice(idx, 1);
        this.notebooksChanged();
      }
    },

    updateNotebook: function (notebook) {

    },

    find: function (id) {
      var ids = _notebooks.map(function (notebook) {
        return notebook.id;
      });

      var idx = ids.indexOf(id);

      if (idx !== -1) {
        return _notebooks[idx];
      }
    },

    receiveAllNotebooks: function (notebooks) {
      _notebooks = notebooks;
      this.notebooksChanged();
    },

    notebooksChanged: function () {
      this.emit(CHANGE_EVENT);
    },

    updateNotebook: function (notebook) {
      var ids = _notebooks.map(function (oldNotebook) {
        return oldNotebook.id;
      });

      var idx = ids.indexOf(notebook.id);

      if (idx !== -1) {
        _notebooks[idx] = notebook;
      }

      this.notebooksChanged();
    }
  });
}(this));

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case NotebookConstants.RECEIVE_ALL_NOTEBOOKS:
      NotebookStore.receiveAllNotebooks(action.notebooks)
      break;
    case NotebookConstants.ADD_NOTEBOOK:
      NotebookStore.addNotebook(action.notebook);
      break;
    case NotebookConstants.DELETE_NOTEBOOK:
      NotebookStore.removeNotebook(action.notebook);
      break;
    case NotebookConstants.SHOW_NOTEBOOK:
      NotebookStore.showNotebook(action.notebook);
      break;
  }
});
