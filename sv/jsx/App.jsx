/** @jsx React.DOM */

var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var Navbar = require('./components/Navbar.jsx')
var MeBox = require('./components/MeBox.jsx')
var StickBreaking = require('./components/ml/npb/sb/StickBreaking.jsx')

React.render((
  <div>
    <Navbar/>
    <MeBox/>
    <div className="container">
      <StickBreaking breaks={[]}/>
    </div>
  </div>
), document.body);
