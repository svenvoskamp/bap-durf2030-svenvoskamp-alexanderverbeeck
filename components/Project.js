import React, { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
const Project = ({ project, key }) => {
  const imgRef = useRef(null);
  const storageRef = firebase.storage().ref();
  storageRef
    .child('images/' + project.image)
    .getDownloadURL()
    .then(function (url) {
      if (imgRef.current) {
        imgRef.current.src = url;
      }
    });
  return (
    <>
      <li key={key}>
        <img ref={imgRef} alt={project.title}></img>
        <p>{project.title}</p>
        <p>
          {project.user.first_name} {project.user.last_name}
        </p>
        <div>
          <p>{project.theme.theme}</p>
          <p>{project.category.cateogry}</p>
        </div>
        <div>
          <p>{project.phase.phase}</p>
          <p>{project.district.district}</p>
        </div>
      </li>
    </>
  );
};

export default Project;
