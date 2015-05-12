var d3 = require('d3-browserify');

var ns = {
  create : function(el, props, state) {
    var svg = d3.select(el).append('svg')
                .attr('class', 'd3')
                .attr('width', props.width + "px")
                .attr('height', props.height + "px");
    this.width = props.width;
    this.height = props.height;
    this.el = el;
    this.update(state);
    this.stroke = props.stroke;
    svg.append('g')
      .attr('class', 'breaks');
  },
  update : function(state) {
    this._draw(state);
  },
  destroy : function() {
  },
  removeAll : function() {
    var sb = d3.select(this.el).select(".breaks");
    sb.selectAll(".break").remove();
  },
  finish : function(state) {
    var sb = d3.select(this.el).select(".breaks");
    var line = sb.selectAll(".break").filter(function(d, i) {
      return true;i != state['breaks'].length;
    });
    var height = this.height;
    var numBreaks = state['breaks'].length;
    var width =  this.width;
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
  _draw : function(state) {
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
    var sb = d3.select(this.el).select(".breaks");
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

module.exports = ns;
