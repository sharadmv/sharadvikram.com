import React, { Component } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import "./Blog.css";
import BlogPost from "./BlogPost";
import MarkdownFile from "../Components/Markdown.component";

type Props = {};

class Blog extends Component<Props> {
  render() {
    return (
      <div id="blog-container">
        <Switch>
          <Route path="/blog/ray_marching">
            <div className='blog-post'>
              <MarkdownFile file="/notebooks/Ray_Marching_Blog_Post.md"/>
            </div>
          </Route>
          <Route path="/blog">
            <h2>Posts</h2>
            <ul>
              <BlogPost title='Ray Marching in JAX' link='/blog/ray_marching' date='07/14/20'>
                <p>
                  this is a blurb.
                </p>
              </BlogPost>
            </ul>
          </Route>
        </Switch>
      </div>
        );
    }
}

export default Blog;
