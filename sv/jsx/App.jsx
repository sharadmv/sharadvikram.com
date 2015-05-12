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
      <StickBreaking breaks={[]} a={1}  b={10} interval={0.1} maxBreaks={40} width={1000} height={500}/>
    </div>
  </div>
), document.body);
