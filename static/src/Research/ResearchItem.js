// @flow
import React, { Component } from "react";
import "./ResearchItem.css";

type Props = {
  authors: Array<string>,
  description: string,
  imgSrc: string,
  title: string,
  arXivLink: string,
  projectLink?: string
};

class ResearchItem extends Component<Props> {
  render() {
    const {
      authors,
      title,
      imgSrc,
      description,
      arXivLink,
      projectLink
    } = this.props;
    return (
      <li className="research-item-container">
        <a href={projectLink}>
          <img className="rectangle" src={imgSrc} alt={title} />
        </a>
        <div className="research-item-text">
          <h3>
            <a href={arXivLink} target="_blank" rel="noopener noreferrer">
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
