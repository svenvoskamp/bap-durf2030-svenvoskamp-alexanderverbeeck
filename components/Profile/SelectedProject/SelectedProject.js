import React, { useState } from "react";
import NeedsList from "./NeedsList/NeedsList";
import AddNeed from "./AddNeed/AddNeed";
import style from "./selectedproject.module.css";
import Empty from "../../Empty/Empty";
import styles from "../../../css/profile.module.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_USER_DATA = gql`
  query getUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      company
      company_name
      first_name
      last_name
      id
      last_name
      phone_number
      sector
      picture
      department
      donations(order_by: { created_at: asc }) {
        id
        created_at
        amount
        reward
        updated_at
        user {
          first_name
          last_name
        }
        project_id
        user_id
      }
      projects {
        id
        category {
          category
        }
        district {
          district
        }
        image
        impact
        tagline
        description
        reward_one
        reward_two
        reward_three
        create_finished
        donated
        phase_id
        phase {
          phase
        }
        theme {
          theme
        }
        user {
          id
          first_name
          last_name
        }
        needs {
          id
          type
          need
        }
        title
      }
    }
    needs(order_by: { pending: desc, provided: asc }) {
      id
      type
      motivation
      need
      user_id
      provided
      other_user_id
      project_id
      otheruser {
        id
        first_name
        last_name
      }
      pending
      project {
        title
      }
    }
    feedbacks {
      id
      type
      motivation
      user_id
      other_user_id
      accepted
      pending
      otheruser {
        id
        first_name
        last_name
      }

      project {
        title
      }
    }
  }
`;

const TOGGLE_PROJECT = gql`
  mutation toggleProject($id: Int!) {
    update_projects(
      where: { id: { _eq: $id } }
      _set: { create_finished: true }
    ) {
      affected_rows
    }
  }
`;

const SelectedProject = ({
  project,
  setSelectedProject,
  needs,
  user,
  setContent,
}) => {
  let projectNeeds = [];
  const [toggleProject] = useMutation(TOGGLE_PROJECT);
  const [update, setUpdate] = useState("");

  needs.map((need) => {
    if (need.user_id == project.user.id) {
      if (need.project_id == project.id) {
        projectNeeds.push(need);
      }
    }
  });

  const handleClick = () => {
    toggleProject({
      variables: { id: project.id },
      optimisticResponse: true,
      update: (cache) => {
        const cachedData = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
        });

        const newUser = cachedData.users.map((u) => {
          const length = u.projects.length;
          u.projects.map((p) => {
            if (p.id === project.id) {
              p.create_finished = true;
              u.projects.push(p);
            } else {
              u.projects.push(p);
            }
          });
          u.projects.splice(0, length);
          return u;
        });

        cache.writeQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
          data: {
            needs: cachedData.needs,
            users: newUser,
            feedbacks: cachedData.feedbacks,
          },
        });
      },
    });
    setUpdate(1);
  };

  return (
    <div className={style.part_content}>
      <div className={`${styles.grid_selectedproject} ${styles.grid_titles}`}>
        <button
          className={style.button_back}
          onClick={(e) => setSelectedProject("")}
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
          {project.phase_id != 1 && (
            <a
              className={`${style.header_button} scale`}
              href={`/detail/${project.id}`}
            >
              <img
                className={style.back_image}
                src="./assets/profiel/profiel_bekijken.svg"
              />
              <p className={style.header_button__text}>Naar detail</p>
            </a>
          )}
          {project.phase_id == 2 && project.create_finished == false && (
            <button
              className={`${style.header_button} scale`}
              onClick={handleClick}
            >
              <img
                className={style.back_image}
                src="./assets/profiel/profiel_doorsturen.svg"
              />
              <p className={style.header_button__text}>inzenden voor jury</p>
            </button>
          )}
          {update == 1 && (
            <p>We nemen zo spoedig mogelijk contact op voor de jury!</p>
          )}
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

        {projectNeeds.length > 0 && (
          <NeedsList
            needs={projectNeeds}
            user={user}
            setSelectedProject={setSelectedProject}
            setContent={setContent}
          ></NeedsList>
        )}
        {projectNeeds.length == 0 && <div></div>}
        <AddNeed project={project} user={user}></AddNeed>
      </div>
    </div>
  );
};

export default SelectedProject;
