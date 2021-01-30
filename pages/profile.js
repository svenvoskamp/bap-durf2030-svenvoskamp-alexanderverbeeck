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
      projects {
        category {
          category
        }
        district {
          district
        }
        image
        phase {
          phase
        }
        theme {
          theme
        }
        needs {
          id
          type
          need
        }
        title
      }
    }
    needs {
      id
      type
      motivation
      need
      user_id
      provided
      other_user_id
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
  const [content, setContent] = useState(0);
  let incoming = [];
  props.needs.map((need) => {
    if (need.user_id == props.users[0].id) {
      if (need.pending == true) {
        incoming.push(need);
      }
    }
  });

  return (
    <>
      <Mouse></Mouse>
      <Nav user={props.users[0]}></Nav>
      <article className={style.part}>
        <Info props={props.users[0]}></Info>
        <div className={style.part_content}>
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
                  Uitgaand
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
                  Uitgaand
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
                  Uitgaand
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
                  Uitgaand
                </button>
              </>
            )}
          </div>
          {content == 0 && <MyProjects props={props.users[0]}></MyProjects>}
          {content == 1 && (
            <Contributes
              user={props.users[0]}
              props={props.needs}
            ></Contributes>
          )}
          {content == 2 && (
            <Notifications
              user={props.users[0]}
              props={props.needs}
            ></Notifications>
          )}
          {content == 3 && (
            <Requests user={props.users[0]} props={props.needs}></Requests>
          )}
        </div>
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
