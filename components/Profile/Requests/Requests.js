import React from 'react';
import style from './requests.module.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const Requests = ({ props, user }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  let requests = [];
  let acceptedRequest = [];
  props.map((need) => {
    if (need.other_user_id == user.id) {
      if (need.pending == true) {
        requests.push(need);
      }
      if (need.provided == true && need.pending == false) {
        acceptedRequest.push(need);
      }
    }
  });

  const handleClick = (e, need) => {
    e.preventDefault();
    let pending = false;
    let state = false;
    let other_user_id = null;

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
      },
    });
  };
  return (
    <>
      <div>
        {requests.length < 1 && (
          <div className={style.empty_state}>
            <p className={style.empty_state__text}>
              je hebt
              <span className={style.empty_state__text__outline}> geen </span>
              lopende aanvragen.
            </p>
          </div>
        )}

        {requests.length > 0 && (
          <>
            <p>In afwachting</p>
            {requests.map((need) => (
              <>
                <li>
                  <p>{need.project.title}</p>
                  <p>{need.need}</p>
                  <p>{need.motivation}</p>
                  <button onClick={(e) => handleClick(e, need)}>X</button>
                </li>
              </>
            ))}
          </>
        )}
        <p>Goedgkeurde aanvragen</p>
        {acceptedRequest.map((need) => (
          <>
            <li>
              <p>{need.project.title}</p>
              <p>{need.need}</p>
              <p>{need.motivation}</p>
            </li>
          </>
        ))}
      </div>
    </>
  );
};

export default Requests;
