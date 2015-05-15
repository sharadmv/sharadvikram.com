var React = require('react');
var HeaderBox = require('../components/HeaderBox.jsx');

var BlogPost = React.createClass({
  render : function() {
    console.log(this.props);
    return (
      <div className='container'>
      {this.props.content}
      </div>
    );
  }
});

module.exports = BlogPost;
