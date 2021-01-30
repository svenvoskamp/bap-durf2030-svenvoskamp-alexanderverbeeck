import React from 'react';
import style from './notifications.module.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Empty from '../../Empty/Empty';
import styles from '../../../css/profile.module.css';


const TOGGLE_NEED = gql`
  mutation toggleNeed(
    $id: Int!
    $provided: Boolean!
    $pending: Boolean
    $other_user_id: String
  ) {
    update_needs(
      where: { id: { _eq: $id } }
      _set: {
        provided: $provided
        pending: $pending
        other_user_id: $other_user_id
      }
    ) {
      affected_rows
    }
  }
`;

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
      motivation
      need
      user_id
      provided
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

const Notifications = ({ props, user }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  let needNotifications = [];
  props.map((need) => {
    if (need.user_id == user.id) {
      if (need.pending == true) {
        needNotifications.push(need);
      }
    }
  });

  const handleClick = (e, choose, need) => {
    e.preventDefault();
    let pending = false;
    let state;
    let other_user_id;
    if (choose == 'x') {
      other_user_id = null;
      state = false;
    } else {
      other_user_id = need.otheruser.id;
      state = true;
    }
    toggleNeed({
      variables: {
        id: need.id,
        provided: state,
        pending: pending,
        other_user_id: other_user_id,
      },
      optimisticResponse: true,
      update: (cache) => {
        const cachedData = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
        });

        const newNeeds = cachedData.needs.map((n) => {
          if (n.id === need.id) {
            return { ...n, pending: !n.pending };
          } else {
            return n;
          }
        });

        cache.writeQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
          data: { needs: newNeeds, users: cachedData.users },
        });

        // const newNeed = data['insert_needs'].returning[0];
        // cache.writeQuery({
        //   query: GET_NEEDS_BY_PROJECT,
        //   variables: { id },
        //   data: {
        //     ...cachedData,
        //     needs: [newNeed, ...cachedData.needs],
        //   },
        // });
      },
    });
  };

  return (
    <>
      <div>
        {needNotifications.length < 1 && <Empty props={'notificaties'} />}
        {needNotifications.length > 0 && (
          <>
          <div className={`${styles.grid} ${styles.grid_titles}`}>
            <p className={styles.grid_title}>Projectnaam</p>
            <p className={styles.grid_title}>Type</p>
            <p className={styles.grid_title}>Druver</p>
            <p className={styles.grid_title}>Akkoord</p>
            </div>
            {needNotifications.map((need) => (
              <div className={styles.grid}>
                  <p>{need.project.title}</p>
                  <p>{need.need}</p>
                  <p>
                    {need.otheruser.first_name} {need.otheruser.last_name}
                  </p>
                  <p>{need.motivation}</p>
                  <div className={styles.buttons}>
                    <button onClick={(e) => handleClick(e, 'v', need)}>V</button>
                    <button onClick={(e) => handleClick(e, 'x', need)}>X</button>
                  </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Notifications;
