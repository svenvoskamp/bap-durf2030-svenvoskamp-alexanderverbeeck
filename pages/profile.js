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

import Notifications from '../components/Profile/Notifications/Notifications';

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
          user_id
          pending
          need
          motivation
        }
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
  console.log(props);
  return (
    <>
      <Mouse></Mouse>
      {/* <Nav user={props}></Nav> */}
      <Info props={props}></Info>
      <div>
        <button onClick={(e) => setContent(0)}>Mijn Projecten</button>
        <button onClick={(e) => setContent(1)}>Notificaties</button>
      </div>
      {content == 0 && <MyProjects props={props}></MyProjects>}
      {content == 1 && <Notifications props={props}></Notifications>}
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
    return <Loading props={'gebruiker'} />;
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
    return <Profile props={data.users[0]} />;
  }
};

const getUser = () => {
  const router = useRouter();
  const { user, loading } = useFetchUser();

  if (loading) {
    return <Loading props={'gebruiker'} />;
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
