'use strict';

var MediumEditor = require('medium-editor');
var RhymeButton = require('./RhymeButton');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    phrase: ReactPropTypes.object
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    var dom = this.getDOMNode();
    var options = {
      placeholder: '',
      buttons: ['rhyme'],
      extensions: {
        'rhyme': new RhymeButton({
          buttonText: '+',
          onChange: _this.change,
          getHtml: function(selectedText) {
            return '+%' + selectedText + '%+';
          }
        })
      }
    };
    this.medium = new MediumEditor(dom, options);
    this.medium.subscribe('editableInput', function (e) {
      _this.change();
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.medium.destroy();
  },

  render: function render() {
    return React.createElement('span', {
      className: this.props.className,
      contentEditable: true,
      dangerouslySetInnerHTML: { __html: this.props.phrase.text }
    });
  },

  change: function change() {
    if (this.props.onChange) {
      var dom = this.getDOMNode();
      this.props.onChange(this.props.phrase, dom.innerHTML);
    }
  }
});