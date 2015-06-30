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

  handleEdit: function(phrase, text) {
    return RhymeActions.updatePhrase(phrase, text);
  },

  handleAddRhyme: function(phrase, endIndex, text) {
    var phraseText = phrase.text;
    var rhyme = [phraseText.substring(0, endIndex), text, phraseText.substring(endIndex, phraseText.length)];
    RhymeActions.addRhymeToPhrase(phrase, rhyme);
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
        <Editor
          key={phrase.index + phrase.lyric.update}
          phrase={phrase}
          onEdit={self.handleEdit}
          onAddRhyme={self.handleAddRhyme}
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