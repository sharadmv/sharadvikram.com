import React, { Component } from "react";
import "./Work.css";
import WorkItem from "./WorkItem";

class Work extends Component {
  render() {
    const data = require("./work.json");
    return (
      <div id="work-container">
        <h2>Work</h2>
        <ul>
          {data.experiences.map(
            ({ companyName, descriptionList, location, logo, role }, index) => (
              <WorkItem
                company={companyName}
                descriptionList={descriptionList}
                imgSrc={logo}
                key={`work-item-${index}`}
                location={location}
                title={role}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

export default Work;
