var d3 = require('d3-browserify');
var React = require('react');
var $ = require('jquery-browserify');

require('./sb.css')

var ns = {
  create : function(el, props, state) {
    var svg = d3.select(el).append('svg')
                .attr('class', 'd3')
                .attr('width', props.width + "px")
                .attr('height', props.height + "px");
    this.width = props.width;
    this.height = props.height;
    this.update(el, state);
    this.stroke = props.stroke;
    svg.append('g')
      .attr('class', 'breaks');
  },
  update : function(el, state) {
    this._draw(el, state);
  },
  destroy : function(el) {
  },
  finish : function(el, state) {
    var sb = d3.select(".breaks");
    var line = sb.selectAll(".break").filter(function(d, i) {
      return true;i != state['breaks'].length;
    });
    var height = this.height;
    var numBreaks = state['breaks'].length;
    var width =  this.height;
    line.transition()
        .attr('x1', function(d, i) {
          var w = width - 20;
          return i * w / numBreaks + 10;
        })
        .attr('x2', function(d, i) {
          var w = width - 20;
          return i * w / numBreaks + 10;
        })
        .attr('y1', function(d) {
            return height - 10;
        })
        .attr('y2', function(d) {
            var length = d['x2'] - d['x1'];
            return height - 10 - length;
        })
  },
  _draw : function(el, state) {
    var breaks = state['breaks'];
    prev = 1;
    var lengths = []
    var sum = 0;
    var transform = d3.scale.linear().domain([0, 1]).range([10, this.width - 10]);
    var locations = [transform(0)]
    var positions = []
    for (var i = 0; i < breaks.length; i++) {
      var brek = breaks[i];
      sum += brek * prev;
      lengths.push(brek * prev)
      prev *= 1 - brek;
      prevPosition = locations[locations.length - 1];
      locations.push(transform(sum));
      positions.push({
        'x1': prevPosition,
        'x2': transform(sum)
      });
    }
    positions.push({
      'x1': locations[locations.length - 1],
      'x2': transform(1)
    });
    locations.push(transform(1));
    var colors = d3.scale.category20().domain(locations);
    var sb = d3.select(".breaks");
    var line = sb.selectAll(".break").data(positions);
    var height = this.height / 2;
    var self = this;
    line.enter().append('line')
          .attr('class', 'break');
    line.attr('x1', function(d) { return d['x1']; })
        .attr('x2', function(d) { return d['x2']; })
        .attr('y1', function(d) { return height; })
        .attr('y2', function(d) { return height; })
        .attr('stroke-width', function(d) { return self.stroke; })
        .attr('stroke', function(d, i) {
          if (i == positions.length - 1) {
            return 'black';
          }
          return colors.range()[i % 20];
        });


  }
};

var StickBreaking = React.createClass({
  propTypes: {
    breaks: React.PropTypes.array,
    data: React.PropTypes.array,
    a: React.PropTypes.number,
    b: React.PropTypes.number,
    interval: React.PropTypes.number,
    maxBreaks: React.PropTypes.number,
  },

  getBeta : function(callback) {
    $.get("/api/rng/beta", {"a": this.props.a,
                            "b": this.props.b})
                            .success(function(result) {
      callback(result['result'][0]);
    });
  },
getInitialState: function() {
    return {
      'breaks': []
    }
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    ns.create(el, {
      width: this.props.width,
      height: this.props.height,
      stroke: 5,
    }, this.state);
    this.setState({
      'breaks': []
    });
    if (this.props.breaks.length < this.props.maxBreaks) {
      setTimeout(this.stickBreak, this.props.interval * 1000);
    }
  },

  stickBreak: function() {
    var self = this;
    this.getBeta(function(s) {
      self.props.breaks.push(s);
      self.setState({
        'breaks': self.props.breaks
      })
      if (self.props.breaks.length < self.props.maxBreaks) {
        setTimeout(self.stickBreak, self.props.interval * 1000);
      } else {
        var el = self.getDOMNode();
        ns.finish(el, self.state)
      }
    });
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    ns.update(el, this.state);
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    ns.destroy(el);
  },

  render: function() {
    return (
      <div>
        <div className="sb"></div>
      </div>
    );
  }
});

module.exports = StickBreaking;
