var d3 = require('d3-browserify');
var React = require('react');

var style = require('./sb.css')

var ns = {
  create : function(el, props, state) {
    var svg = d3.select(el).append('svg')
                .attr('class', 'd3')
                .attr('width', props.width)
                .attr('height', props.height);

    svg.append('g')
       .attr('class', 'd3-points');

    svg.append('g')
       .attr('class', 'd3-tooltips');

    this.update(el, state);
  },
  update : function(el, state) {
    this._draw(el, state);
  },
  destroy : function(el) {
  },
  _draw : function(el, state) {
    console.log(state);
  }
};

var StickBreaking = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    ns.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    ns.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    ns.destroy(el);
  },

  render: function() {
    return (
      <div className="sb"></div>
    );
  }
});

module.exports = StickBreaking;
