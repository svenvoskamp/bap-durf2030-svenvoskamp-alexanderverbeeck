import React, { useState } from 'react';
import style from '../../../../css/project.module.css';

const UserProject = ({ props, project, needs }) => {
  let projectNeeds = [];
  needs.map((need) => {
    if (need.project_id == project.id) {
      projectNeeds.push(need);
    }
  });
  return (
    <div className={style.project}>
      <a href={`./../detail/${project.id}`} className={`${style.card} scale`}>
        <div Classname={style.project_top}>
          <img
            className={style.card_image}
            src={project.image}
            alt={project.title}
            // loading={lazy}
          ></img>
          <div className={style.card_titles}>
            <p className={style.card_user}>{project.title}</p>
            {props.company && (
              <p className={style.card_title}>{props.company_name}</p>
            )}
            {!props.company && (
              <p className={style.card_title}>
                {props.first_name} {props.last_name}
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
              <img src="../assets/images/project_location_icon.svg" />
              <p className={`${style.info_text} ${style.info_light}`}>
                {project.district.district}
              </p>
            </div>
            {projectNeeds.length > 0 && (
              <div className={`${style.info_needs} ${style.info_item}`}>
                {projectNeeds.length >= 2 && (
                  <>
                    <div className={style.needs_text}>
                      {projectNeeds.slice(0, 2).map((need) => (
                        <>
                          {need.need.length < 15 && (
                            <>
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
                            </>
                          )}
                        </>
                      ))}
                    </div>
                    <p
                      className={`${style.info_text} ${style.info_bold} ${style.needs_number}`}
                    >
                      {projectNeeds[0].need.length < 15 &&
                        projectNeeds[1].need.length > 15 && (
                          <>+ {projectNeeds.length - 1}</>
                        )}
                      {projectNeeds[1].need.length < 15 &&
                        projectNeeds[0].need.length > 15 && (
                          <>+ {projectNeeds.length - 1}</>
                        )}
                      {projectNeeds[1].need.length < 15 &&
                        projectNeeds[0].need.length < 15 && (
                          <>+ {projectNeeds.length - 2}</>
                        )}
                      {projectNeeds[0].need.length > 15 &&
                        projectNeeds[1].need.length > 15 && (
                          <>+ {projectNeeds.length}</>
                        )}
                    </p>
                  </>
                )}
                {projectNeeds.length < 2 && projectNeeds.length > 0 && (
                  <>
                    {projectNeeds.map((need) => (
                      <>
                        {need.need.length < 15 && (
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
                        )}
                        {need.need.length > 15 && (
                          <p
                            className={`${style.info_text} ${style.info_light}`}
                          >
                            Bekijk alle benodigheden
                          </p>
                        )}
                      </>
                    ))}
                  </>
                )}
              </div>
            )}
            <div className={`${style.info_crowdfunding} ${style.info_item}`}>
              <img src="../assets/images/project_crowdfunding_icon.svg" />
              <p className={`${style.info_text} ${style.info_light}`}>
                {project.district.district}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default UserProject;
