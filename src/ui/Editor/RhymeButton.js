function RhymeButton(options) {
    this.button = document.createElement('button');
    this.button.className = 'medium-editor-action';
    if (this.button.innerText) {
        this.button.innerText = options.buttonText || "</>";
    } else {
        this.button.textContent = options.buttonText || "</>";
    }
    this.button.onclick = this.onClick.bind(this);
    this.options = options;
}

RhymeButton.prototype.insertHtmlAtCaret = function(html) {

  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    this.sel = sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      this.options.onChange({
        endIndex: range.endOffset,
        text: html
      });
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    // document.selection.createRange().pasteHTML(html);
  }

};

/**
 * onClick
 * The click event handler that calls `insertHtmlAtCaret` method.
 *
 * @name onClick
 * @function
 */
RhymeButton.prototype.onClick = function () {
    var sel = window.getSelection();
    this.insertHtmlAtCaret(this.options.htmlToInsert || this.options.getHtml(sel.toString()));
};

/**
 * getButton
 * This function is called by the Medium Editor and returns the button that is
 * added in the toolbar
 *
 * @name getButton
 * @function
 * @return {HTMLButtonElement} The button that is attached in the Medium Editor
 * toolbar
 */
RhymeButton.prototype.getButton = function () {
    return this.button;
};

module.exports = RhymeButton;