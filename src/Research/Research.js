// @flow
import React, { Component } from "react";
import "./Research.css";
import ResearchItem from "./ResearchItem";

type Props = {};

class Research extends Component<Props> {
  renderSoftware() {
    return (
      <div className="research-software-container">
        <h4 className="research-software-header">
          <a
            href="https://www.github.com/google/jax"
            target="_blank"
            rel="noopener noreferrer"
          >
            JAX
          </a>
        </h4>
        <div className="research-item-description-divider">
          <p>
            I currently work on JAX, a Python library for numerical computing based on
            composable function transformations.
          </p>
        </div>
        <h4 className="research-software-header">
          <a
            href="https://www.tensorflow.org/probability/oryx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oryx
          </a>
        </h4>
        <div className="research-item-description-divider">
          <p>
            Oryx, a spiritual successor to DeepX, is a probabilistic programming and machine
            learning library built on top of JAX. Its philosophy is to build complexity via
            program transformation.
          </p>
        </div>
        <h4 className="research-software-header">
          <a
            href="https://www.tensorflow.org/probability"
            target="_blank"
            rel="noopener noreferrer"
          >
            TensorFlow Probability
          </a>
        </h4>
        <div className="research-item-description-divider">
          <p>
            During my first two years at Google, I worked on TensorFlow Probability,
            a Python library for statistics and machine learning. I worked on building out
            its SPMD distributed inference package and enabling it to work on top of JAX.
          </p>
        </div>
        <h4 className="research-software-header">
          <a
            href="https://github.com/sharadmv/deepx"
            target="_blank"
            rel="noopener noreferrer"
          >
            DeepX
          </a>
        </h4>
        <div className="research-item-description-divider">
          <p>
            During my spare time, I work on DeepX, a deep learning library
            designed with flexibility and succinctness in mind. The key aspect
            of the library is an expressive shorthand to describe neural network
            architecture. DeepX currently supports both Tensorflow and PyTorch.
          </p>
        </div>
      </div>
    );
  }
  render() {
    const data = require("./research.json");
    return (
      <div id="research_container">
        <h2>Research</h2>
        <h3>Papers</h3>
        <ul>
          {data.publications.map(
            (
              {
                title,
                authors,
                imgSrc,
                description,
                arxivLink,
                projectLink,
                venue
              },
              index
            ) => (
              <ResearchItem
                arxivLink={arxivLink}
                authors={authors}
                description={description}
                imgSrc={imgSrc}
                key={index}
                title={title}
                venue={venue}
                projectLink={projectLink}
              />
            )
          )}
        </ul>
        <h3>Software</h3>
        {this.renderSoftware()}
      </div>
    );
  }
}

export default Research;
