var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var RBR = require('react-router-bootstrap');
var Router = require('react-router');

var Link = Router.Link;

var BootstrapNavbar = ReactBootstrap.Navbar,
             Nav = ReactBootstrap.Nav,
             NavItem = RBR.NavItemLink,
             DropdownButton = ReactBootstrap.DropdownButton,
             MenuItem = ReactBootstrap.MenuItem;

var Brand = require('./Brand.jsx');

var Navbar = React.createClass({
  render : function() {
    return (
    <BootstrapNavbar toggleNavKey={0} inverse static-top brand={<Brand/>}>
      <Nav right eventKey={0}>
        <NavItem to="about">About</NavItem>
        <NavItem to="blog">Blog</NavItem>
        <NavItem to="research">Research</NavItem>
        <NavItem to="teaching">Teaching</NavItem>
      </Nav>
    </BootstrapNavbar>
    )
  }
});

module.exports = Navbar;
