var React = require('react');
var HeaderBox = require('../components/HeaderBox.jsx');


var About = React.createClass({
  render : function() {
    return (
      <div>
        <HeaderBox title="About" description="Who am I?"/>
      </div>
    );
  }
});

module.exports = About;
