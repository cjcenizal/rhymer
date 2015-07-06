'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    shufflingRhyme: ReactPropTypes.string
  },

  render: function() {
    return (
      <div className="shuffleMarker">
        {this.props.shufflingRhyme}
      </div>
    );
  }

});