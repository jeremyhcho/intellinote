var TagActions = {
  resetTags: function (tags) {
    AppDispatcher.dispatch({
      actionType: TagConstants.RECEIVE_ALL_TAGS,
      tags: tags
    });
  }
};
