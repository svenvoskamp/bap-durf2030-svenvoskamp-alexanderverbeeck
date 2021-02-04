import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import Loading from '../components/Loading/Loading';
import Info from '../components/Profile/Info/Info';
import Mouse from '../components/Mouse';
import Nav from '../components/Nav';
import MyProjects from '../components/Profile/MyProjects/MyProjects';
import style from '../css/profile.module.css';

import Notifications from '../components/Profile/Notifications/Notifications';
import Requests from '../components/Profile/Requests/Requests';
import Contributes from '../components/Profile/Contributes/Contributes';
import SelectedProject from '../components/Profile/SelectedProject/SelectedProject';

const GET_USER_DATA = gql`
  query getUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      company
      company_name
      first_name
      last_name
      id
      last_name
      phone_number
      sector
      picture
      department
      donations(order_by: { created_at: asc }) {
        id
        created_at
        amount
        reward
        updated_at
        user {
          first_name
          last_name
        }
        project_id
        user_id
      }
      projects {
        id
        category {
          category
        }
        district {
          district
        }
        image
        impact
        tagline
        description
        reward_one
        reward_two
        reward_three
        create_finished
        donated
        crowdfunding_finished
        speech
        phase_id
        phase {
          phase
        }
        theme {
          theme
        }
        user {
          id
          first_name
          last_name
        }
        needs {
          id
          type
          need
        }
        title
      }
    }
    needs(order_by: { pending: desc, provided: asc }) {
      id
      type
      motivation
      need
      user_id
      provided
      other_user_id
      project_id
      otheruser {
        id
        first_name
        last_name
      }
      pending
      project {
        title
      }
    }
    feedbacks {
      id
      type
      motivation
      user_id
      other_user_id
      accepted
      pending
      otheruser {
        id
        first_name
        last_name
      }

      project {
        title
      }
    }
  }
`;

const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      password
      picture
      first_name
    }
  }
`;

const Profile = ({ props }) => {
  console.log(props);
  const [content, setContent] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  let incoming = [];
  let outgoing = [];
  props.needs.map((need) => {
    if (need.user_id == props.users[0].id) {
      if (need.pending == true) {
        incoming.push(need);
      }
    }
  });
  props.feedbacks.map((feedback) => {
    if (feedback.user_id == props.users[0].id) {
      if (feedback.pending == true) {
        incoming.push(feedback);
      }
    }
  });
  props.users[0].projects.map((project) => {
    if (project.phase_id == 3) {
      if (!project.reward_one) {
        incoming.push(project);
      }
      if (project.donated > 1500 && project.crowdfunding_finished == false) {
        incoming.push(project);
      }
    }
  });
  props.needs.map((need) => {
    if (need.other_user_id == props.users[0].id) {
      if (need.pending == true) {
        outgoing.push(need);
      }
    }
  });

  props.feedbacks.map((feedback) => {
    if (feedback.other_user_id == props.users[0].id) {
      if (feedback.pending == true) {
        outgoing.push(feedback);
      }
    }
  });

  return (
    <>
      <Mouse></Mouse>
      <Nav user={props.users[0]}></Nav>
      <article className={style.part}>
        <Info props={props.users[0]}></Info>
        <div className={style.tabs}>
          {content == 0 && (
            <>
              <button
                className={`${style.tabs_title} ${style.tabs_title__active} scale`}
                onClick={(e) => setContent(0)}
              >
                Mijn Projecten
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(1)}
              >
                Mijn Bijdragen
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(2)}
              >
                Inkomend ({incoming.length})
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(3)}
              >
                Uitgaand ({outgoing.length})
              </button>
            </>
          )}
          {content == 1 && (
            <>
              <button
                className={`${style.tabs_title}  scale`}
                onClick={(e) => setContent(0)}
              >
                Mijn Projecten
              </button>
              <button
                className={`${style.tabs_title} ${style.tabs_title__active} scale`}
                onClick={(e) => setContent(1)}
              >
                Mijn Bijdragen
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(2)}
              >
                Inkomend ({incoming.length})
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(3)}
              >
                Uitgaand ({outgoing.length})
              </button>
            </>
          )}
          {content == 2 && (
            <>
              <button
                className={`${style.tabs_title}  scale`}
                onClick={(e) => setContent(0)}
              >
                Mijn Projecten
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(1)}
              >
                Mijn Bijdragen
              </button>
              <button
                className={`${style.tabs_title}  ${style.tabs_title__active} scale`}
                onClick={(e) => setContent(2)}
              >
                Inkomend ({incoming.length})
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(3)}
              >
                Uitgaand ({outgoing.length})
              </button>
            </>
          )}
          {content == 3 && (
            <>
              <button
                className={`${style.tabs_title}  scale`}
                onClick={(e) => setContent(0)}
              >
                Mijn Projecten
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(1)}
              >
                Mijn Bijdragen
              </button>
              <button
                className={`${style.tabs_title}   scale`}
                onClick={(e) => setContent(2)}
              >
                Inkomend ({incoming.length})
              </button>
              <button
                className={`${style.tabs_title} ${style.tabs_title__active} scale`}
                onClick={(e) => setContent(3)}
              >
                Uitgaand ({outgoing.length})
              </button>
            </>
          )}
        </div>
        {content == 0 && selectedProject == '' && (
          <MyProjects
            props={props.users[0]}
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
            needs={props.needs}
          ></MyProjects>
        )}
        {content == 0 && selectedProject != '' && (
          <>
            <SelectedProject
              project={selectedProject}
              needs={props.needs}
              user={props.users[0]}
              setSelectedProject={setSelectedProject}
              setContent={setContent}
            ></SelectedProject>
          </>
        )}
        {content == 1 && (
          <Contributes
            user={props.users[0]}
            props={props.needs}
            feedbacks={props.feedbacks}
          ></Contributes>
        )}
        {content == 2 && (
          <Notifications
            user={props.users[0]}
            props={props.needs}
            feedbacks={props.feedbacks}
            projects={props.users[0].projects}
          ></Notifications>
        )}
        {content == 3 && (
          <Requests
            user={props.users[0]}
            props={props.needs}
            feedbacks={props.feedbacks}
          ></Requests>
        )}
      </article>
    </>
  );
};

const GetCurrentUser = ({ props }) => {
  console.log(props);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id: props.sub },
  });
  if (loading) {
    return <Loading props={'profiel'} />;
  }
  if (error) {
    console.log(error);
  }
  console.log(data);
  if (!data.users[0].first_name && !loading) {
    router.push('/register');
    return <></>;
  }
  if (data.users[0].first_name && !loading) {
    return <Profile props={data} />;
  }
};

const getUser = () => {
  const router = useRouter();
  const { user, loading } = useFetchUser();

  if (loading) {
    return <Loading props={'profiel'} />;
  }
  if (!loading && user) {
    return <GetCurrentUser props={user} />;
  }
  if (!user && !loading) {
    router.push('/api/login');
    return <></>;
  }
};
export default withApollo({ ssr: true })(getUser);
