import React, { useState } from 'react';
import style from './feedback.module.css';

const Feedback = ({ feedback }) => {
  const date = new Date(feedback.updated_at.replace(' ', 'T'));

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  return (
    <div className={style.feedback}>
      <div className={style.feedback_icon}>
        <div
          className={`${
            style.icon_circle
          } icon-circle--${feedback.type.toLowerCase()} `}
        >
          <picture>
            <source
              media="(max-width: 550px)"
              srcset={`../../../../assets/creatie/creatie_${feedback.type.toLowerCase()}_mobile.svg`}
            />
            <img
              src={`../../../../assets/creatie/creatie_${feedback.type.toLowerCase()}.svg`}
            />
          </picture>
        </div>
      </div>
      <li className={style.feedback_content}>
        <div className={style.feedback_card}>
          <a
            href={`../user/${feedback.otheruser.id}`}
            className={`${style.feedback_card__profile} scale`}
          >
            <img src={`../../../../assets/creatie/feedback_profile.svg`} />
            <p className={style.feedback_name}>
              {feedback.otheruser.first_name}:
            </p>
          </a>
          <p className={style.feedback_text}>"{feedback.motivation}"</p>
        </div>
        <div className={style.feedback_info}>
          <p className={style.feedback_type}>
            {feedback.type} {feedback.otheruser.first_name}
          </p>
          <p className={style.feedback_date}>Toegevoegd op {finalDate}</p>
        </div>
      </li>
    </div>
  );
};

export default Feedback;
