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
            <img
              className={style.tagline_image}
              src="../assets/images/quotes.svg"
              alt="upload hier"
            />
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
