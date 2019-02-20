// @flow
import React, { Component } from "react";
import Icon from "./Icon";
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
        <Icon type="twitter" link={twitter} title="@sharadvikram" />
        <Icon type="github" link={github} title="sharadmv" />
        <a
          href={email}
          className="icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon-photo" id="icon-email" />
          <p className="icon-description">email</p>
        </a>
        <Icon type="cv" link={cv} title="CV" text="CV" />
      </div>
    );
  }
}

export default Icons;
