var React = require('react');
var RB = require('react-bootstrap');
//var reactdown = require('reactdown');

var Grid = RB.Grid,
    Col = RB.Col,
    Row = RB.Row;

var StickBreaking = require('../components/ml/npb/sb/StickBreaking.jsx');

var HeaderBox = require('../components/HeaderBox.jsx')
var BlogButton = require('../components/BlogButton.jsx')

var BlogHome = React.createClass({
  render : function() {
    return (
        <Grid className='centered'>
          <Row>
            <Col xs={6} md={4}><BlogButton post={"bayesian-classifier"} /></Col>
          </Row>
        </Grid>
    );
  }
});

var Blog = React.createClass({
  render : function() {
    return (
      <div>
        <HeaderBox title="Blog" description="or, where I post about things."/>
        <BlogHome/>
      </div>
    );
  }
});

module.exports = Blog;
