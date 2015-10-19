(function(root) {
  'use strict';

  var _messages = [], CHANGE_EVENT = "CHANGE";
  root.MessageStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _messages.slice();
    },

    receiveAllMessages: function (messages) {
      _messages = messages;
      this.messagesChanged();
    },

    messagesChanged: function () {
      this.emit(CHANGE_EVENT);
    },

    addChangeHandler: function (handler) {
      this.on(CHANGE_EVENT, handler);
    },

    removeChangeHandler: function (handler) {
      this.removeListener(CHANGE_EVENT, handler);
    }
  });
}(this));

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case MessageConstants.RECEIVE_ALL_MESSAGES:
      MessageStore.receiveAllMessages(action.messages);
      break;
  }
});
