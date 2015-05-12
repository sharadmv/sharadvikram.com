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
    <div className="container sb-container">
      <StickBreaking breaks={[]} a={1}  b={7} interval={0.1} maxBreaks={40} width={1170} height={500}/>
      <span>This is a visualization of <a href='http://www3.stat.sinica.edu.tw/statistica/oldpdf/A4n216.pdf'>stick breaking</a>, a
      construction procedure for Dirichlet process priors. It is one of the various statistical objects I am interested in.
      </span>
    </div>
  </div>
), document.body);
