import React from "react";
import style from "./header.module.css";

const Header = ({ props }) => {
  return (
    <>
      <div className={style.project}>
        <div className={style.project_header}>
          <div className={style.project_tags}>
            <p className={style.card_tag}>{props.theme.theme}</p>
            <p className={style.card_tag}>{props.category.category}</p>
          </div>
          <h1 className={style.title}>
            {props.title}
            <span className={style.title_outline}>
              {props.user.company && <>{props.user.company_name}</>}
              {!props.user.company && (
                <>
                  {props.user.first_name} {props.user.last_name}
                </>
              )}
            </span>
          </h1>
          <div className={style.project_subtitles}>
            <div className={`${style.info_phase} ${style.info_item}`}>
              {props.phase.phase == "Conceptvoorstel" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_concept}`}
                  ></div>
                </>
              )}
              {props.phase.phase == "Co-creatie" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_creatie}`}
                  ></div>
                </>
              )}
              {props.phase.phase == "Crowdfunding" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_crowdfunding}`}
                  ></div>
                </>
              )}
              {props.phase.phase == "Realisatie" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_realisatie}`}
                  ></div>
                </>
              )}
              <p className={`${style.info_text} ${style.info_light}`}>
                {props.phase.phase}
              </p>
            </div>
            <div className={`${style.info_location} ${style.info_item}`}>
              <img src="../assets/images/project_location_icon.svg" />
              <p className={`${style.info_text} ${style.info_light}`}>
                {props.district.district}
              </p>
            </div>
            {props.user.company && (
              <div className={`${style.info_location} ${style.info_item}`}>
                <img src="../assets/images/small_person_icon.svg" />
                <p className={`${style.info_text} ${style.info_light}`}>
                  {props.user.first_name} {props.user.last_name}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={style.extra_mobile}>
          <div className={style.extra_image}>
            <img
              className={style.project_image}
              src={props.image}
              alt={props.title}
              loading="lazy"
            />
          </div>
          <div classname={style.extra_tagline}>
            <p className={style.tagline_text}>"{props.tagline}"</p>
            <svg
              className={`${
                style.tagline_image
              } tagline-image--${props.phase.phase.toLowerCase()} `}
              width="56"
              height="42"
              viewBox="0 0 56 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9 17.7001C21.9667 18.7 23.5667 20.1667 24.7 22.1C25.8333 23.9667 26.4 26.2001 26.4 28.8001C26.4 32.6667 25.1667 35.7667 22.7 38.1001C20.2333 40.4334 17.0667 41.6001 13.2 41.6001C9.33333 41.6001 6.16667 40.4334 3.7 38.1001C1.23333 35.7667 0 32.6667 0 28.8001C0 27.0667 0.233333 25.3334 0.7 23.6001C1.16667 21.8667 2.23333 19.2334 3.9 15.7L10.9 0.800049H24.9L19.9 17.7001ZM48.9 17.7001C50.9667 18.7 52.5667 20.1667 53.7 22.1C54.8333 23.9667 55.4 26.2001 55.4 28.8001C55.4 32.6667 54.1667 35.7667 51.7 38.1001C49.2333 40.4334 46.0667 41.6001 42.2 41.6001C38.3333 41.6001 35.1667 40.4334 32.7 38.1001C30.2333 35.7667 29 32.6667 29 28.8001C29 27.0667 29.2333 25.3334 29.7 23.6001C30.1667 21.8667 31.2333 19.2334 32.9 15.7L39.9 0.800049H53.9L48.9 17.7001Z"
                fill="#4FC8B1"
              />
            </svg>
          </div>
        </div>
        <div className={style.project_description}>
          <p className={style.description_bold}> {props.impact}</p>
          <p className={style.description_light}>{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
