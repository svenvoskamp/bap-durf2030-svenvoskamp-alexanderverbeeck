import React, { useState } from 'react';
// import NeedsList from "../../NeedsList/NeedsList";
import style from './Profile/SelectedProject/selected.project.module.css';

import styles from '../../css/profile.module.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_DATA = gql`
  query MyQuery {
    users {
      first_name
      last_name
      id
      projects {
        id
        phase_id
        title
        phase {
          phase
        }
        image
        create_finished
        impact
        category {
          category
          id
        }
        category_id
        description
        district {
          district
          id
        }
        user {
          id
          first_name
          last_name
        }
        needs {
          id
          need
          type
        }
        tagline
        theme {
          theme
        }
      }
    }
  }
`;

const REMOVE_PROJECT = gql`
  mutation removeProject($id: Int!) {
    delete_needs(where: { project_id: { _eq: $id } }) {
      affected_rows
    }
    delete_projects(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation createProject($id: Int!) {
    update_projects(where: { id: { _eq: $id } }, _set: { phase_id: 2 }) {
      affected_rows
    }
  }
`;

const SET_PROJECT_BACK = gql`
  mutation createProject($id: Int!) {
    update_projects(
      where: { id: { _eq: $id } }
      _set: { create_finished: false }
    ) {
      affected_rows
    }
  }
`;

const FUND_PROJECT = gql`
  mutation createProject($id: Int!) {
    update_projects(where: { id: { _eq: $id } }, _set: { phase_id: 3 }) {
      affected_rows
    }
  }
`;

const Project = ({ project, setCurrentProject }) => {
  const [removeProject] = useMutation(REMOVE_PROJECT);
  const [coCreateProject] = useMutation(CREATE_PROJECT);
  const [setBackProject] = useMutation(SET_PROJECT_BACK);
  const [fundProject] = useMutation(FUND_PROJECT);
  let projectNeeds = [];

  const handleClick = (e, choose, project) => {
    e.preventDefault();
    if (choose == 'x' && project.phase_id == 1) {
      removeProject({
        variables: { id: project.id },
        optimisticResponse: true,
        update: (cache) => {
          const cachedData = cache.readQuery({
            query: GET_DATA,
          });

          const newUser = cachedData.users.map((u) => {
            const length = u.projects.length;
            u.projects.map((p) => {
              if (p.id !== project.id) {
                u.projects.push(p);
              }
            });
            u.projects.splice(0, length);
            return u;
          });
          console.log(newUser);
          cache.writeQuery({
            query: GET_DATA,
            data: {
              users: newUser,
            },
          });
        },
      });
    }
    if (choose == 'v' && project.phase_id == 1) {
      coCreateProject({
        variables: { id: project.id },
        optimisticResponse: true,
        update: (cache) => {
          const cachedData = cache.readQuery({
            query: GET_DATA,
          });

          const newUser = cachedData.users.map((u) => {
            const length = u.projects.length;
            u.projects.map((p) => {
              if (p.id == project.id) {
                p.phase_id = 2;
                u.projects.push(p);
              } else {
                u.projects.push(p);
              }
            });
            u.projects.splice(0, length);
            return u;
          });
          console.log(newUser);
          cache.writeQuery({
            query: GET_DATA,
            data: {
              users: newUser,
            },
          });
        },
      });
    }
    if (choose == 'x' && project.phase_id == 2) {
      setBackProject({
        variables: { id: project.id },
        optimisticResponse: true,
        update: (cache) => {
          const cachedData = cache.readQuery({
            query: GET_DATA,
          });

          const newUser = cachedData.users.map((u) => {
            const length = u.projects.length;
            u.projects.map((p) => {
              if (p.id == project.id) {
                p.create_finished = false;
                u.projects.push(p);
              } else {
                u.projects.push(p);
              }
            });
            u.projects.splice(0, length);
            return u;
          });
          console.log(newUser);
          cache.writeQuery({
            query: GET_DATA,
            data: {
              users: newUser,
            },
          });
        },
      });
    }
    if (choose == 'v' && project.phase_id == 2) {
      fundProject({
        variables: { id: project.id },
        optimisticResponse: true,
        update: (cache) => {
          const cachedData = cache.readQuery({
            query: GET_DATA,
          });

          const newUser = cachedData.users.map((u) => {
            const length = u.projects.length;
            u.projects.map((p) => {
              if (p.id == project.id) {
                p.phase_id = 3;
                u.projects.push(p);
              } else {
                u.projects.push(p);
              }
            });
            u.projects.splice(0, length);
            return u;
          });
          console.log(newUser);
          cache.writeQuery({
            query: GET_DATA,
            data: {
              users: newUser,
            },
          });
        },
      });
    }
    setCurrentProject('');
  };

  return (
    <div className={style.part_content}>
      <div className={`${styles.grid_selectedproject} ${styles.grid_titles}`}>
        <button
          className={`${style.button_back} scale`}
          onClick={(e) => setCurrentProject('')}
        >
          <img
            className={style.back_image}
            src="./assets/images/button_back.svg"
          />
          <span className={style.back_text}>Terug</span>
        </button>
        <div className={style.part_header}>
          <p className={`${styles.grid_title} ${style.title_outline} `}>
            {project.title}
          </p>
          <div className={style.header_buttons}>
            <button
              className={`${style.header_button} scale`}
              onClick={(e) => handleClick(e, 'v', project)}
            >
              <img
                className={style.back_image}
                src="./assets/admin/admin_accept_icon.svg"
              />
              <p className={style.header_button__text}>Akkoord</p>
            </button>
            <button
              className={`${style.header_button} scale`}
              onClick={(e) => handleClick(e, 'x', project)}
            >
              <img
                className={style.back_image}
                src="./assets/admin/admin_decline_icon.svg"
              />
              <p className={style.header_button__text}>Afwijzen</p>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.grid_selectedproject__items} ${style.grid_selectedproject__items}`}
      >
        <div classname={style.grid_item__image}>
          <img
            className={style.grid_image}
            src={project.image}
            alt={project.title}
          />
          <div className={style.grid_tags}>
            <p className={style.grid_tag}>{project.theme.theme}</p>
            <p className={style.grid_tag}>{project.category.category}</p>
          </div>
        </div>

        <div classname={style.grid_item__info}>
          <p className={style.grid_tagline}>"{project.tagline}"</p>
          {/* <p className={style.title}>{project.title}</p>
          <p className={style.title_outline}>
            {project.user.first_name} {project.user.last_name}
          </p> */}
          <div className={style.info_items}>
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
              <p className={`${style.info_text} ${style.info_light}`}>
                {project.phase.phase}
              </p>
            </div>
            <div className={`${style.info_location} ${style.info_item}`}>
              <img src="./assets/images/project_location_icon.svg" />
              <p className={`${style.info_text} ${style.info_light}`}>
                {project.district.district}
              </p>
            </div>
          </div>
          <p className={style.description_bold}>{project.impact}</p>
          <p className={style.description_light}>{project.description}</p>
        </div>

        {/* {projectNeeds.length > 0 && (
        //   <NeedsList
        //     needs={projectNeeds}
        //     user={user}
        //     setSelectedProject={setSelectedProject}
        //     setContent={setContent}
        //   ></NeedsList>
        )}
        {projectNeeds.length == 0 && <div></div>} */}
      </div>
    </div>
  );
};

export default Project;
