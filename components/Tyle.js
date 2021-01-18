import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Tyle = ({ color, direction, button, project }) => {
  const handleHover = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.15,
      left: '-6.6',
      top: '-6.3',
    });
  };

  const handleOut = (e) => {
    gsap.to(e.currentTarget, {
      duration: 0.1,
      left: '0',
      top: '0',
    });
  };
  return (
    <article
      class="scale card"
      data-scroll
      data-scroll-speed={direction}
      data-scroll-direction="vertical"
    >
      <div
        class="card-tags"
        data-scroll
        data-scroll-speed="0.7"
        data-scroll-direction="horizontal"
      >
        <h2 class="card-tag--text">{project.tag_one}</h2>
        <h2 class="card-tag--text">{project.tag_two}</h2>
      </div>
      <div data-scroll class="card-layers">
        <div class={`card-info card-info--${color}`}>
          <p class="card-fase">{project.phase.phase}</p>
          <div class="card-title " data-scroll>
            <h1 class="title-project">{project.title}</h1>
            <p class="title-name">
              {project.user.first_name} {project.user.last_name}
            </p>
          </div>
          <img class="card-image" src={project.image} alt={project.title} />
        </div>
      </div>

      <div
        data-scroll
        data-scroll-direction="vertical"
        data-scroll-speed={button}
        class="card-button"
      >
        <div class="buttons">
          <img
            class="button-background"
            src="./assets/images/button_background.svg"
          />
          <img
            onMouseOver={handleHover}
            onMouseLeave={handleOut}
            class="button-top"
            src="./assets/images/button_top.svg"
          />
        </div>
      </div>
    </article>
  );
};

export default Tyle;
