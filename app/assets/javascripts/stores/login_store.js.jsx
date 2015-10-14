(function(root) {
  'use strict';

  var _currentUser = [], CHANGE_EVENT = "CHANGE_EVENT";
  root.LoginStore = $.extend({}, EventEmitter.prototype, {
    returnUser: function () {
      return _currentUser.slice()[0];
    },

    addChangeHandler: function (handler) {
      this.on(CHANGE_EVENT, handler);
    },

    removeChangeHandler: function (handler) {
      this.removeListener(CHANGE_EVENT, handler);
    },

    userChanged: function () {
      this.emit(CHANGE_EVENT);
    },

    addCurrentUser: function (user) {
      _currentUser.push(user);
      this.userChanged();
    },

    removeCurrentUser: function (user) {
      var ids = _currentUser.map(function (user) {
        return user.id;
      });

      var idx = _currentUser.indexOf(user.id);

      if (idx !== 1) {
        _currentUser = _currentUser.splice(idx, 1);
      }

      this.userChanged();
    }
  });

  AppDispatcher.register(function (action) {
    switch (action.actionType) {
      case LoginConstants.ADD_CURRENT_USER:
        LoginStore.addCurrentUser(action.user);
        break;
      case LoginConstants.REMOVE_CURRENT_USER:
        LoginStore.removeCurrentUser(action.user);
        break;
    }
  });
}(this));
