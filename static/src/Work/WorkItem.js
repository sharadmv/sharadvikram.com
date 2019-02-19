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
        <h3>{company}</h3>
      </li>
    );
  }
}

export default WorkItem;
