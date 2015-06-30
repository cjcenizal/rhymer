'use strict';

var Lyric = require('./Lyric');
var LyricsStore = require('../../domain/LyricsStore');
var React = require('react');
var classNames = require('classnames');

function _getStateFromStores() {
  return {
    lyrics: LyricsStore.getLyrics()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return _getStateFromStores();
  },

  componentDidMount: function() {
    LyricsStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    LyricsStore.removeChangeListener(this.onChange);
  },

  render: function() {

    var lyrics = this.state.lyrics.map(function(lyric) {
      return <Lyric key={lyric.index} lyric={lyric} />;
    });

    return (
      <div>
        {lyrics}
      </div>
    );
  },
  
  onChange: function() {
    this.setState(_getStateFromStores());
  }

});