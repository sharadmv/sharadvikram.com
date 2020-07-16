import React, { Component } from "react";
import "./Blog.css";
import MarkdownFile from "../Components/Markdown.component";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


type Props = {};

class BlogPost extends Component<Props> {
  render() {
    return (
      <div className="blog-post">
        <Link to={this.props.link}>{this.props.title} - {this.props.date}</Link>
        {this.props.children}
      </div>
    );
  }
}

export default BlogPost;
