import React, { useRef, useEffect, useState } from 'react';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';

import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Nav from '../components/Nav';
import Loading from '../components/Loading/Loading';
import Mouse from '../components/Mouse';
import style from '../css/admin.module.css';
import styles from '../css/profile.module.css';
import Project from '../components/Admin/project';
import Empty from '../components/Empty/Empty';

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
          pending
          provided
          other_user_id
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

const Admin = ({ props, user }) => {
  const [currentProject, setCurrentProject] = useState('');
  const [removeProject] = useMutation(REMOVE_PROJECT);
  const [coCreateProject] = useMutation(CREATE_PROJECT);
  const [setBackProject] = useMutation(SET_PROJECT_BACK);
  const [fundProject] = useMutation(FUND_PROJECT);

  let projects = [];
  props.users.map((user) => {
    user.projects.map((project) => {
      if (project.phase_id == 1) {
        projects.push(project);
      }
      if (project.phase_id == 2 && project.create_finished == true) {
        projects.push(project);
      }
    });
  });

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
          cache.writeQuery({
            query: GET_DATA,
            data: {
              users: newUser,
            },
          });
        },
      });
    }
  };
  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <article className={styles.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            Durf2030.
            {/* <span className={style.title_outline}>{props.last_name}.</span> */}
          </h1>
        </div>
        {currentProject == '' && (
          <>
            <>
              <div className={`${style.grid_admin} ${styles.grid_titles}`}>
                <p
                  className={`${styles.grid_title} ${styles.grid_title__left}`}
                >
                  Projectnaam
                </p>
                <p className={styles.grid_title}>Projecteigenaar</p>
                <p className={styles.grid_title}>Fase-Aanvraag</p>
                <p className={`${styles.grid_title} ${styles.grid_title__end}`}>
                  Akkoord
                </p>
              </div>
              {projects.length > 0 && (
                <>
                  {projects.map((project) => (
                    <div>
                      <div
                        className={`${styles.grid_items} ${style.grid_admin__items}`}
                      >
                        <p
                          className={`${styles.grid_bold} ${styles.grid_bold__title} scale`}
                          onClick={(e) => setCurrentProject(project)}
                        >
                          {project.title}
                        </p>
                        <a className="scale" href={`/user/${project.user.id}`}>
                          <p className={styles.grid_text}>
                            {project.user.first_name} {project.user.last_name}
                          </p>
                        </a>
                        {project.phase_id == 1 && (
                          <p className={styles.grid_text}>
                            Co-Creatie aanvraag
                          </p>
                        )}
                        {project.phase_id == 2 && (
                          <p className={styles.grid_text}>
                            Crowdfunding aanvraag
                          </p>
                        )}

                        <div className={styles.buttons}>
                          <div className={styles.need_button}>
                            <button
                              className={styles.input_submit}
                              onClick={(e) => handleClick(e, 'v', project)}
                            >
                              <div className={styles.button}>
                                <div
                                  className={`${styles.circle_button} ${styles.circle_button__accept} scale `}
                                >
                                  <img
                                    className={styles.button_image}
                                    src="../../../assets/buttons/accept_icon.svg"
                                  />
                                </div>
                              </div>
                            </button>
                          </div>
                          <div className={styles.need_button}>
                            <button
                              className={styles.input_submit}
                              onClick={(e) => handleClick(e, 'x', project)}
                            >
                              <div className={styles.button}>
                                <div
                                  className={`${styles.circle_button} ${styles.circle_button__decline} scale `}
                                >
                                  <img
                                    className={styles.button_image}
                                    src="../../../assets/buttons/decline_icon.svg"
                                  />
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {projects.length == 0 && <Empty props={'noadmin'} />}
            </>
          </>
        )}
        {currentProject != '' && (
          <Project
            project={currentProject}
            setCurrentProject={setCurrentProject}
          ></Project>
        )}
      </article>
    </>
  );
};

const GetAdminData = ({ user }) => {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) {
    return <Loading props={'gebruiker'} />;
  }
  if (error) {
    console.log(error);
  }
  return <Admin props={data} user={user} />;
};

const getUser = () => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  if (loading) {
    return <Loading props={'gebruiker'} />;
  }
  if (!loading && !user) {
    router.push('/');
    return <></>;
  }
  if (!user) {
    router.push('/');
    return <></>;
  }
  if (user && !loading) {
    if (!loading && user.sub != 'auth0|601eb3abfb308d0069b819cb') {
      router.push('/');
      return <></>;
    }
    if (!loading && user.sub == 'auth0|601eb3abfb308d0069b819cb')
      return <GetAdminData user={user}></GetAdminData>;
  }
  router.push('/');
};

export default withApollo({ ssr: true })(getUser);
