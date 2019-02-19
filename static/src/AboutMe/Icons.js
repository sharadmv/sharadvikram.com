// @flow
import React, { Component } from "react";
import "./Icons.css";

type Props = {
  twitter: string,
  email: string,
  github: string
};

class Icons extends Component<Props> {
  render() {
    const { twitter, email, github } = this.props;
    return (
      <div id="icon-container">
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <span className="icon" id="icon-twitter" />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <span className="icon" id="icon-github" />
        </a>
        <a href={email} target="_blank" rel="noopener noreferrer">
          <span className="icon" id="icon-email" />
        </a>
      </div>
    );
  }
}

export default Icons;
