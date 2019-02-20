//@flow

import React, { Component } from "react";
import "./WorkItem.css";

type Props = {
  company: string,
  descriptionList: Array<string>,
  imgSrc: string,
  location: string,
  title: string
};

class WorkItem extends Component<Props> {
  renderDescriptionItem(entry, index) {
    return <p key={`description-${index}`}>{"- " + entry}</p>;
  }

  render() {
    const {
      imgSrc,
      company,
      title,
      descriptionList,
      location,
      time
    } = this.props;
    return (
      <li className="work-item-container">
        <img className="work" src={imgSrc} alt={title} />
        <div className="work-item-text">
          <h3>{company}</h3>
          <p>{title}</p>
          <p className={"work-item-time"}>
            {time} - {location}
          </p>
          <div className="work-item-description-divider">
            <ul>{descriptionList.map(this.renderDescriptionItem)}</ul>
          </div>
        </div>
      </li>
    );
  }
}

export default WorkItem;
