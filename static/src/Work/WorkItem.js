//@flow

import React, { Component } from "react";
import "./WorkItem.css";

type Props = {
  imgSrc: string,
  company: string,
  title: string,
  description: string
};

class WorkItem extends Component<Props> {
  render() {
    const { imgSrc, company, title, description } = this.props;
    return (
      <li class="work-item-container">
        <img class="rectangle" src={imgSrc} alt={title} />
        <div class="work-item-text">
          <h3>{company}</h3>
          <p>{title}</p>
          <div class="work-item-description-divider">
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default WorkItem;
