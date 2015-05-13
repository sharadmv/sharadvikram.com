var React = require('react');

var Link = require('react-router').Link;

var Brand = React.createClass({
  render: function() {
    return (
      <Link to='home' className='brand-name'>
        <div className='logo-wrapper'>
          <div className='logo-bubble'></div>
          <span>Sharad Vikram</span>
        </div>
      </Link>
    );
  }
});

module.exports = Brand;
