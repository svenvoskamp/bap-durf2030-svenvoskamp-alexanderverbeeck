import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import style from '../css/project.module.css';


const Project = ({ project, key }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const storageRef = firebase.storage().ref();
  storageRef
    .child('images/' + project.image)
    .getDownloadURL()
    .then(function (url) {
      setLoaded(true);
      if (imgRef.current) {
        imgRef.current.src = url;
      }
    });
  return (
    <>
      {loaded && (
        <section className={style.project} key={key}>
          <a className={style.card}>
          <img className={style.card_image} ref={imgRef} alt={project.title}></img>
          <div className={style.card_titles}>
            <p className={style.card_user}>
              {project.user.first_name} {project.user.last_name}
            </p>
            <p className={style.card_title}>{project.title}</p>
          </div>
          <div className={style.card_tags}>
            <p className={style.card_tag}>{project.theme.theme}</p>
            <p className={style.card_tag}>{project.category.category}</p>
          </div>
          <div className={style.card_info}>
            <p className={`${style.info_text} ${style.info_bold}`}>{project.phase.phase}</p>
            <p className={`${style.info_text} ${style.info_light}`}>{project.district.district}</p>
            <p className={`${style.info_text} ${style.info_light}`}>{project.phase.phase}</p>
            <p className={`${style.info_text} ${style.info_light}`}>{project.district.district}</p>
          </div>
          </a>
        </section>
      )}
      {!loaded && <div>Laden</div>}
    </>
  );
};

export default Project;
