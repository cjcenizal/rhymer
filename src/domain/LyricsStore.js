 'use strict';

var AppDispatcher = require('../lib/AppDispatcher');
var AppConstants = require('../lib/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _lyrics = [
  {phrases: [
    {
      text: 'I don\'t really think the fact that I\'m Slim matters'
    }
  ]}, {phrases: [
    {
      text: 'A plaque of'
    }, {
      source: 'platinum status',
      text: 'platinum status'
    }, {
      text: 'is whack if I\'m not the baddest'
    }
  ]}
];

var _buildIndices = function() {
  _.each(_lyrics, function(lyric, lyricIndex) {
    lyric.index = lyricIndex;
    if (!lyric.update) {
      lyric.update = 1;
    }
    _.each(lyric.phrases, function(phrase, phraseIndex) {
      phrase.index = phraseIndex;
      phrase.lyric = lyric;
    });
  })
};
_buildIndices();

var _addRhymeToPhrase = function(phrase, rhyme) {
  var lyric = _lyrics[phrase.lyric.index];
  lyric.update ++;
  // Convert the new rhyme text into phrase objects.
  var newPhrases = [];
  _.each(rhyme, function(text, index) {
    // Ignore text that's empty.
    if (text.length) {
      var phraseObject = {
        text: text
      };
      if (index == 1) {
        phraseObject.source = text;
      }
      newPhrases.push(phraseObject);
    }
  });
  // Splice the new rhyme phrases into the lyric's existing phrases,
  // and removed the outdated phrase.
  var args = [phrase.index, 1].concat(newPhrases);
  Array.prototype.splice.apply(lyric.phrases, args);
  _buildIndices();
};

var _updatePhrase = function(phrase, text) {
  var lyric = _lyrics[phrase.lyric.index];
  lyric.phrases[phrase.index].text = text;
  _buildIndices();
};

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

    case ActionTypes.RHYME_ADDED_TO_PHRASE:
      _addRhymeToPhrase(action.payload.phrase, action.payload.rhyme);
      LyricsStore.emitChange();
      break;

    case ActionTypes.PHRASE_UPDATED:
      _updatePhrase(action.payload.phrase, action.payload.text);
      LyricsStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = LyricsStore;
