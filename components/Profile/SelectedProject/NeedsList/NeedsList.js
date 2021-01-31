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
    needs {
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

const NeedsList = ({ needs, user }) => {
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
  return (
    <div className={styles.grid_item__add}>
      <p className={`${styles.grid_title} ${style.subtitle_needs}`}>Mijn Benodigdheden</p>
      <div className={style.needs_list}>
      {needs.map((need) => (
        <div className={style.need_item}>
          <li className={style.need_types}>
            {need.type == 'Gebouw' && (
              <>
                <img
                  className={style.need_image}
                  src="./assets/images/gebouw_icon__small.svg"
                />
              </>
            )}
            {need.type == 'Eten' && (
              <>
                <img
                  className={style.need_image}
                  src="./assets/images/eten_icon__small.svg"
                />
              </>
            )}
            {need.type == 'Persoon' && (
              <>
                <img
                  className={style.need_image}
                  src="./assets/images/persoon_icon__small.svg"
                />
              </>
            )}
            {need.type == 'Item' && (
              <>
                <img
                  className={style.need_image}
                  src="./assets/images/item_icon__small.svg"
                />
              </>
            )}
            {need.type == 'Drank' && (
              <>
                <img
                  className={style.need_image}
                  src="./assets/images/drank_icon__small.svg"
                />
              </>
            )}
            <span className={style.need_type__text}>{need.need}</span>
          </li>
          {!need.other_user_id && (
            <div className={style.need_buttons}>
              {need.provided && (
                <div className={style.need_toggles}>
                  <button className={style.button}>
                    <div
                      className={`${style.true_false} ${style.toggle_true} scale`}
                    >
                      <img src="./assets/images/true_icon.svg" />
                    </div>
                  </button>
                  <button
                    className={style.button}
                    onClick={() => handleToggle(need)}
                  >
                    <div className={`${style.true_false} scale`}>
                      <img src="./assets/images/false_icon.svg" />
                    </div>
                  </button>
                </div>
              )}
              {!need.provided && (
                <div className={style.need_toggles}>
                  <button
                    className={style.button}
                    onClick={() => handleToggle(need)}
                  >
                    <div className={`${style.true_false} scale`}>
                      <img src="./assets/images/true_icon.svg" />
                    </div>
                  </button>
                  <button className={style.button}>
                    <div
                      className={`${style.true_false} ${style.toggle_false} scale`}
                    >
                      <img src="./assets/images/false_icon.svg" />
                    </div>
                  </button>
                </div>
              )}
              <button
                className={style.button}
                onClick={() => handleDelete(need)}
              >
                <img src="./assets/images/delete_icon.svg" />
              </button>
            </div>
          )}
          {need.other_user_id && (
            <>
              {need.provided && (
                <div className={style.need_toggles}>
                  <button className={style.button}>
                    <div
                      className={`${style.true_false} ${style.toggle_true} scale`}
                    >
                      <img src="./assets/images/true_icon.svg" />
                    </div>
                  </button>
                </div>
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
