var React = require('react');

var HeaderBox = React.createClass({
  render : function() {
    return (
      <div id="ww">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 centered">
              <h1>{this.props.title}</h1>
              <p>{this.props.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = HeaderBox;
