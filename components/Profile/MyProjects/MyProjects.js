import React from "react";
import projects from "../../../pages/projects";
import style from "../../../css/project.module.css";
import styles from "./myprojects.module.css";
import Empty from "../../Empty/Empty";
import MyProject from "./MyProject/MyProject";

const MyProjects = ({ props, setSelectedProject, selectedProject, needs }) => {
  console.log(props);
  return (
    <>
      <section>
        <div className={style.part_content}>
          {props.projects.length == 0 && <Empty props={"mijnprojecten"} />}
          {props.projects.length > 0 && (
            <div className={styles.projecten}>
              {props.projects.map((project) => (
                <>
                  <MyProject
                    project={project}
                    setSelectedProject={setSelectedProject}
                    needs={needs}
                    props={props}
                  ></MyProject>
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyProjects;
