'use strict';

var ShuffleWord = require('./ShuffleWord');
var ShuffleStore = require('../../domain/ShuffleStore');

var React = require('react');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');

function _getStateFromStores() {
  return {
    isShuffling: ShuffleStore.isShuffling(),
    shufflingRhyme: ShuffleStore.getRhyme()
  };
}

module.exports = React.createClass({

  propTypes: {
    phrase: ReactPropTypes.object
  },

  getInitialState: function() {
    return _getStateFromStores();
  },

  componentDidMount: function() {
    ShuffleStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ShuffleStore.removeChangeListener(this.onChange);
  },

  render: function() {
    var self = this;
    var content = this.props.phrase.words.map(function(word, index) {
      return (
        <ShuffleWord
          phrase={self.props.phrase}
          word={word}
          shufflingRhyme={self.state.shufflingRhyme}
          index={index}
          key={index}
        />
      );
    });
    var classes = classNames('shufflePhrase', {
      'is-shuffle-phrase-visible': this.state.isShuffling
    });
    return (
      <div className={classes}>
        {content}
      </div>
    );
  },

  onChange: function() {
    this.setState(_getStateFromStores());
  }

});