'use strict';

var Editor = require('../Editor/Editor');
var Rhyme = require('../Rhyme/Rhyme');
var Phrase = require('./Phrase');
var ShufflePhrase = require('../ShuffleList/ShufflePhrase');
var RhymeActions = require('../../actions/RhymeActions');
var _ = require('underscore');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    lyric: ReactPropTypes.object
  },

  render: function() {
    var self = this;
    var content = this.props.lyric.phrases.map(function(phrase) {
      // Create a Rhyme if the phrase has a source.
      if (phrase.source) {
        return (
          <Rhyme
            key={phrase.index + phrase.lyric.update}
            phrase={phrase}
          />
        );
      }
      // Otherwise it's just regular, rhymable text.
      return (
        <div className="phraseGroup">
          <Phrase
            phrase={phrase}
          />
          <ShufflePhrase
            phrase={phrase}
          />
        </div>
      );
    });
    return (
      <div className="lyric">
        {content}
      </div>
    );
  }

});