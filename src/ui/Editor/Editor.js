'use strict';

var MediumEditor = require('medium-editor');
var RhymeButton = require('./RhymeButton');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  displayName: 'exports',

  propTypes: {
    phrase: ReactPropTypes.object,
    onEdit: ReactPropTypes.func,
    onAddRhyme: ReactPropTypes.func
  },

  componentDidMount: function componentDidMount() {
    var _this = this;
    var dom = this.getDOMNode();
    var options = {
      disableReturn: true,
      placeholder: '',
      buttons: ['rhyme'],
      extensions: {
        'rhyme': new RhymeButton({
          buttonText: '+',
          onChange: _this.onAddRhyme,
          getHtml: function(selectedText) {
            return selectedText;
          }
        })
      }
    };
    this.medium = new MediumEditor(dom, options);
    this.medium.subscribe('editableInput', function (e) {
      _this.onEdit();
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.medium.destroy();
  },

  render: function render() {
    return (
      <div
        className="editor"
        contentEditable="true"
      >{this.props.phrase.text}</div>
    );
  },

  onAddRhyme: function onAddRhyme(payload) {
    this.props.onAddRhyme(this.props.phrase, payload.endIndex, payload.text);
  },

  onEdit: function onEdit() {
    var dom = this.getDOMNode();
    this.props.onEdit(this.props.phrase, dom.textContent);
  }
});