var React = require('react');

var Logo = React.createClass({
  render: function() {
    return (
      <div className='logo-bubble'>
      </div>
    );
  }
});

module.exports = (
  <a href='#'>
    <div className='logo-wrapper'>
      <Logo/>
      Sharad Vikram
    </div>
  </a>
);
