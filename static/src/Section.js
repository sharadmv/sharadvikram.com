import React, { Component } from "react";

import "./Section.css";

class Section extends Component {
  render() {
    const { color = "white" } = this.props;
    return (
      <div className={`section-background-${color}`}>
        <div className="section-container">{this.props.children}</div>
      </div>
    );
  }
}

export default Section;
