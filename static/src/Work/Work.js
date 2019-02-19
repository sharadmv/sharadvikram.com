import React, { Component } from "react";
import "./Work.css";
import WorkItem from "./WorkItem";

class Work extends Component {
  render() {
    const data = require("./work.json");
    return (
      <div id="work-container">
        <h2>Work</h2>
        {console.log(data)}
        <ul>
          {data.experiences.map(({ companyName, location, logo, role }) => (
            <WorkItem
              company={companyName}
              imgSrc={logo}
              location={location}
              title={role}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Work;
