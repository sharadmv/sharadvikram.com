// @flow
import React, { Component } from "react";
import "./Icon.css";

type Props = {
  type: string,
  link: string,
  title: string
};

class Icon extends Component<Props> {
  render() {
    const { type, title, link } = this.props;
    return (
      <a href={link} className="icon" target="_blank" rel="noopener noreferrer">
        <span className="icon-photo" id={`icon-${type}`} />
        <p className="icon-description">{title}</p>
      </a>
    );
  }
}

export default Icon;
