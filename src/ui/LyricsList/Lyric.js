'use strict';

var CustomHtml = require('../../lib/CustomHtml');
var MediumButton = require('../../lib/MediumButton');
var Editor = require('react-medium-editor');
var RhymeActions = require('../../actions/RhymeActions');

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({

  propTypes: {
    lyric: ReactPropTypes.string
  },

  handleChange: function() {
    var text = React.findDOMNode(this.refs.contentEditable).innerHTML;
    console.log('handleChange', text)
    RhymeActions.updateLyric(this.props.lyric.index, text);
  },

  render: function() {
    var self = this;
    return (
      <div>
        <Editor
          ref="contentEditable"
          text={this.props.lyric.text}
          onChange={this.handleChange}
          options={{
            buttons: ['rhyme'],
            extensions: {
              'rhyme': new CustomHtml({
                buttonText: "+",
                onChange: self.handleChange,
                getHtml: function(selectedText) {
                  return ' <span class="rhyme">' + selectedText + '</span> '
                }
              })
            }
          }}
        />
      </div>
    );
  }

});