var NotebookActions = {
  receiveAllNotebooks: function (notebooks) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.RECEIVE_ALL_NOTEBOOKS,
      notebooks: notebooks
    });
  },

  addNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.ADD_NOTEBOOK,
      notebook: notebook
    });
  },

  deleteNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.DELETE_NOTEBOOK,
      notebook: notebook
    });
  },

  showNotebook: function (notebook) {
    AppDispatcher.dispatch({
      actionType: NotebookConstants.SHOW_NOTEBOOK,
      notebook: notebook
    });
  }
};
