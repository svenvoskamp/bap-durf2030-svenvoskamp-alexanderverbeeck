import React from 'react';
import style from '../../../Create/Step3/step3.module.css';
import styles from '../../../../css/profile.module.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

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

const TOGGLE_NEED = gql`
  mutation toggleNeed($id: Int!, $provided: Boolean!) {
    update_needs(where: { id: { _eq: $id } }, _set: { provided: $provided }) {
      affected_rows
    }
  }
`;

const REMOVE_NEED = gql`
  mutation removeNeed($id: Int!) {
    delete_needs(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const NeedsList = ({ needs, user, setSelectedProject, setContent }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [removeNeed] = useMutation(REMOVE_NEED);

  const handleToggle = (need) => {
    toggleNeed({
      variables: { id: need.id, provided: !need.provided },
      optimisticResponse: true,
      update: (cache) => {
        const cachedData = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
        });
        console.log(cachedData);
        const newNeeds = cachedData.needs.map((n) => {
          if (n.id === need.id) {
            return { ...n, provided: !n.provided };
          } else {
            return n;
          }
        });
        console.log(newNeeds);
        cache.writeQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
          data: {
            needs: newNeeds,
            users: cachedData.users,
            feedbacks: cachedData.feedbacks,
          },
        });
      },
    });
  };

  const handleDelete = (need) => {
    removeNeed({
      variables: { id: need.id },
      optimisticResponse: true,
      update: (cache) => {
        const cachedData = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
        });
        console.log(cachedData);
        const newNeeds = cachedData.needs.filter((n) => n.id !== need.id);
        console.log(newNeeds);
        cache.writeQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
          data: {
            needs: newNeeds,
            users: cachedData.users,
            feedbacks: cachedData.feedbacks,
          },
        });
      },
    });
  };

  const toNotifications = () => {
    setSelectedProject('');
    setContent(2);
  };
  return (
    <div className={styles.needs}>
      <p className={`${styles.grid_title} ${style.subtitle_needs}`}>
        Mijn Benodigdheden
      </p>
      <div className={style.needs_list}>
        {needs.map((need) => (
          <div className={`${style.need_item} need-pending--${need.pending} need-item--${need.provided} need-user--${need.otheruser}`}>
            <li className={style.need_types}>
              <img
                src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
                alt={need.need}
                className={style.need_image}
              />
              <div>
              <p className={style.need_type__text}>{need.need}</p>
              {need.other_user_id && (
              <>
                {need.provided && (
                  <>
                    <p>
                      Door: {need.otheruser.first_name}{' '}
                      {need.otheruser.last_name}
                    </p>
                  </>
                )}
                {!need.provided && (
                  <>
                    <p>
                      Door: {need.otheruser.first_name}{' '}
                      {need.otheruser.last_name}
                    </p>
                  </>
                )}
              </>
            )}
              </div>
            </li>
            {!need.other_user_id && (
              <div className={style.need_buttons}>
                {need.provided && (
                  <div className={style.need_toggles}>
                    <button className={`${style.button_toggles}`}>
                      <div className={`${style.true_false} ${style.toggle_true} scale`} >
                        <img src="./assets/images/true_icon.svg" />
                      </div>
                    </button>
                    <button className={`${style.button_toggles}`} onClick={() => handleToggle(need)} >
                      <div className={`${style.true_false} scale`}>
                        <img src="./assets/images/false_icon.svg" />
                      </div>
                    </button>
                  </div>
                )}
                {!need.provided && (
                  <div className={style.need_toggles}>
                    <button className={`${style.button_toggles}`} onClick={() => handleToggle(need)}>
                      <div className={`${style.true_false} scale`}>
                        <img src="./assets/images/true_icon.svg" />
                      </div>
                    </button>
                    <button className={`${style.button_toggles}`}>
                      <div className={`${style.true_false} ${style.toggle_false} scale`} >
                        <img src="./assets/images/false_icon.svg" />
                      </div>
                    </button>
                  </div>
                )}
                <button
                  className={style.button}
                  onClick={() => handleDelete(need)}
                >
                  <img src="./assets/needs/needs_delete.svg" />
                </button>
              </div>
            )}
            {need.other_user_id && (
              <>
                {need.provided && (
                  <>
                    <div>
                        <img src="./assets/images/true_icon.svg" />
                    </div>
                  </>
                )}
                {!need.provided && (
                  <>
                    <div>
                      <img
                        onClick={toNotifications}
                        src="./assets/needs/needs_message.svg"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedsList;
