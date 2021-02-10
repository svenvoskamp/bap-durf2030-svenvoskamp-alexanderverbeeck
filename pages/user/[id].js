import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchUser } from '../../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../../lib/withApollo';
import Loading from '../../components/Loading/Loading';
import Mouse from '../../components/Mouse';
import style from '../../css/profile.module.css';
import Info from '../../components/User/Info/Info';
import UserProjects from '../../components/User/UserProjects/UserProjects';
import Nav from '../../components/Nav';
import Contributes from '../../components/User/Contributes/Contributes';

const GET_USER_DATA = gql`
  query getUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      name
      nickname
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

const User = ({ props }) => {
  const [content, setContent] = useState(0);
  const { user, loading } = useFetchUser();

  const router = useRouter();

  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <article className={style.part}>
        <Info props={props.users[0]}></Info>
        <div className={style.tabs}>
          {content == 0 && (
            <>
              <button
                className={`${style.tabs_title} ${style.tabs_title__active} scale`}
                onClick={(e) => setContent(0)}
              >
                Projecten
              </button>
              <button
                className={`${style.tabs_title} scale`}
                onClick={(e) => setContent(1)}
              >
                Bijdragen
              </button>
            </>
          )}
          {content == 1 && (
            <>
              <button
                className={`${style.tabs_title}  scale`}
                onClick={(e) => setContent(0)}
              >
                Projecten
              </button>
              <button
                className={`${style.tabs_title} ${style.tabs_title__active} scale`}
                onClick={(e) => setContent(1)}
              >
                Bijdragen
              </button>
            </>
          )}
        </div>
        {content == 0 && (
          <UserProjects
            props={props.users[0]}
            needs={props.users[0].needs}
          ></UserProjects>
        )}

        {content == 1 && (
          <Contributes
            user={props.users[0]}
            needs={props.needs}
            feedbacks={props.users[0].feedbacks}
          ></Contributes>
        )}
      </article>
    </>
  );
};

const getUser = ({}) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { id: router.query.id },
  });
  if (loading) {
    return <Loading props={'profiel'} />;
  }
  if (error) {
    console.log(error);
  }

  if (!data.users[0] && !loading) {
    router.push('/');
    return <></>;
  }
  if (!data.users[0].first_name && !loading) {
    router.push('/');
    return <></>;
  }
  if (data.users[0].first_name && !loading) {
    return <User props={data} />;
  }
};

export default withApollo({ ssr: true })(getUser);
