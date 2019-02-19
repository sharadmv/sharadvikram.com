//@flow

import React, { Component } from "react";
import "./WorkItem.css";

type Props = {
  company: string,
  descriptionList: list<string>,
  imgSrc: string,
  location: string,
  title: string
};

class WorkItem extends Component<Props> {
  render() {
    const { imgSrc, company, title, descriptionList, location } = this.props;
    return (
      <li className="work-item-container">
        <img className="rectangle" src={imgSrc} alt={title} />
        <div className="work-item-text">
          <h3>{company}</h3>
          <p>{location}</p>
          <p>{title}</p>
          <div className="work-item-description-divider">
            <ul>
              {descriptionList.map((entry, index) => (
                <p key={`description-${index}`}>{entry}</p>
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

export default WorkItem;
