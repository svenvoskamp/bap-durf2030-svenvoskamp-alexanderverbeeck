import React from 'react';
import style from './requests.module.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Empty from '../../Empty/Empty';
import styles from '../../../css/profile.module.css';

const TOGGLE_NEED = gql`
  mutation toggleNeed($id: Int!, $provided: Boolean!, $pending: Boolean) {
    update_needs(
      where: { id: { _eq: $id } }
      _set: { provided: $provided, pending: $pending, other_user_id: null }
    ) {
      affected_rows
    }
  }
`;

const REMOVE_FEEDBACK = gql`
  mutation removeFeedback($id: Int!) {
    delete_feedbacks(where: { id: { _eq: $id } }) {
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

const Requests = ({ props, user, feedbacks }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [removeFeedback] = useMutation(REMOVE_FEEDBACK);
  let requests = [];
  let feedbackRequests = [];

  props.map((need) => {
    if (need.other_user_id == user.id) {
      if (need.pending == true) {
        requests.push(need);
      }
    }
  });

  feedbacks.map((feedback) => {
    if (feedback.other_user_id == user.id) {
      if (feedback.pending == true) {
        feedbackRequests.push(feedback);
      }
    }
  });
  console.log(feedbackRequests);

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
        // other_user_id: other_user_id,
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
          data: {
            needs: newNeeds,
            users: cachedData.users,
            feedbacks: cachedData.feedbacks,
          },
        });
      },
    });
  };

  const handleFeedback = (e, feedback) => {
    e.preventDefault();
    console.log(feedback);
    removeFeedback({
      variables: { id: feedback.id },
      optimisticResponse: true,
      update: (cache) => {
        const cachedData = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
        });
        const newFeedback = cachedData.feedbacks.filter(
          (f) => f.id !== feedback.id
        );
        cache.writeQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
          data: {
            needs: cachedData.needs,
            users: cachedData.users,
            feedbacks: newFeedback,
          },
        });
      },
    });
  };
  return (
    <>
      {requests.length < 1 && feedbackRequests.length < 1 && (
        <Empty props={'inafwachting'} />
      )}

      {requests.length > 0 && (
        <>
          <div className={`${styles.grid_requests} ${styles.grid_titles}`}>
            <p className={`${styles.grid_title} ${styles.grid_title__start}`}>
              Projectnaam
            </p>
            <p className={styles.grid_title}>Type</p>
            <p className={styles.grid_title}>Motivatie</p>
          </div>
          {requests.map((need) => (
            <div
              className={`${styles.grid_items} ${styles.grid_requests__items}`}
            >
              <img
                class
                className={styles.grid_image}
                src="../../../assets/images/pending_state.svg"
              />
              <p className={styles.grid_bold}>{need.project.title}</p>
              <div className={styles.grid_item}>
                <img
                  src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
                  alt={need.type}
                  className={styles.grid_item__image}
                />
                <p className={styles.grid_text}>{need.need}</p>
              </div>
              <p className={`${styles.grid_text} ${styles.grid_text__italic}`}>
                "{need.motivation}"
              </p>
              <div className={styles.buttons}>
                <div className={styles.need_button}>
                  <button
                    className={styles.input_submit}
                    onClick={(e) => handleClick(e, need)}
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
          ))}
        </>
      )}
      {feedbackRequests.length > 0 && (
        <>
          <div className={`${styles.grid_requests} ${styles.grid_titles}`}>
            <p className={`${styles.grid_title} ${styles.grid_title__start}`}>
              Projectnaam
            </p>
            <p className={styles.grid_title}>Type</p>
            <p className={styles.grid_title}>Motivatie</p>
          </div>
          {feedbackRequests.map((feedback) => (
            <div
              className={`${styles.grid_items} ${styles.grid_requests__items}`}
            >
              <img
                class
                className={styles.grid_image}
                src="../../../assets/images/pending_state.svg"
              />
              <p className={styles.grid_bold}>{feedback.project.title}</p>
              <div className={styles.grid_item}>
                <p className={styles.grid_text}>{feedback.type}</p>
              </div>
              <p className={`${styles.grid_text} ${styles.grid_text__italic}`}>
                "{feedback.motivation}"
              </p>
              <div className={styles.buttons}>
                <div className={styles.feedback_button}>
                  <button
                    className={styles.input_submit}
                    onClick={(e) => handleFeedback(e, feedback)}
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
          ))}
        </>
      )}
    </>
  );
};

export default Requests;
