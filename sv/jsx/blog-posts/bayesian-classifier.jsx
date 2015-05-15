var React = require('react');

var $$ = require('../khan/js/tex.jsx');
var util = require('./blog-util.jsx')
var Markdown = require('../components/Markdown.jsx')
var post = require('./bayesian-classifier.md');

module.exports = util.render(
  <Markdown content={post}/>
)
