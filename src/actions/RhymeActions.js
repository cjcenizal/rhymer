'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  updateLyric: function(index, text) {
    AppDispatcher.dispatch({
      type: ActionTypes.LYRIC_UPDATED,
      payload: {
        index: index,
        text: text
      }
    });
  }

};
