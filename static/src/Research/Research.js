// @flow
import React, { Component } from "react";
import "./Research.css";
import ResearchItem from "./ResearchItem";

type Props = {};

class Research extends Component<Props> {
  render() {
    const data = require("./research.json");
    return (
      <div id="research_container">
        <h2>Research</h2>
        <ul>
          {data.publications.map(
            ({ title, authors, imgSrc, description, arxivLink, projectLink, venue }, index) => (
              <ResearchItem
                arxivLink={arxivLink}
                authors={authors}
                description={description}
                imgSrc={imgSrc}
                key={index}
                title={title}
                venue={venue}
                projectLink={projectLink}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

export default Research;
