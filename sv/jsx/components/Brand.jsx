var React = require('react');

var Brand = React.createClass({
  render: function() {
    return (
      <a href='#'>
        <div className='logo-wrapper'>
          <div className='logo-bubble'></div>
          Sharad Vikram
        </div>
      </a>
    );
  }
});

module.exports = Brand;
