var LoginActions = {
  addCurrentUser: function (user) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.ADD_CURRENT_USER,
      user: user
    });
  },

  removeCurrentUser: function (user) {
    AppDispatcher.dispatch({
      actionType: LoginConstants.REMOVE_CURRENT_USER,
      user: user
    })
  }
};
