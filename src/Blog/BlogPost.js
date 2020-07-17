import React, { Component } from "react";
import "./Blog.css";

import { Link } from "react-router-dom";


type Props = {};

class BlogPost extends Component<Props> {
  render() {
    return (
      <div className="blog-post-item">
        <Link to={this.props.link}>{this.props.title} - {this.props.date}</Link>
        {this.props.children}
      </div>
    );
  }
}

export default BlogPost;
