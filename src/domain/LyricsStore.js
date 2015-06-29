 'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _lyrics = [
  {
    text: 'Bust a rhyme'
  }, {
    text: 'Just in time'
  }
];

var _indexPhrases = function() {
  _.each(_lyrics, function(lyric, lyricIndex) {
    lyric.index = lyricIndex;
  })
};

var _updateLyricAtIndex = function(index, text) {
  _lyrics[index].text = text;
};

_indexPhrases();

var LyricsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getLyrics: function() {
    return _lyrics;
  }

});

LyricsStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {

    case ActionTypes.LYRIC_UPDATED:
      _updateLyricAtIndex(action.payload.index, action.payload.text);
      LyricsStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = LyricsStore;
