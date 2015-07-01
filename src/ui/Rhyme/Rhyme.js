'use strict';

var RhymeOptions = require('./RhymeOptions');
var RhymeActions = require('../../actions/RhymeActions');

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
        onClick={this.onClick}
        className="rhyme"
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