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
      value: {
        id: 0,
        text: 'platinum status'
      },
      options: [
        {
          id: 0,
          text: 'platinum status'
        }, {
          id: 1,
          text: 'got in the palace'
        }, {
          id: 2,
          text: 'fracking phallus'
        }, {
          id: 3,
          text: 'a cotton chalice'
        }
      ]
    }, {
      text: 'is whack if I\'m not the baddest'
    }
  ]}
];

var _parseLyrics = function() {
  _.each(_lyrics, function(lyric, lyricIndex) {
    lyric.index = lyricIndex;
    if (!lyric.update) {
      lyric.update = 1;
    }
    _.each(lyric.phrases, function(phrase, phraseIndex) {
      phrase.index = phraseIndex;
      phrase.lyric = lyric;
      if (phrase.text) {
        phrase.words = phrase.text.split(' ');
      }
    });
  })
  console.log(_lyrics)
};
_parseLyrics();

var _addRhymeToPhrase = function(phrase, rhyme) {
  var lyric = _lyrics[phrase.lyric.index];
  lyric.update ++;
  // Convert the new rhyme text into phrase objects.
  var newPhrases = [];
  _.each(rhyme, function(text, index) {
    // Ignore text that's empty.
    if (text.length) {
      if (index == 1) {
        var rhymeObject = {
          source: text,
          value: {
            id: -1,
            text: text
          },
          options: []
        };
        newPhrases.push(rhymeObject);
      } else {
        var phraseObject = {
          text: text
        };
        newPhrases.push(phraseObject);
      }
    }
  });
  // Splice the new rhyme phrases into the lyric's existing phrases,
  // and removed the outdated phrase.
  var args = [phrase.index, 1].concat(newPhrases);
  Array.prototype.splice.apply(lyric.phrases, args);
  _parseLyrics();
};

var _updatePhrase = function(phrase, text) {
  var lyric = _lyrics[phrase.lyric.index];
  lyric.phrases[phrase.index].text = text;
  _parseLyrics();
};

var _selectRhyme = function(phrase, option) {
  phrase.value = option;
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

    case ActionTypes.RHYME_SELECTED:
      _selectRhyme(action.payload.phrase, action.payload.option);
      LyricsStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = LyricsStore;
