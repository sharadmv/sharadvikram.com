var React = require('react');

var Link = require('react-router').Link;

var BlogButton = React.createClass({
  render : function() {
    return (
      <Link to={this.props.post}>
      {this.props.post}
      </Link>
    )
  }
});

module.exports = BlogButton;
