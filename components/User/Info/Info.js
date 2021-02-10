import React from 'react';
import style from '../../Profile/Info/info.module.css';

const Info = ({ props }) => {
  let email;

  if (props.id.includes('goog')) {
    email = `${props.nickname}@gmail.com`;
  } else {
    email = props.name;
  }
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
          <div className={style.description_div}></div>
          <a
            href={`mailto:${email}`}
            className={`${style.description_text__outline} scale `}
          >
            {email}
          </a>
          {props.phone_number && (
            <a
              href={`tel:${props.phone_number}`}
              className={`${style.description_text} scale `}
            >
              {props.phone_number}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
