var ResponseActions = {
  addResponse: function (messageArray) {
    AppDispatcher.dispatch({
      actionType: ResponseConstants.ADD_RESPONSE,
      message: messageArray[1],
      type: messageArray[0]
    });
  }
};
