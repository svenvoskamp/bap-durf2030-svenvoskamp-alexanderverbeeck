import React from 'react';
import style from './extra.module.css';

const Extra = ({ props }) => {
  return (
    <>
      <div className={style.project_extra}>
        <div classname={style.extra_tagline}>
          <p className={style.tagline_text}>"{props.tagline}"</p>
          <img
            className={style.tagline_image}
            src="../assets/images/quotes.svg"
            alt="upload hier"
          />
        </div>
        <div className={style.extra_image}>
          <img
            className={style.project_image}
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className={style.extra_button}>
          <p className={style.extra_button__text}>Projecten in de kijker</p>
          <img
            className={style.extra_button__arrow}
            src="../assets/images/arrow_large.svg"
          />
        </div>
      </div>
      ;
    </>
  );
};

export default Extra;
