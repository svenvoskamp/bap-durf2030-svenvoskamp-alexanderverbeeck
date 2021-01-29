import React from 'react';
import style from './info.module.css';

const Info = ({ props }) => {
  return (
    <>
      <div className={style.part_header}>
        <h1 className={style.title}>
          {props.first_name}.
          <span className={style.title_outline}>{props.last_name}.</span>
        </h1>
        <div className={style.description}>
          {props.company && (
            <>
              <p className={style.description_text__outline}>
                {props.company_name}
              </p>
              <div className={style.description_div}></div>
              <p className={style.description_text}>{props.department}</p>
            </>
          )}
          {!props.company && (
            <>
              <p className={style.description_text}>{props.sector}</p>
            </>
          )}
          {props.phone_number && (
            <>
              <div className={style.description_div}></div>
              <p className={style.description_text__outline}>
                {props.phone_number}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
