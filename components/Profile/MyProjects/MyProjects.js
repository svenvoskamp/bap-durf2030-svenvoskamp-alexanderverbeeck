import React from 'react';
import projects from '../../../pages/projects';
import style from './myprojects.module.css';

const MyProjects = ({ props }) => {
  console.log(props);
  return (
    <>
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
          <>
            {props.projects.map((project) => (
              <>
                <img alt={project.title} src={project.image}></img>
                <p>
                  {props.first_name} {props.last_name}
                </p>
                <p>{project.theme.theme}</p>
                <p>{project.category.theme}</p>

                <p>{project.title}</p>
                <p>{project.phase.phase}</p>
                <p>{project.district.district}</p>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MyProjects;
