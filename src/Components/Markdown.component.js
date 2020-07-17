import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import CodeBlock from './CodeBlock'
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function transformImageUri(uri) {
  if (uri.includes('://')){
    return uri;
  }
  return '/notebooks/' + uri
};

const _mapProps = (props) => ({
  ...props,
  escapeHtml: false,
  plugins: [
    RemarkMathPlugin
  ],
  transformImageUri: transformImageUri,
  renderers: {
    ...props.renderers,
    code: CodeBlock,
    math: ({ value }) => <BlockMath>{value}</BlockMath>,
    inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>
  }
});


class MarkdownFile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { md: null }
  }

  componentWillMount() {
    fetch(this.props.file).then((response) => response.text()).then((text) => {
      this.setState({ md: text })
    })
  }

  render() {
    return (
      <div className="content">
        <ReactMarkdown source={this.state.md} {..._mapProps(this.props)}/>
      </div>
    )
  }
}

export default MarkdownFile;
