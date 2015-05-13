var React = require('react');
var HeaderBox = require('../components/HeaderBox.jsx');

var Home = React.createClass({
  render : function() {
    return (
      <HeaderBox title="Hi I'm Sharad!" description="I'm currently a Ph.D. student at UCSD, studying computer science. I'm specializing in machine learning and have been working on
      unsupervised learning algorithms."/>
    );
  }
});

module.exports = Home;
