'use strict';

var Editor = require('../Editor/Editor');
var RhymeActions = require('../../actions/RhymeActions');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    phrase: ReactPropTypes.object
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
    var phrase = this.props.phrase;
    return (
      <Editor
        key={phrase.index + phrase.lyric.update}
        phrase={phrase}
        onEdit={this.handleEdit}
        onAddRhyme={this.handleAddRhyme}
      />
    );
  }

});