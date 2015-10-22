(function(root) {
  'use strict';

  var _tags = [], CHANGE_EVENT = "CHANGE";
  root.TagStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _tags.slice();
    },

    addChangeHandler: function (handler) {
      this.on(CHANGE_EVENT, handler);
    },

    removeChangeHandler: function (handler) {
      this.removeListener(CHANGE_EVENT, handler);
    },

    resetAllTags: function (tags) {
      _tags = tags;
      this.tagsChanged();
    },

    tagsChanged: function () {
      this.emit(CHANGE_EVENT);
    },

    findByNote: function (noteId) {
      return _tags.filter(function (tag) {
        return tag.note_id === noteId;
      });
    }
  });

  AppDispatcher.register(function (action) {
    switch (action.actionType) {
      case TagConstants.RECEIVE_ALL_TAGS:
        TagStore.resetAllTags(action.tags);
        break;
    }
  });
}(this));
