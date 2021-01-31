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

const TOGGLE_FEEDBACK = gql`
  mutation toggleFeedback($id: Int!, $accepted: Boolean!, $pending: Boolean!) {
    update_feedbacks(
      where: { id: { _eq: $id } }
      _set: { accepted: $accepted, pending: $pending }
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

const Notifications = ({ props, user, feedbacks }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [toggleFeedback] = useMutation(TOGGLE_FEEDBACK);
  let needNotifications = [];
  let feedbackNotifications = [];
  props.map((need) => {
    if (need.user_id == user.id) {
      if (need.pending == true) {
        needNotifications.push(need);
      }
    }
  });
  feedbacks.map((feedback) => {
    if (feedback.user_id == user.id) {
      if (feedback.pending == true) {
        feedbackNotifications.push(feedback);
      }
    }
  });
  console.log(feedbackNotifications);
  console.log(needNotifications);

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
          data: {
            needs: newNeeds,
            users: cachedData.users,
            feedbacks: cachedData.feedbacks,
          },
        });
      },
    });
  };

  const handleFeedback = (e, choose, feedback) => {
    e.preventDefault();
    let pending = false;
    let accepted;

    if (choose == 'x') {
      accepted = false;
    } else {
      accepted = true;
    }
    toggleFeedback({
      variables: {
        id: feedback.id,
        accepted: accepted,
        pending: pending,
      },
      optimisticResponse: true,
      update: (cache) => {
        const cachedData = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: user.id },
        });

        const newFeedback = cachedData.feedbacks.map((f) => {
          if (f.id === feedback.id) {
            return { ...f, pending: !f.pending };
          } else {
            return f;
          }
        });

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
      <div>
        {feedbackNotifications.length < 1 && needNotifications.length < 1 && (
          <Empty props={'noneedsnofeedback'} />
        )}
        {needNotifications.length < 1 && feedbackNotifications.length > 0 && (
          <>
            <p className={`${styles.subtitle} ${styles.subtitle_empty}`}>
              Benodigheden
            </p>
            <Empty props={'needsincoming'} />
          </>
        )}
        {needNotifications.length > 0 && (
          <>
            <p className={styles.subtitle}>Benodigheden</p>
            <div
              className={`${styles.grid_notifications} ${styles.grid_titles}`}
            >
              <p className={styles.grid_title}>Projectnaam</p>
              <p className={styles.grid_title}>Type</p>
              <p className={styles.grid_title}>Durver</p>
              <p className={styles.grid_title}>Motivatie</p>
              <p className={`${styles.grid_title} ${styles.grid_title__end}`}>
                Akkoord
              </p>
            </div>
            {needNotifications.map((need) => (
              <div
                className={`${styles.grid_items} ${styles.grid_notifications__items}`}
              >
                <p className={styles.grid_bold}>{need.project.title}</p>
                <div className={styles.grid_item}>
                  <img
                    src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
                    alt={need.type}
                    className={styles.grid_item__image}
                  />
                  <p className={styles.grid_text}>{need.need}</p>
                </div>
                <p className={styles.grid_text}>
                  {need.otheruser.first_name} {need.otheruser.last_name}
                </p>
                <p
                  className={`${styles.grid_text} ${styles.grid_text__italic}`}
                >
                  "{need.motivation}"
                </p>
                <div className={styles.buttons}>
                  {/* <button onClick={(e) => handleClick(e, 'v', need)}>V</button> */}

                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleClick(e, 'v', need)}
                    >
                      <div className={styles.button}>
                        <div
                          className={`${styles.circle_button} ${styles.circle_button__accept} scale `}
                        >
                          <img
                            className={styles.button_image}
                            src="../../../assets/buttons/accept_icon.svg"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleClick(e, 'x', need)}
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
                  {/* <button onClick={(e) => handleClick(e, 'x', need)}>X</button> */}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div>
        {feedbackNotifications.length < 1 && needNotifications.length > 0 && (
          <>
            <p className={`${styles.subtitle} ${styles.subtitle_empty}`}>
              Feedback
            </p>
            <Empty props={'feedbackincoming'} />
          </>
        )}
        {feedbackNotifications.length > 0 && (
          <>
            <p className={styles.subtitle}>Feedback</p>
            <div
              className={`${styles.grid_notifications} ${styles.grid_titles}`}
            >
              <p className={styles.grid_title}>Projectnaam</p>
              <p className={styles.grid_title}>Type</p>
              <p className={styles.grid_title}>Durver</p>
              <p className={styles.grid_title}>Motivatie</p>
              <p className={`${styles.grid_title} ${styles.grid_title__end}`}>
                Akkoord
              </p>
            </div>
            {feedbackNotifications.map((feedback) => (
              <div
                className={`${styles.grid_items} ${styles.grid_notifications__items}`}
              >
                <p className={styles.grid_bold}>{feedback.project.title}</p>
                <div className={styles.grid_item}>
                  <p className={styles.grid_text}>{feedback.type}</p>
                </div>
                <p className={styles.grid_text}>
                  {feedback.otheruser.first_name} {feedback.otheruser.last_name}
                </p>
                <p
                  className={`${styles.grid_text} ${styles.grid_text__italic}`}
                >
                  "{feedback.motivation}"
                </p>
                <div className={styles.buttons}>
                  {/* <button onClick={(e) => handleClick(e, 'v', need)}>V</button> */}

                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleFeedback(e, 'v', feedback)}
                    >
                      <div className={styles.button}>
                        <div
                          className={`${styles.circle_button} ${styles.circle_button__accept} scale `}
                        >
                          <img
                            className={styles.button_image}
                            src="../../../assets/buttons/accept_icon.svg"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleFeedback(e, 'x', feedback)}
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
                  {/* <button onClick={(e) => handleClick(e, 'x', need)}>X</button> */}
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
