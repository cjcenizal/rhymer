'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');

module.exports = React.createClass({

  propTypes: {
    phrase: ReactPropTypes.object,
    isVisible: ReactPropTypes.bool,
    onSelect: ReactPropTypes.func
  },

  onClick: function(option) {
    this.props.onSelect(option);
  },

  render: function() {
    var self = this;
    var options = this.props.phrase.options.map(function(option) {
      return (
        <div
          className="rhymeDropdown__option"
          key={option.id}
          onClick={self.onClick.bind(self, option)} 
        >{option.text}</div>
      );
    });
    var classes = classNames('rhymeDropdown', {
      'is-visible': this.props.isVisible
    });
    return (
      <div className={classes}>
        {options}
      </div>
    );
  }

});