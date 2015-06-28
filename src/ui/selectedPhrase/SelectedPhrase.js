'use strict';

var SelectedPhraseControls = require('./SelectedPhraseControls');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    phrase: ReactPropTypes.object
  },

  render: function() {
    return (
      <span className="selectedPhrase">
        {this.props.phrase.word}
        <SelectedPhraseControls />
      </span>
    );
  }

});