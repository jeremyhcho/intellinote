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
    },

    addMessage: function (message) {
      _messages.unshift(message);
      this.messagesChanged();
    },

    allRecipients: function () {
      var users = _messages.map(function (message) {
        if (message.recipient.username === LoginStore.returnUser().extract.username) {
          message.sender.updated_at = message.created_at;
          return message.sender;
        } else {
          message.recipient.updated_at = message.created_at;
          return message.recipient;
        }
      }.bind(this));

      var unique = [];

      users.forEach(function (user) {
        var uniqueIds = unique.map(function (user) {
          return user.id;
        });

        if (uniqueIds.indexOf(user.id) === -1) {
          unique.push(user);
        }
      }.bind(this));

      return unique;
    },

    conversationMessages: function (userId) {
      var filteredMessages = _messages.filter(function (message) {
        return (message.recipient.id === userId || message.sender.id === userId);
      }.bind(this));

      return filteredMessages.reverse().splice(0, 50);
    }
  });
}(this));

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case MessageConstants.RECEIVE_ALL_MESSAGES:
      MessageStore.receiveAllMessages(action.messages);
      break;
    case MessageConstants.ADD_MESSAGE:
      MessageStore.addMessage(action.message);
      break;
  }
});
