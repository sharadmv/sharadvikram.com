// @flow
import React, { Component } from "react";
import "./Icons.css";

type Props = {
  twitter: string,
  email: string,
  github: string,
  cv: string
};

class Icons extends Component<Props> {
  render() {
    const { twitter, email, github, cv } = this.props;
    return (
      <div id="icon-container">
        <a
          href={twitter}
          className="icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon-photo" id="icon-twitter" />
          <p className="icon-description">@sharadmv</p>
        </a>
        <a
          href={github}
          className="icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon-photo" id="icon-github" />
          <p className="icon-description">sharadmv</p>
        </a>
        <a
          href={email}
          className="icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon-photo" id="icon-email" />
          <p className="icon-description">email</p>
        </a>
        <a href={cv} className="icon" target="_blank" rel="noopener noreferrer">
          <span className="icon-photo" id="icon-cv">
            <p id="icon-cv-text">CV</p>
          </span>
          <p className="icon-description">CV</p>
        </a>
      </div>
    );
  }
}

export default Icons;
