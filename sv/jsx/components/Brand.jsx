var React = require('react');

var Brand = React.createClass({
  render: function() {
    return (
      <a href='#' className='brand-name'>
        <div className='logo-wrapper'>
          <div className='logo-bubble'></div>
          <span>Sharad Vikram</span>
        </div>
      </a>
    );
  }
});

module.exports = Brand;
