var React = require('react');
var BlogPost = require('../components/BlogPost.jsx');

module.exports = {
  render : function(elem) {
    return React.createClass({
      render : function() {
        return <BlogPost content={elem}/>
      }
    });
  }
}
