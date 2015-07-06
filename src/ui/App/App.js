'use strict';

var LyricsList = require('../LyricsList/LyricsList');
var ShuffleMarker = require('../ShuffleMarker/ShuffleMarker');

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="lyrics">
        <LyricsList />
      </div>
    );
  }

});