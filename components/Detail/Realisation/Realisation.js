import React, { useRef, useState } from "react";
import style from "./realisation.module.css";

const Realisation = ({ props, user }) => {
  if (props.projects[0].user.id) {
  }
  return (
    <>
      <div className={`${style.timeline} `}>
        {/* <div className="donations" data-scroll data-scroll-repeat> */}
        <div className={`${style.header}`} id="donations">
          <div className={style.part_title}>
            <p className={style.title}>
              durf.
              <span className={style.title_outline}>doneren.</span>
            </p>
            <p className={style.title_description}>
              Welkom bij de crowdfunding! Help dit project om het te laten
              realiseren.
            </p>
          </div>
        </div>
        <div>
          <p>{props.projects[0].speech}</p>
        </div>
        <div>
          <p>{props.projects[0].user.nickname}</p>
        </div>
      </div>
    </>
  );
};

export default Realisation;
