import React, { Component } from "react";
import "./Work.css";
import WorkItem from "./WorkItem";

class Work extends Component {
  render() {
    return (
      <div id="work-container">
        <h2>Work</h2>
        <ul>
          <WorkItem company="Google" />
          <WorkItem company="Amazon" />
          <WorkItem company="Research" />
        </ul>
      </div>
    );
  }
}

export default Work;
