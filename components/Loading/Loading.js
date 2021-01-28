import React, { lazy, useRef, useState } from 'react';
import style from './loading.module.css';

const Loading = ({ props }) => {
  return (
    <>
      {props == 'loading' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
      {props == 'projecten' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            Projecten worden ingeladen<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
      {props == 'gebruiker' && (
        <div className={style.loading}>
          <p className={style.loading_text}>
            Uw account wordt geverifieerd<span>.</span>
            <span>.</span>
            <span>.</span>
          </p>
        </div>
      )}
      {props == 'detail' && (
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
    </>
  );
};

export default Loading;
