import React, { Component } from "react";

import "./Section.css";

class Section extends Component {
  render() {
    const { color = "white" } = this.props;
    return (
      <div class={`section-background-${color}`}>
        <div class="section-container">{this.props.children}</div>
      </div>
    );
  }
}

export default Section;
