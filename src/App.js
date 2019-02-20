import React, { Component } from "react";
import "./App.css";
import AboutMe from "./AboutMe/AboutMe";
import Research from "./Research/Research";
import Work from "./Work/Work";
import Section from "./Section";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Section>
          <AboutMe />
        </Section>
        <Section color="gray">
          <Research />
        </Section>
        <Section>
          <Work />
        </Section>
      </div>
    );
  }
}

export default App;
