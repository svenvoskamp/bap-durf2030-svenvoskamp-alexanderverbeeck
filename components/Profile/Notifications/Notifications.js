import React, { useState } from 'react';
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

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: Int!
    $reward_one: String!
    $reward_two: String!
    $reward_three: String!
  ) {
    update_projects(
      where: { id: { _eq: $id } }
      _set: {
        reward_one: $reward_one
        reward_two: $reward_two
        reward_three: $reward_three
      }
    ) {
      affected_rows
    }
  }
`;

const Notifications = ({ props, user, feedbacks, projects }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [toggleFeedback] = useMutation(TOGGLE_FEEDBACK);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  let needNotifications = [];
  let feedbackNotifications = [];
  let projectNotifications = [];
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
  projects.map((project) => {
    if (project.phase_id == 3) {
      if (!project.reward_one) {
        projectNotifications.push(project);
      }
    }
  });

  const handlePhase = (e, project) => {
    e.preventDefault();
    console.log(project);

    if ((one != '', two != '', three != '')) {
      updateProject({
        variables: {
          id: project.id,
          reward_one: one,
          reward_two: two,
          reward_three: three,
        },
        optimisticResponse: true,
        update: (cache) => {
          const cachedData = cache.readQuery({
            query: GET_USER_DATA,
            variables: { id: user.id },
          });
          console.log(cachedData);

          const newUser = cachedData.users.map((u) => {
            const length = u.projects.length;
            u.projects.map((p) => {
              if (p.id === project.id) {
                p.reward_one = one;
                p.reward_two = two;
                p.reward_three = three;
                u.projects.push(p);
              } else {
                u.projects.push(p);
              }
            });
            u.projects.splice(0, length);
            return u;
          });
          cache.writeQuery({
            query: GET_USER_DATA,
            variables: { id: user.id },
            data: {
              needs: cachedData.needs,
              users: newUser,
              feedbacks: cachedData.feedbacks,
            },
          });
        },
      });
    }
    setCurrentProject('');
  };

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
            return {
              ...n,
              pending: !n.pending,
              provided: state,
              other_user_id: other_user_id,
            };
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
      <>
        {feedbackNotifications.length < 1 &&
          needNotifications.length < 1 &&
          projectNotifications.length < 1 && (
            <Empty props={'noneedsnofeedback'} />
          )}
        {(needNotifications.length < 1 && feedbackNotifications.length > 0) ||
          (projectNotifications.lenght > 0 && (
            <>
              <p className={`${styles.subtitle} ${styles.subtitle_empty}`}>
                Benodigheden
              </p>
              <Empty props={'needsincoming'} />
            </>
          ))}
        {needNotifications.length > 0 && (
          <div className={`${styles.subdivision} `}>
            <p className={styles.subtitle}>Benodigheden</p>
            <div
              className={`${styles.grid_notifications} ${styles.grid_titles}`}
            >
              <p className={`${styles.grid_title} ${styles.grid_title__left}`}>
                Projectnaam
              </p>
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
                <p className={`${styles.grid_bold} ${styles.grid_bold__title}`}>
                  {need.project.title}
                </p>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </>
      <div>
        {(feedbackNotifications.length < 1 && needNotifications.length > 0) ||
          (projectNotifications > 0 && (
            <>
              <p className={`${styles.subtitle} ${styles.subtitle_empty}`}>
                Feedback
              </p>
              <Empty props={'feedbackincoming'} />
            </>
          ))}
        {feedbackNotifications.length > 0 && (
          <div className={`${styles.subdivision} `}>
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
          </div>
        )}
      </div>
      <div>
        {(projectNotifications.length < 1 &&
          feedbackNotifications.length > 0) ||
          (needNotifications > 0 && (
            <>
              <p className={`${styles.subtitle} ${styles.subtitle_empty}`}>
                Projectupdates
              </p>
              <Empty props={'feedbackincoming'} />
            </>
          ))}
        <p className={styles.subtitle}>Projectupdates</p>
        {projectNotifications.map((project) => (
          <>
            <p onClick={(e) => setCurrentProject(project)}>
              Gefeliciteerd! Crowdfundfase behaald! Klik hier om de
              donatierewards van {project.title} in te vullen om de
              crowdfundfase te starten!
            </p>
          </>
        ))}
      </div>
      {currentProject != '' && (
        <>
          <form onSubmit={(e) => handlePhase(e, currentProject)}>
            <label htmlFor={currentProject.title} className={style.label}>
              Donatiereward 1 (€5 - €20) voor {currentProject.title}:
            </label>
            <input
              required
              id={currentProject.title}
              min="0"
              max="100"
              value={one}
              type="text"
              placeholder="Ticket op de 1e rij"
              onChange={(e) => setOne(e.currentTarget.value)}
            />
            <label htmlFor={currentProject.title} className={style.label}>
              Donatiereward 2 (€20 - €50) voor {currentProject.title}:
            </label>
            <input
              required
              id={currentProject.title}
              min="0"
              max="100"
              value={two}
              type="text"
              placeholder="Ticket op de 1e rij en ontmoeting kunstenaar"
              onChange={(e) => setTwo(e.currentTarget.value)}
            />
            <label htmlFor={currentProject.title} className={style.label}>
              Donatiereward 3 (€50+) voor {currentProject.title}:
            </label>
            <input
              required
              id={currentProject.title}
              min="0"
              max="100"
              value={three}
              type="text"
              placeholder="Ticket op de 1e rij, ontmoeting kunstenaar en gratis drankjes"
              onChange={(e) => setThree(e.currentTarget.value)}
            />
            <input type="submit" value="Verzend" id="button" />
          </form>
        </>
      )}
    </>
  );
};

export default Notifications;
