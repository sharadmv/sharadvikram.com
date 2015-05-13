var React = require('react');
var StickBreaking = require('../components/ml/npb/sb/StickBreaking.jsx');

var HeaderBox = require('../components/HeaderBox.jsx')

var SB = React.createClass({
  render : function() {
    return (
      <div>
        <HeaderBox title="Blog" description="or, where I post about things."/>
        <div className="container">
        Here's something to keep you entertained while real blog posts come along.
          <StickBreaking breaks={[]} a={1}  b={7} interval={0.1} maxBreaks={40} width={1170} height={500}/>
          <span>This is a visualization of <a href='http://www3.stat.sinica.edu.tw/statistica/oldpdf/A4n216.pdf'>stick breaking</a>, a
          construction procedure for Dirichlet process priors. It is one of the various statistical objects I am interested in.
          </span>
        </div>
      </div>
    );
  }
});

module.exports = SB;
