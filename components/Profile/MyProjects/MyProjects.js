import React from 'react';
import projects from '../../../pages/projects';

const MyProjects = ({ props }) => {
  console.log(props);
  return (
    <>
      <p>Projecten</p>
      <div>
        {props.projects.length == 0 && <p>Nog geen projecten</p>}
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
