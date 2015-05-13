var React = require('react');

var HeaderBox = require('../components/HeaderBox.jsx')

var Research = React.createClass({
  render : function() {
    return (
      <div>
        <HeaderBox title="Research" description="or, what I'm currently interested in learning."/>
      </div>
    );
  }
});

module.exports = Research;
