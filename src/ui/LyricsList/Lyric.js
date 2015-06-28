'use strict';

var SelectedPhrase = require('../SelectedPhrase/SelectedPhrase');

var React = require('react');
var ReactPropTypes = React.PropTypes;

function getSelectedText() {
  var text = '';
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != 'Control') {
    text = document.selection.createRange().text;
  }
  return text;
}

module.exports = React.createClass({

  propTypes: {
    phrases: ReactPropTypes.array
  },

  handleOnMouseUp: function() {
    var selection = getSelectedText();
    /**
    
    SelectedPhraseStore contains selected phrase
    Highlights it on screen with SelectedPhrase component
    Clicking on the SelectedPhrase creates a new Rhyme
    The Rhyme stores the value (NOT the reference) of the selected phrase
    The Rhyme displays a list of words to choose from
    It can be clicked again to choose new words

    */
  },

  render: function() {
    var words = this.props.phrases.map(function(phrase) {
      if (!phrase.selected) {
        return ' ' + phrase.word + ' ';
      }
      return (
        <SelectedPhrase phrase={phrase} />
      );
    });
    return (
      <div onMouseUp={this.handleOnMouseUp}>{words}</div>
    );
  }

});