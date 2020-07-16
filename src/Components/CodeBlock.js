import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs'

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: 'bash'
  };

  render() {
    const { language, value } = this.props;
    var style;
    if (language === 'python'){
      style = docco
    } else{
      style = xcode
    }
    return (
      <SyntaxHighlighter language={language} style={style}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;
