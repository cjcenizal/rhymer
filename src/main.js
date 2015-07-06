'use strict';

var React = require('react');

// Define stores so they're available before the UI interacts with them.
var LyricsStore = require('./domain/LyricsStore');
var RhymesStore = require('./domain/RhymesStore');
var ShuffleStore = require('./domain/ShuffleStore');

// Build + render app.
var App = require('./ui/App/App');
React.render(
  <App />,
  document.body
);
