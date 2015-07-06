'use strict';

var RhymeOptions = require('./RhymeOptions');
var RhymeActions = require('../../actions/RhymeActions');
var ShuffleActions = require('../../actions/ShuffleActions');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    phrase: ReactPropTypes.object
  },

  getInitialState: function() {
    return {
      isVisible: false
    };
  },

  onDragStart: function() {
    ShuffleActions.startShuffling(this.props.phrase.value.text);
  },

  onDragEnd: function() {
    ShuffleActions.stopShuffling();
  },

  onClick: function() {
    this.setState({
      isVisible: !this.state.isVisible
    });
  },

  onSelect: function(option) {
    RhymeActions.selectRhyme(this.props.phrase, option);
  },

  render: function() {
    return (
      <div
        className="rhyme"
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onClick={this.onClick}
      >
        <div className="rhyme__text">{this.props.phrase.value.text}</div>
        <RhymeOptions
          isVisible={this.state.isVisible}
          phrase={this.props.phrase}
          onSelect={this.onSelect}
        />
      </div>
    );
  }

});