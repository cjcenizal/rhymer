 'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _lyrics = [{
  phrases: [{
    word: 'Bust'
  }, {
    word: 'a'
  }, {
    word: 'rhyme',
    selected: true
  }]
}, {
  phrases: [{
    word: 'Just'
  }, {
    word: 'in'
  }, {
    word: 'time'
  }]
}];

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

    // case ActionTypes.STARTED_APP:
    //   init();
    //   LyricsStore.emitChange();
    //   break;

    default:
      // do nothing
  }
});

module.exports = LyricsStore;
