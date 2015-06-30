'use strict';

var Editor = require('../editor/Editor');
var Rhyme = require('./Rhyme');
var RhymeActions = require('../../actions/RhymeActions');
var _ = require('underscore');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    lyric: ReactPropTypes.object
  },

  handleChange: function(phrase, text) {
    console.log('handleChange', text);

    // If no rhyme added, update phrase with new text.
    if (text.indexOf('+%') == -1) {
      return RhymeActions.updatePhrase(phrase, text);
    }

    // Add rhyme.
    var splitOpeningToken = text.split('+%');
    var splitClosingToken = splitOpeningToken[1].split('%+');
    var rhyme = [splitOpeningToken[0], splitClosingToken[0], splitClosingToken[1]];
    RhymeActions.addRhymeToPhrase(phrase, rhyme);
  },

  render: function() {
    console.log('render', this.props.lyric)
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
        <Editor
          key={phrase.index + phrase.lyric.update}
          phrase={phrase}
          onChange={self.handleChange}
        />
      );
    });
    return (
      <div className="lyric">
        {content}
      </div>
    );
  }

});