'use strict';

var React = require('react');

// Define stores.
var RhymesStore = require('./domain/RhymesStore');
var LyricsStore = require('./domain/LyricsStore');

// Build + render app.
var LyricsList = require('./ui/lyricsList/LyricsList');

React.render(
  <div>
    <LyricsList />
  </div>,
  document.body
);
