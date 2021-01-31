import React from 'react';
import NeedsList from './NeedsList/NeedsList';
import AddNeed from './AddNeed/AddNeed';
import style from './selectedproject.module.css';
import Empty from '../../Empty/Empty';
import styles from '../../../css/profile.module.css';
const SelectedProject = ({ project, setSelectedProject, needs, user }) => {
  let projectNeeds = [];

  needs.map((need) => {
    if (need.user_id == project.user.id) {
      if (need.project_id == project.id) {
        projectNeeds.push(need);
      }
    }
  });

  return (
    <div className={style.part_content}>
      <div className={`${styles.grid_selectedproject} ${styles.grid_titles}`}>
        <button className={style.button_back} onClick={(e) => setSelectedProject('')}>
            <img className={style.back_image} src="./assets/images/button_back.svg" />
            <span className={style.back_text}>Terug</span>  
          </button>
        <p className={`${styles.grid_title} ${style.title_outline} `}>{project.title}</p>
      </div>

      <div className={`${styles.grid_selectedproject__items} ${style.grid_selectedproject__items}`}>
        <div classname={`${style.grid_item} ${style.grid_item__image}`}>
          <img className={style.grid_image} src={project.image} alt={project.title} />
          <div className={style.grid_tags}>
            <p className={style.grid_tag}>{project.theme.theme}</p>
            <p className={style.grid_tag}>{project.category.category}</p>
          </div>
        </div>

        <div classname={`${style.grid_item} ${style.grid_item__info}`}>
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

        {projectNeeds.length > 0 && (
          <NeedsList needs={projectNeeds} user={user}></NeedsList>
        )}
        {/* {projectNeeds.length == 0 && (
            <Empty props={'noneeds'} />
        )} */}
        <AddNeed project={project} user={user}></AddNeed>
      </div>
    </div>
  );
};

export default SelectedProject;
