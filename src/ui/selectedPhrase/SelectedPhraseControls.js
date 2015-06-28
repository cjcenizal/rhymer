'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  render: function() {
    return (
      <span className="selectedPhrase__controls">
        <span className="fa fa-plus"></span>
      </span>
    );
  }

});