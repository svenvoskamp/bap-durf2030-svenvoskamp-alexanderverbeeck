import React, { useRef, useEffect } from "react";
import gsap from "gsap";

import Image from "next/image";
import style from "./tyle.module.css";

const Tyle = ({ color, direction, button, project }) => {
  return (
    <article
      className={`card scale`}
      data-scroll
      data-scroll-speed={direction}
      data-scroll-direction="vertical"
    >
      <div
        className={style.card_tags}
        data-scroll
        data-scroll-speed="0.7"
        data-scroll-direction="horizontal"
      >
        <p className={style.card_tag__text}>{project.theme.theme}</p>
        <p className={style.card_tag__text}>{project.category.category}</p>
      </div>
      <a href={"/detail/" + project.id} data-scroll>
        <div className={`card_info card_info__${color}`}>
          <p className={style.card_fase}>{project.phase.phase}</p>
          <div className={style.card_title} data-scroll>
            <h2 className={style.title_project}>{project.title}</h2>
            <p className={style.title_name}>
              {project.user.first_name} {project.user.last_name}
            </p>
          </div>
          <div></div>
          <img
            loading="lazy"
            className={style.card_image}
            src={project.image}
            alt={project.title}
          />
        </div>
      </a>

      <div
        data-scroll
        data-scroll-direction="vertical"
        data-scroll-speed={button}
        className={style.button}
      >
        <div className={style.circle_button}>
          <img
            className={style.button_image}
            src="./assets/images/account_aanmaken.svg"
          />
        </div>
      </div>
    </article>
  );
};

export default Tyle;
