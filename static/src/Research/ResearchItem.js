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
      <li class="research-item-container">
        <img class="rectangle" src={imgSrc} alt={title} />
        <div class="research-item-text">
          <h3>
            <a href={arXivLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p>{authors.join(", ")}</p>
          <div class="research-item-description-divider">
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default ResearchItem;
