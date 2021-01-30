import React from 'react';
import projects from '../../../pages/projects';
import style from '../../../css/project.module.css';
import styles from './myprojects.module.css';
import Empty from '../../Empty/Empty';

const MyProjects = ({ props }) => {
  console.log(props);
  return (
    <div className={styles.projecten}>
      <section className={style.project}>
        <div className={style.part_content}>
          {props.projects.length == 0 && (
            <div className={style.empty_state}>
              <p className={style.empty_state__text}>
                je hebt
                <span className={style.empty_state__text__outline}> geen </span>
                notificaties.
              </p>
              <div className={style.empty_state__buttons}>
                <a
                  href={'/create-project'}
                  className={`${style.empty_state__button} scale`}
                >
                  Maak zelf een project
                </a>
              </div>
            </div>
          )}
          {props.projects.length > 0 && (
            <div>
              {props.projects.map((project) => (
                <>
                  {/* <img alt={project.title} src={project.image}></img>
                <p>
                  {props.first_name} {props.last_name}
                </p>
                <p>{project.theme.theme}</p>
                <p>{project.category.theme}</p>

                <p>{project.title}</p>
                <p>{project.phase.phase}</p>
                <p>{project.district.district}</p> */}
                  <a
                    href={'/detail/' + project.id}
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
                        <p className={style.card_tag}>
                          {project.category.category}
                        </p>
                      </div>
                      <div className={style.card_info}>
                        <div
                          className={`${style.info_fase} ${style.info_item}`}
                        >
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
                          <p
                            className={`${style.info_text} ${style.info_bold}`}
                          >
                            {project.phase.phase}
                          </p>
                        </div>
                        <div
                          className={`${style.info_location} ${style.info_item}`}
                        >
                          <img src="./assets/images/project_location_icon.svg" />
                          <p
                            className={`${style.info_text} ${style.info_light}`}
                          >
                            {project.district.district}
                          </p>
                        </div>
                        {project.needs.length > 0 && (
                          <div
                            className={`${style.info_needs} ${style.info_item}`}
                          >
                            {project.needs.length > 2 && (
                              <>
                                <div className={style.needs_text}>
                                  {project.needs.slice(0, 2).map((need) => (
                                    <div className={style.need}>
                                      {need.type == 'Gebouw' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/gebouw_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Eten' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/eten_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Persoon' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/persoon_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Item' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/item_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Drank' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/drank_icon__small.svg"
                                          />
                                        </>
                                      )}
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
                            {project.needs.length <= 2 &&
                              project.needs.length > 0 && (
                                <>
                                  {project.needs.map((need) => (
                                    <div className={style.need}>
                                      {need.type == 'Gebouw' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/gebouw_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Eten' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/eten_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Persoon' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/persoon_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Item' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/item_icon__small.svg"
                                          />
                                        </>
                                      )}
                                      {need.type == 'Drank' && (
                                        <>
                                          <img
                                            className={style.need_image}
                                            src="./assets/images/drank_icon__small.svg"
                                          />
                                        </>
                                      )}
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
                        <div
                          className={`${style.info_crowdfunding} ${style.info_item}`}
                        >
                          <img src="./assets/images/project_crowdfunding_icon.svg" />
                          <p
                            className={`${style.info_text} ${style.info_light}`}
                          >
                            {project.district.district}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyProjects;
