var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button,
    Input  = ReactBootstrap.Input,
    Row    = ReactBootstrap.Row,
    Col    = ReactBootstrap.Col;

var $ = require('jquery-browserify');

require('./sb.css')

var sbVis = require('./d3-sb.jsx');

var StickBreaking = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    data: React.PropTypes.array,
    a: React.PropTypes.number,
    b: React.PropTypes.number,
    interval: React.PropTypes.number,
    maxBreaks: React.PropTypes.number,
  },

  getBeta : function(callback) {
    $.get("/api/rng/beta", {
      "a": this.state.a,
      "b": this.state.b,
      "size": this.state.maxBreaks
    }).success(function(result) {
      callback(result['result']);
    });
  },
  getInitialState: function() {
    var foo = this.props;
    foo.i = 0;
    return this.props;
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this.refs.visElem);
    sbVis.create(el, {
      width: this.props.width,
      height: this.props.height,
      stroke: 5,
    }, this.state);
    this.reset();
  },

  reset: function() {
    clearTimeout(this.curTimeout);
    var self = this;
    this.setState({
      'finalBreaks': [],
      'breaks': [],
      'i': 0,
    }, function() {
      console.log(self.state);
      sbVis.removeAll();
      this.start();
    });
  },

  start: function() {
    var self = this;
    this.getBeta(function(s) {
      console.log("Betas", s);
      self.setState({
        'finalBreaks': s
      }, function() {
        if (this.state.i < this.state.maxBreaks) {
          self.curTimeout = setTimeout(self.stickBreak, self.state.interval * 1000);
        }
      });
    });
  },

  stickBreak: function() {
    var breaks = this.state.breaks;
    var self = this;
    this.setState({
      'breaks': this.state.finalBreaks.slice(0, this.state.i)
    }, function() {
      sbVis.update(self.state);
      if (self.state.i < self.state.maxBreaks) {
        self.setState({
          'i': (self.state.i + 1)
        });
        self.curTimeout = setTimeout(self.stickBreak, self.state.interval * 1000);
      } else {
        sbVis.finish(self.state)
      }
    });
  },

  componentWillUnmount: function() {
    sbVis.destroy();
  },

  render: function() {
    return (
      <div className="sb-wrapper">
        <form className="form-inline sb-form">
          <div className="input-group col-xs-1 form-spacing">
            <span className="input-group-addon">a</span>
            <input className="form-control max-breaks" type="text" valueLink={this.linkState('a')}/>
          </div>

          <div className="input-group col-xs-1 form-spacing">
            <span className="input-group-addon">b</span>
            <input className="form-control max-breaks" type="text" valueLink={this.linkState('b')}/>
          </div>

          <div className="input-group col-xs-2 form-spacing">
            <span className="input-group-addon">Number of Breaks</span>
            <input className="form-control max-breaks" type="text" valueLink={this.linkState('maxBreaks')}/>
          </div>

          <Button type="submit" bsSize="default" bsStyle="info">Animate</Button>
        </form>
        <div ref="visElem" className="sb"></div>
      </div>
    );
  }
});

module.exports = StickBreaking;
