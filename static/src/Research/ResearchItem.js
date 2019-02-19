// @flow
import React, { Component } from "react";
import "./ResearchItem.css";

type Props = {
  authors: Array<string>,
  description: string,
  imgSrc: string,
  title: string,
  arxivLink: string,
  projectLink?: string
};

class ResearchItem extends Component<Props> {
  render() {
    const { authors, title, imgSrc, description, arxivLink } = this.props;
    return (
      <li className="research-item-container">
        <img className="rectangle" src={imgSrc} alt={title} />
        <div className="research-item-text">
          <h3>
            <a href={arxivLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p>{authors.join(", ")}</p>
          <div className="research-item-description-divider">
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default ResearchItem;
