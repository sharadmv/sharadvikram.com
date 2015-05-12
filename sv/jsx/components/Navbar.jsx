var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var BootstrapNavbar = ReactBootstrap.Navbar,
             Nav = ReactBootstrap.Nav,
             NavItem = ReactBootstrap.NavItem,
             DropdownButton = ReactBootstrap.DropdownButton,
             MenuItem = ReactBootstrap.MenuItem;

var Brand = require('./Brand.jsx');

var Navbar = React.createClass({
  render : function() {
    return (
    <BootstrapNavbar toggleNavKey={0} inverse static-top brand={<Brand/>}>
      <Nav right eventKey={0}>
        <NavItem>About</NavItem>
        <NavItem>Blog</NavItem>
        <NavItem>Research</NavItem>
        <NavItem>Teaching</NavItem>
      </Nav>
    </BootstrapNavbar>
    )
  }
});

module.exports = Navbar;
