var MessageActions = {
  resetMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.RECEIVE_ALL_MESSAGES,
      messages: messages
    })
  },

  addMessage: function (message) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.ADD_MESSAGE,
      message: message
    })
  }
};
