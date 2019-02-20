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
    const {
      authors,
      title,
      imgSrc,
      description,
      arxivLink,
      projectLink,
      venue
    } = this.props;
    return (
      <li className="research-item-container">
        <a href={projectLink}>
          <img className="rectangle" src={imgSrc} alt={title} />
        </a>
        <div className="research-item-text">
          <h3>
            <a href={arxivLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p>{authors.join(", ")} - {venue}</p>
          <div className="research-item-description-divider">
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default ResearchItem;
