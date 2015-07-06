'use strict';

var ShuffleMarker = require('../ShuffleMarker/ShuffleMarker');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    lyric: ReactPropTypes.object,
    word: ReactPropTypes.string,
    index: ReactPropTypes.number,
    shufflingRhyme: ReactPropTypes.string
  },

  onDragOver: function(event) {
    var node = this.getDOMNode();
    var bounds = node.getBoundingClientRect();
    var mouseX = event.clientX;
    var targetX = bounds.left;
    var targtWidth = bounds.width;
    if (mouseX - targetX < bounds.width * .5) {
      console.log('left')
    } else {
      console.log('right')
    }
  },

  render: function() {
    return (
      <div className="shuffleWord">
        <ShuffleMarker shufflingRhyme={this.props.shufflingRhyme} />
        <div onDragOver={this.onDragOver} className="shuffleWordTarget">
          {this.props.word}
        </div>
      </div>
    );
  }

});