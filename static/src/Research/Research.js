// @flow
import React, { Component } from "react";
import "./Research.css";
import ResearchItem from "./ResearchItem";

type Props = {};

class Research extends Component<Props> {
  render() {
    return (
      <div id="research_container">
        <h2>Research</h2>
        <ul>
          <ResearchItem
            arXivLink="http://www.sharadvikram.com/img/me.jpg"
            authors={["Iris", "Iris", "Iris"]}
            description="The greatest paper on earth"
            imgSrc="http://www.sharadvikram.com/img/me.jpg"
            title="blah blah Bayes blah"
          />
          <ResearchItem
            arXivLink="http://www.sharadvikram.com/img/me.jpg"
            authors={["Iris", "Iris", "Iris"]}
            description="The greatest paper on earth. Iris is the greatest coder in the world. Look at this amazing website. I'm hungry right now and I really want some boba."
            imgSrc="http://www.sharadvikram.com/img/me.jpg"
            title="blah blah Bayes blah"
          />
          <ResearchItem
            arXivLink="http://www.sharadvikram.com/img/me.jpg"
            authors={["Iris", "Iris", "Iris"]}
            description="The greatest paper on earth"
            imgSrc="http://www.sharadvikram.com/img/me.jpg"
            title="blah blah Bayes blah"
          />
        </ul>
      </div>
    );
  }
}

export default Research;
