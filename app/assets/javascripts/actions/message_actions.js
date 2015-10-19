var MessageActions = {
  resetMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.RECEIVE_ALL_MESSAGES,
      messages: messages
    })
  }
};
