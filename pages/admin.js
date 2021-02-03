import React, { useRef, useEffect, useState } from 'react';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import Step1 from '../components/Form/Step1/Step1';
import Step2 from '../components/Form/Step2/Step2';
import { useStores } from '../hooks/index';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Nav from '../components/Nav';
import Loading from '../components/Loading/Loading';
import Mouse from '../components/Mouse';

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
          first_name
          last_name
        }
        needs {
          id
          need
          type
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
        console.log(project);
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
          console.log(newUser);
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
          console.log(newUser);
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
          console.log(newUser);
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
          console.log(newUser);
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
      {/* <Nav user={user}></Nav> */}
      {currentProject == '' && (
        <div>
          <>
            {projects.map((project) => (
              <>
                <li>
                  <p onClick={(e) => setCurrentProject(project)}>
                    {project.title}
                  </p>
                  <p>
                    {project.user.first_name} {project.user.last_name}
                  </p>
                  {project.phase_id == 1 && <p>Co-Creatie aanvraag</p>}
                  {project.phase_id == 2 && <p>Crowdfund aanvraag</p>}

                  <button onClick={(e) => handleClick(e, 'x', project)}>
                    X
                  </button>
                  <button onClick={(e) => handleClick(e, 'v', project)}>
                    V
                  </button>
                </li>
              </>
            ))}
          </>
        </div>
      )}
      {currentProject != '' && <Project project={currentProject}></Project>}
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
    if (!loading && user.sub != 'auth0|6019996f27e50e006cb10777') {
      router.push('/');
      return <></>;
    }
    if (!loading && user.sub == 'auth0|6019996f27e50e006cb10777')
      return <GetAdminData user={user}></GetAdminData>;
  }
  router.push('/');
};

export default withApollo({ ssr: true })(getUser);
