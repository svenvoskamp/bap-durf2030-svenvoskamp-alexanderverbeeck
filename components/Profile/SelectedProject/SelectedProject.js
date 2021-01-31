import React from 'react';
import NeedsList from './NeedsList/NeedsList';
import AddNeed from './AddNeed/AddNeed';
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
    <>
      <div>
        <button onClick={(e) => setSelectedProject('')}>terug</button>
        <p>Projectbeschrijving</p>
      </div>

      <div>
        <img src={project.image} alt={project.title} />
        <p>{project.theme.theme}</p>
        <p>{project.category.category}</p>
      </div>

      <div>
        <p>{project.title}</p>
        <p>
          {project.user.first_name} {project.user.last_name}
        </p>
        <p>{project.phase.phase}</p>
        <p>{project.district.district}</p>
      </div>

      <div>
        <p>{project.tagline}</p>
        <p>{project.impact}</p>
        <p>{project.description}</p>
      </div>

      {projectNeeds.length > 0 && (
        <NeedsList needs={projectNeeds} user={user}></NeedsList>
      )}
      <AddNeed project={project} user={user}></AddNeed>
    </>
  );
};

export default SelectedProject;
