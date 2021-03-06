import React, { lazy, useRef, useState } from "react";
import style from "./empty.module.css";

const Empty = ({ props }) => {
  return (
    <>
      {props == "mijnprojecten" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            Je hebt nog{" "}
            <span className={style.empty_state__text__outline}>geen</span>{" "}
            projecten.
          </p>
          <div className={style.empty_state__buttons}>
            <a
              href={"/create-project"}
              className={`${style.empty_state__button} scale`}
            >
              Maak zelf een project
            </a>
          </div>
        </div>
      )}

      {props == "andereprojecten" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            Er zijn nog{" "}
            <span className={style.empty_state__text__outline}>geen</span>{" "}
            projecten beschikbaar.
          </p>
        </div>
      )}
      {props == "needsincoming" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt{" "}
            <span className={style.empty_state__text__outline}> geen </span>{" "}
            inkomende benodigdheden.
          </p>
        </div>
      )}
      {props == "feedbackincoming" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt{" "}
            <span className={style.empty_state__text__outline}> geen </span>{" "}
            inkomende feedback.
          </p>
        </div>
      )}
      {props == "projectincoming" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt{" "}
            <span className={style.empty_state__text__outline}> geen </span>{" "}
            inkomende projectupdates.
          </p>
        </div>
      )}
      {props == "noadmin" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            Er zijn{" "}
            <span className={style.empty_state__text__outline}> geen </span>{" "}
            inkomende notificaties.
          </p>
        </div>
      )}
      {props == "emptyoption" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            Selecteer een{" "}
            <span className={style.empty_state__text__outline}> Optie </span>{" "}
          </p>
        </div>
      )}
      {props == "noneedsnofeedback" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt{" "}
            <span className={style.empty_state__text__outline}> geen </span>{" "}
            inkomende berichten.
          </p>
        </div>
      )}
      {props == "inafwachting" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt{" "}
            <span className={style.empty_state__text__outline}> geen </span>{" "}
            lopende aanvragen.
          </p>
        </div>
      )}
      {props == "noneeds" && (
        <div className={style.empty_state}>
          <p className={style.empty_state__text}>
            je hebt{" "}
            <span className={style.empty_state__text__outline}> nog geen </span>{" "}
            benodigdheden.
          </p>
        </div>
      )}
    </>
  );
};

export default Empty;
