/** @jsx React.DOM */

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var Navbar = require('./components/Navbar.jsx');
var Home = require('./pages/Home.jsx');
var About = require('./pages/About.jsx');
var Blog = require('./pages/Blog.jsx');
var BayesianClassifier = require('./blog-posts/bayesian-classifier.jsx');
var Research = require('./pages/Research.jsx');
var Teaching = require('./pages/Teaching.jsx');

var App = React.createClass({
  render : function() {
    return (
      <div>
        <Navbar/>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route name="home" path="home" handler={Home}/>
    <Route name="about" path="about" handler={About}/>
    <Route name="blog" path="blog" handler={Blog}></Route>
    <Route name="bayesian-classifier" path="/blog/bayesian-classifier" handler={BayesianClassifier}/>
    <Route name="research" handler={Research}/>
    <Route name="teaching" path="teaching" handler={Teaching}/>
    <NotFoundRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
