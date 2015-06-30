'use strict';

var RhymeActions = require('../../actions/RhymeActions');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    phrase: ReactPropTypes.object
  },

  render: function() {
    return (
      <span className="rhyme">
        {this.props.phrase.text}
      </span>
    );
  }

});