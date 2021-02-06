import React, { useState } from "react";
import style from "../../../../css/project.module.css";

const MyProject = ({ props, project, setSelectedProject, needs }) => {
  console.log(project);
  let projectNeeds = [];
  needs.map((need) => {
    if (need.user_id == props.id) {
      if (need.project_id == project.id) {
        projectNeeds.push(need);
      }
    }
  });
  return (
    <div className={style.project}>
      <a
        onClick={(e) => setSelectedProject(project)}
        className={`${style.card} scale`}
      >
        <div Classname={style.project_top}>
          <img
            className={style.card_image}
            src={project.image}
            alt={project.title}
            // loading={lazy}
          ></img>
          <div className={style.card_titles}>
            <p className={style.card_user}>
              {props.first_name} {props.last_name}
            </p>
            <p className={style.card_title}>{project.title}</p>
          </div>
        </div>
        <div className={style.project_end}>
          <div className={style.card_tags}>
            <p className={style.card_tag}>{project.theme.theme}</p>
            <p className={style.card_tag}>{project.category.category}</p>
          </div>
          <div className={style.card_info}>
            <div className={`${style.info_fase} ${style.info_item}`}>
              {project.phase.phase == "Conceptvoorstel" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_concept}`}
                  ></div>
                </>
              )}
              {project.phase.phase == "Co-creatie" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_creatie}`}
                  ></div>
                </>
              )}
              {project.phase.phase == "Crowdfunding" && (
                <>
                  <div
                    className={`${style.fase_color} ${style.fase_crowdfunding}`}
                  ></div>
                </>
              )}
              {project.phase.phase == "Realisatie" && (
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
              <img src="../../../../assets/card/card_locatie.svg" />
              <p className={`${style.info_text} ${style.info_light}`}>
                {project.district.district}
              </p>
            </div>
            {projectNeeds.length > 0 && (
              <div className={`${style.info_needs} ${style.info_item}`}>
                {projectNeeds.length > 2 && (
                  <>
                    <div className={style.needs_text}>
                      {projectNeeds.slice(0, 2).map((need) => (
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
                {projectNeeds.length <= 2 && projectNeeds.length > 0 && (
                  <>
                    {projectNeeds.map((need) => (
                      <div className={style.need}>
                        <img
                          src={`../../../../assets/card/card_${need.type.toLowerCase()}.svg`}
                          alt={need.need}
                          className={style.need_image}
                        />
                        <p className={`${style.info_text} ${style.info_light}`}>
                          {need.need}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
            {project.phase.phase == "Crowdfunding" && (
              <div className={`${style.info_crowdfunding} ${style.info_item}`}>
                <img src="./assets/card/card_crowdfunding.svg" />
                <p className={`${style.info_text} ${style.info_light}`}>
                  €{project.donated} /
                  <span className={`${style.info_text} ${style.info_bold}`}>
                    1500,00
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default MyProject;
