import React from 'react';

import style from '../../../css/project.module.css';
import styles from '../../Profile/MyProjects/myprojects.module.css';
import Empty from '../../Empty/Empty';
import UserProject from './UserProject/UserProject';

const UserProjects = ({ props, needs }) => {
  console.log(props);
  return (
    <>
      <section className={style.project}>
        <div className={style.part_content}>
          {props.projects.length == 0 && <Empty props={'mijnprojecten'} />}
          {props.projects.length > 0 && (
            <div className={styles.projecten}>
              {props.projects.map((project) => (
                <>
                  {project.phase_id != 1 && (
                    <UserProject
                      project={project}
                      needs={needs}
                      props={props}
                    ></UserProject>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserProjects;
