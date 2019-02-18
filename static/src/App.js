import React, { Component } from "react";
import "./App.css";
import AboutMe from "./AboutMe/AboutMe";
import Research from "./Research/Research";
import Work from "./Work/Work";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AboutMe />
        <Research />
        <Work />
      </div>
    );
  }
}

export default App;
