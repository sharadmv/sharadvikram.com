var React = require('react');
var showdown = require('showdown');
var converter = new showdown.Converter();
var marked = require('marked');

var Markdown = React.createClass({
  render: function() {
    //var rawMarkup = converter.makeHtml(this.props.content);
    var rawMarkup = marked(this.props.content);
    return (
      <div className="markdown">
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  },
  componentDidMount : function() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.getDOMNode()]);
  }
});

module.exports = Markdown;
