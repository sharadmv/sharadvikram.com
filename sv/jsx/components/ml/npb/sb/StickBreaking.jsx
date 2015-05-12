var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button,
    Input  = ReactBootstrap.Input;

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
    $.get("/api/rng/beta", {"a": this.state.a,
                            "b": this.state.b})
                            .success(function(result) {
      callback(result['result'][0]);
    });
  },
  getInitialState: function() {
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
    this.setState({
      'breaks': []
    }, function() {
      sbVis.removeAll();
      this.start();
    });
  },
  start: function() {
    if (this.state.breaks.length < this.state.maxBreaks) {
      self.curTimeout = setTimeout(this.stickBreak, this.state.interval * 1000);
    }
  },

  stickBreak: function() {
    var self = this;
    this.getBeta(function(s) {
      var breaks = self.state.breaks;
      breaks.push(s)
      self.setState({
        'breaks': breaks
      }, function() {
        sbVis.update(self.state);
      })
      if (self.state.breaks.length < self.state.maxBreaks) {
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
      <div>
        <form className="col-xs-2 sb-form form-horizontal">
          <Input labelClassName='col-xs-6' wrapperClassName='col-xs-6' type='text' label="a" valueLink={this.linkState('a')} />
          <Input labelClassName='col-xs-6' wrapperClassName='col-xs-6' type='text' label="b" valueLink={this.linkState('b')} />
          <Input labelClassName='col-xs-6' wrapperClassName='col-xs-6' type='text' label="Number of Breaks" valueLink={this.linkState('maxBreaks')} />
          <Button right onClick={this.reset} bsStyle='info'>Reset</Button>
        </form>
        <div ref="visElem" className="sb"></div>
      </div>
    );
  }
});

module.exports = StickBreaking;
