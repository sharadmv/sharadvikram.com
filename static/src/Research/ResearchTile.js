// @flow
import React, { Component } from "react";
import "./ResearchTile.css";

type Props = {
  authors: Array<string>,
  description: string,
  imgSrc: string,
  title: string,
  arXivLink: string,
  projectPage?: string
};

class ResearchTile extends Component<Props> {
  render() {
    const {
      authors,
      title,
      imgSrc,
      description,
      arXivLink,
      projectPage
    } = this.props;
    return (
      <div id="researchTile_Container">
        <img class="rectangle" src={imgSrc} alt={title} />
        <div id="researchTile_Text">
          <h3>
            <a href={arXivLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p>{authors.join(", ")}</p>
          <div id="researchTile_DescriptionDivider">
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ResearchTile;
