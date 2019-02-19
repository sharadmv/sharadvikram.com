import React, { Component } from "react";
import "./AboutMe.css";
import Icons from "./Icons";

const IMAGE_SOURCE_URL = "http://www.sharadvikram.com/img/me.jpg";

class AboutMe extends Component {
  render() {
    return (
      <div id="about-me-container">
        <div id="about-me-content">
          <h2 id="about-me-title">Hi! I'm Sharad the poop.</h2>
          <div id="about-me-description">
            <p>
              I'm a machine learning PhD student at UCSD (graduating May 2019),
              advised by Sanjoy Dasgupta. My research interests are hierarchical
              clustering and deep reinforcement learning. I am a Stardew Valley,
              Minecraft, and Kerbal Space Program fanatic. I hope to soon retire
              to spend the rest of my life dedicated to perfecting these games.
              One day, I'll rescue my kerbals from the space lab in outer space
              and soon I'll be the Elon Musk of Kerbal Space Program.
            </p>
            <p>
              I'm a machine learning PhD student at UCSD (graduating May 2019),
              advised by Sanjoy Dasgupta. My research interests are hierarchical
              clustering and deep reinforcement learning. I am a Stardew Valley,
              Minecraft, and Kerbal Space Program fanatic. I hope to soon retire
              to spend the rest of my life dedicated to perfecting these games.
              One day, I'll rescue my kerbals from the space lab in outer space
              and soon I'll be the Elon Musk of Kerbal Space Program.
            </p>
          </div>
          <Icons
            email="poop"
            github="http://github.com/sharadmv"
            twitter="http://twitter.com/sharadvikram"
          />
        </div>
        <div id="about-me-photo">
          <img
            alt="Sharad Vikram headshot"
            src={IMAGE_SOURCE_URL}
            class="rounded"
          />
        </div>
      </div>
    );
  }
}

export default AboutMe;
