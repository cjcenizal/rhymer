'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  addRhymeToPhrase: function(phrase, rhyme) {
    AppDispatcher.dispatch({
      type: ActionTypes.RHYME_ADDED_TO_PHRASE,
      payload: {
        phrase: phrase,
        rhyme: rhyme
      }
    });
  },

  updatePhrase: function(phrase, text) {
    AppDispatcher.dispatch({
      type: ActionTypes.PHRASE_UPDATED,
      payload: {
        phrase: phrase,
        text: text
      }
    });
  },

  selectRhyme: function(phrase, option) {
    AppDispatcher.dispatch({
      type: ActionTypes.RHYME_SELECTED,
      payload: {
        phrase: phrase,
        option: option
      }
    });
  }

};
