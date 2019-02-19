//@flow

import React, { Component } from "react";
import "./WorkItem.css";

type Props = {
  company: string,
  description: string,
  imgSrc: string,
  location: string,
  title: string
};

class WorkItem extends Component<Props> {
  render() {
    const { imgSrc, company, title, description, location } = this.props;
    return (
      <li className="work-item-container">
        <img className="rectangle" src={imgSrc} alt={title} />
        <div className="work-item-text">
          <h3>{company}</h3>
          <p>{location}</p>
          <p>{title}</p>
          <div className="work-item-description-divider">
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default WorkItem;
