import React, { lazy, useRef, useState } from 'react';

import style from '../css/project.module.css';
import Loading from '../components/Loading/Loading';

const Project = ({ project, key }) => {
  return (
    <>
      <section className={style.project} key={key}>
        <a href={'/detail/' + project.id} className={`${style.card} scale`}>
          <div Classname={style.project_top}>
            <img
              className={style.card_image}
              src={project.image}
              alt={project.title}
              loading={lazy}
            ></img>
            <div className={style.card_titles}>
              <p className={style.card_user}>{project.title}</p>
              {project.user.company && (
                <p className={style.card_title}>{project.user.company_name}</p>
              )}
              {!project.user.company && (
                <p className={style.card_title}>
                  {project.user.first_name} {project.user.last_name}
                </p>
              )}
            </div>
          </div>
          <div className={style.project_end}>
            <div className={style.card_tags}>
              <p className={style.card_tag}>{project.theme.theme}</p>
              <p className={style.card_tag}>{project.category.category}</p>
            </div>
            <div className={style.card_info}>
              <div className={`${style.info_fase} ${style.info_item}`}>
                {project.phase.phase == 'Conceptvoorstel' && (
                  <>
                    <div
                      className={`${style.fase_color} ${style.fase_concept}`}
                    ></div>
                  </>
                )}
                {project.phase.phase == 'Co-creatie' && (
                  <>
                    <div
                      className={`${style.fase_color} ${style.fase_creatie}`}
                    ></div>
                  </>
                )}
                {project.phase.phase == 'Crowdfunding' && (
                  <>
                    <div
                      className={`${style.fase_color} ${style.fase_crowdfunding}`}
                    ></div>
                  </>
                )}
                {project.phase.phase == 'Realisatie' && (
                  <>
                    <div
                      className={`${style.fase_color} ${style.fase_realisatie}`}
                    ></div>
                  </>
                )}
                <p className={`${style.info_text} ${style.info_bold}`}>
                  {project.phase.phase}
                </p>
              </div>
              <div className={`${style.info_location} ${style.info_item}`}>
                <img src="./assets/card/card_locatie.svg" />
                <p className={`${style.info_text} ${style.info_light}`}>
                  {project.district.district}
                </p>
              </div>
              {project.needs.length > 0 && (
                <div className={`${style.info_needs} ${style.info_item}`}>
                  {project.needs.length > 2 && (
                    <>
                      <div className={style.needs_text}>
                        {project.needs.slice(0, 2).map((need) => (
                          <div className={style.need}>
                            <img
                              src={`../../../../assets/card/card_${need.type.toLowerCase()}.svg`}
                              alt={need.need}
                              className={style.need_image}
                            />
                            <p
                              className={`${style.info_text} ${style.info_light} `}
                            >
                              {need.need}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p
                        className={`${style.info_text} ${style.info_bold} ${style.needs_number}`}
                      >
                        + {project.needs.length - 2}
                      </p>
                    </>
                  )}
                  {project.needs.length <= 2 && project.needs.length > 0 && (
                    <>
                      {project.needs.map((need) => (
                        <div className={style.need}>
                          <img
                            src={`../../../../assets/card/card_${need.type.toLowerCase()}.svg`}
                            alt={need.need}
                            className={style.need_image}
                          />
                          <p
                            className={`${style.info_text} ${style.info_light}`}
                          >
                            {need.need}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
              {project.phase.phase == 'Crowdfunding' && (
                <div
                  className={`${style.info_crowdfunding} ${style.info_item}`}
                >
                  <img src="./assets/card/card_crowdfunding.svg" />
                  <p className={`${style.info_text} ${style.info_bold}`}>
                    €{project.donated},- /
                    <span className={`${style.info_text} ${style.info_light}`}>
                      1500,-
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </a>
      </section>
    </>
  );
};

export default Project;
