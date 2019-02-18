// @flow
import React, { Component } from "react";
import "./Research.css";
import ResearchTile from "./ResearchTile";

type Props = {};

class Research extends Component<Props> {
  render() {
    return (
      <div className="grayBackground sectionContainer" id="research_Container">
        <h2>Research</h2>
        <ResearchTile
          arXivLink="http://www.sharadvikram.com/img/me.jpg"
          authors={["Iris", "Iris", "Iris"]}
          description="The greatest paper on earth"
          imgSrc="http://www.sharadvikram.com/img/me.jpg"
          title="blah blah Bayes blah"
        />
        <ResearchTile
          arXivLink="http://www.sharadvikram.com/img/me.jpg"
          authors={["Iris", "Iris", "Iris"]}
          description="The greatest paper on earth. Iris is the greatest coder in the world. Look at this amazing website. I'm hungry right now and I really want some boba."
          imgSrc="http://www.sharadvikram.com/img/me.jpg"
          title="blah blah Bayes blah"
        />
        <ResearchTile
          arXivLink="http://www.sharadvikram.com/img/me.jpg"
          authors={["Iris", "Iris", "Iris"]}
          description="The greatest paper on earth"
          imgSrc="http://www.sharadvikram.com/img/me.jpg"
          title="blah blah Bayes blah"
        />
      </div>
    );
  }
}

export default Research;
