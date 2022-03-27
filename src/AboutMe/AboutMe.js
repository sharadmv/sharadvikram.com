import React, { Component } from "react";
import "./AboutMe.css";
import Icons from "./Icons";

const IMAGE_SOURCE_URL = "/img/me.jpg";

class AboutMe extends Component {
  render() {
    return (
      <div id="about-me-container">
        <div id="about-me-content">
          <h2 id="about-me-title">Hi! I'm Sharad.</h2>
          <div id="about-me-description">
            <p>
              I'm a researcher at Google, currently working on {" "}
              <a href="https://www.github.com/google/jax">JAX</a>.
              Before that, I worked on {" "}
              <a href="https://www.tensorflow.org/probability">TensorFlow Probability</a> and <a href="https://www.tensorflow.org/probability/oryx">Oryx</a>.
              I finished my PhD at UCSD in 2019 advised by{" "}
              <a
                href="http://cseweb.ucsd.edu/~dasgupta/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sanjoy Dasgupta
              </a>
              . In the past I interned at Google AI with{" "}
              <a
                href="http://matthewdhoffman.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Matt Hoffman
              </a>
              , working on combining Bayesian nonparametrics with variational
              autoencoders.
              </p>
              <br/>
              <p>
              I'm interested in the intersection of probabilistic machine learning (deep generative modeling, approximate inference) and programming languages (functional programming, type systems, side-effects).
              </p>
          </div>
          <Icons
            email="mailto:sharad.vikram@gmail.com"
            github="http://github.com/sharadmv"
            twitter="http://twitter.com/sharadvikram"
            cv="/pdf/cv-sharadvikram.pdf"
          />
        </div>
        <div id="about-me-photo">
          <img
            alt="Sharad Vikram headshot"
            src={IMAGE_SOURCE_URL}
            className="rounded"
          />
        </div>
      </div>
    );
  }
}

export default AboutMe;
