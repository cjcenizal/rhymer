'use strict';

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RHYME_ADDED_TO_PHRASE: null,
    PHRASE_UPDATED: null,
    RHYME_SELECTED: null,
    SHUFFLING_STARTED: null,
    SHUFFLING_STOPPED: null
  })

};
