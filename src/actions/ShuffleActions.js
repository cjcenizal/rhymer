'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  startShuffling: function(rhyme) {
    AppDispatcher.dispatch({
      type: ActionTypes.SHUFFLING_STARTED,
      payload: {
        rhyme: rhyme
      }
    });
  },

  stopShuffling: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.SHUFFLING_STOPPED
    });
  }

};
