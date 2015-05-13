var React = require('react');

var HeaderBox = require('../components/HeaderBox.jsx')

var Teaching = React.createClass({
  render : function() {
    return (
      <div>
        <HeaderBox title="Teaching" description="The classes I have helped with"/>
      </div>
    );
  }
});

module.exports = Teaching;
