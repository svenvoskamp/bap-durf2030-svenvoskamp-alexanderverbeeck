import React from 'react';

const Notifications = ({ props }) => {
  let projectNeeds = [];
  const projects = props.projects;
  projects.map((project) => {
    if (project.needs.length > 0) {
      projectNeeds.push(project);
    }
  });
  console.log(projectNeeds);
  return (
    <>
      <p>Notificaties</p>
      <div>
        {props.projects.length == 0 && <p>Je hebt nog geen notificaties</p>}
        {projectNeeds.length == 0 && <p>Je hebt nog geen notificaties</p>}
        {projectNeeds.length != 0 && <p>Je hebt notificaties!</p>}
      </div>
    </>
  );
};

export default Notifications;
