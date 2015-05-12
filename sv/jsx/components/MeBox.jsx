var React = require('react');

var MeBox = React.createClass({
  render : function() {
    return (
      <div id="ww">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 centered">
              <h1>Hi, I am Sharad!</h1>
              <p>I'm currently a Ph.D. student at UCSD, studying computer science.
                I'm specializing in machine learning and have been working on unsupervised
                learning algorithms.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = MeBox;
