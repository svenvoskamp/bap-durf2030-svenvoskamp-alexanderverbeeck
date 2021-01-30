import React, { lazy, useRef, useState } from 'react';
import style from './empty.module.css';

const Empty = ({ props }) => {
  return (
    <>
      {props == 'mijnprojecten' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            Projecten worden ingeladen<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
      {props == 'notificaties' && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt
            <span className={style.empty_state__text__outline}> geen </span>
            notificaties.
          </p>
        </div>
      )}
      {props == 'inafwachting' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            Project ophalen<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
      {props == 'needs' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            Benodigdheden ophalen<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
      {props == 'profiel' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            Profiel ophalen<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Empty;
