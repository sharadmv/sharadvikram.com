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
          <img className="research" src={imgSrc} alt={title} />
        </a>
        <div className="research-item-text">
          <h4>
            <a href={arxivLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h4>
          <p>{authors.join(", ")}</p>
          <p className="research-item-venue">{venue}</p>
          <div className="research-item-description-divider">
            <p>{description}</p>
            {projectLink ? (
              <div className="research-item-description-divider">
                <p>
                  Demos of the results are available at the{" "}
                  <a
                    href={projectLink}
                    className="research-item-project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    project website
                  </a>
                  .
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </li>
    );
  }
}

export default ResearchItem;
