'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _isShuffling = false;
var _rhyme = '';

var ShuffleStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isShuffling: function() {
    return _isShuffling;
  },

  getRhyme: function() {
    return _rhyme;
  }

});

ShuffleStore.dispatchToken = AppDispatcher.register(function(action) {
  switch (action.type) {

    case ActionTypes.SHUFFLING_STARTED:
      _isShuffling = true;
      _rhyme = action.payload.rhyme;
      ShuffleStore.emitChange();
      break;

    case ActionTypes.SHUFFLING_STOPPED:
      _isShuffling = false;
      _rhyme = '';
      ShuffleStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = ShuffleStore;
