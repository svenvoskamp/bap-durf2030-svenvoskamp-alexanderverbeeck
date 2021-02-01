import React, { useState } from 'react';
import style from './feedback.module.css';

const Creatie = ({ feedback }) => {
  console.log(feedback);
  const date = new Date(feedback.updated_at.replace(' ', 'T'));

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  return (
    <>
      <li className={style.feedback}>
      <div className={style.feedback_card}>
          <p className={style.feedback_name}>{feedback.otheruser.first_name}:</p>
          <p className={style.feedback_text}>"{feedback.motivation}"</p>
        </div>
        <div>
          <p className={style.feedback_type}>
            {feedback.type} {feedback.otheruser.first_name}
          </p>
          <p className={style.feedback_date}>Toegevoegd op {finalDate}</p>
        </div>
      </li>
    </>
  );
};

export default Creatie;
