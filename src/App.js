import React, { Component } from "react";

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import "./App.css";
import AboutMe from "./AboutMe/AboutMe";
import Blog from "./Blog/Blog";
import Research from "./Research/Research";
import Work from "./Work/Work";
import Section from "./Section";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className='nav'>
            <Section>
              <Link to='/'>Home</Link>
              <Link to='/research'>Research</Link>
              <Link to='/work'>Work</Link>
            </Section>
          </div>
          <Switch>
            <Route exact path="/">
              <Section>
                <AboutMe />
              </Section>
            </Route>
            <Route path="/blog">
              <Section>
                <Blog/ >
              </Section>
            </Route>
            <Route path="/research">
              <Section>
                <Research />
              </Section>
            </Route>
            <Route path="/work">
              <Section>
                <Work />
              </Section>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
