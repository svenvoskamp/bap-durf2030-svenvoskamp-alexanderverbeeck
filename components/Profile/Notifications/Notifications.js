import React, { useRef, useState } from 'react';
import style from './notifications.module.css';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Empty from '../../Empty/Empty';
import styles from '../../../css/profile.module.css';
import Mouse from '../../Mouse';

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
      name
      nickname
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
        crowdfunding_finished
        speech
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
      project_id
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

const UPDATE_REAL = gql`
  mutation updateProject($id: Int!, $speech: String!) {
    update_projects(
      where: { id: { _eq: $id } }
      _set: { speech: $speech, crowdfunding_finished: true, phase_id: 4 }
    ) {
      affected_rows
    }
  }
`;

const Notifications = ({ props, user, feedbacks, projects }) => {
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [toggleFeedback] = useMutation(TOGGLE_FEEDBACK);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [updateReal] = useMutation(UPDATE_REAL);
  const [one, setOne] = useState('');
  const [two, setTwo] = useState('');
  const [three, setThree] = useState('');
  const [speech, setSpeech] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [currentSelected, setCurrentSelected] = useState('');
  const refRewardOne = useRef();
  const refRewardTwo = useRef();
  const refRewardThree = useRef();
  const refSpeech = useRef();
  let needNotifications = [];
  let feedbackNotifications = [];
  let projectNotifications = [];
  let projectReal = [];
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
  projects.map((project) => {
    if (project.phase_id == 3) {
      if (project.donated > 1500 && project.crowdfunding_finished == false) {
        projectReal.push(project);
      }
    }
  });

  let showProjectNots = false;
  let showNeedNots = false;
  let showFeedbackNots = false;

  if (
    feedbackNotifications.length > 0 ||
    needNotifications.length > 0 ||
    projectReal.length > 0
  ) {
    if (projectNotifications == 0) {
      showProjectNots = true;
    }
  }
  if (
    projectNotifications.length > 0 ||
    feedbackNotifications.length > 0 ||
    projectReal.length > 0
  ) {
    if (needNotifications == 0) {
      showNeedNots = true;
    }
  }
  if (
    needNotifications.length > 0 ||
    projectNotifications.length > 0 ||
    projectReal.length > 0
  ) {
    if (feedbackNotifications == 0) {
      showFeedbackNots = true;
    }
  }

  const handleValidationCrowd = () => {
    if (one == '') {
      refRewardOne.current.innerHTML = `Gelieve een reward in te vullen`;
    } else {
      refRewardOne.current.innerHTML = ``;
    }
    if (two == '') {
      refRewardTwo.current.innerHTML = `Gelieve een reward in te vullen`;
    } else {
      refRewardTwo.current.innerHTML = ``;
    }
    if (three == '') {
      refRewardThree.current.innerHTML = `Gelieve een reward in te vullen`;
    } else {
      refRewardThree.current.innerHTML = ``;
    }
  };

  const handleValidationSpeech = () => {
    if (speech == '') {
      refSpeech.current.innerHTML = `Gelieve een dankwoord in te vullen`;
    } else {
      refSpeech.current.innerHTML = ``;
    }
  };

  const handlePhase = (e, project) => {
    e.preventDefault();

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

  const handleReal = (e, project) => {
    e.preventDefault();

    if (speech != '') {
      updateReal({
        variables: {
          id: project.id,
          speech: speech,
        },
        optimisticResponse: true,
        update: (cache) => {
          const cachedData = cache.readQuery({
            query: GET_USER_DATA,
            variables: { id: user.id },
          });

          const newUser = cachedData.users.map((u) => {
            const length = u.projects.length;
            u.projects.map((p) => {
              if (p.id === project.id) {
                p.crowdfunding_finished = true;
                p.speech = speech;
                p.phase_id = 4;
                p.phase.phase = 'Realisatie';
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
    setCurrentSelected('');
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
          projectNotifications.length < 1 &&
          projectReal.length < 1 && <Empty props={'noneedsnofeedback'} />}
        <div>
          {!feedbackNotifications.length < 1 &&
            !needNotifications.length < 1 &&
            !projectNotifications.length < 1 &&
            !projectReal.length < 1 && (
              <>
                <p
                  className={`${styles.subtitle} ${styles.subtitle_notifications} ${styles.subtitle_empty}`}
                >
                  Projectupdates
                </p>
              </>
            )}

          {projectNotifications.map((project) => (
            <>
              <div className={`${styles.subdivision}`}>
                <div className={`${styles.project_update}`}>
                  <p className={styles.grid_item__title}>{project.title}</p>
                  <p className={styles.grid_text}>
                    <span className={styles.grid_bold}>Gefeliciteerd!</span>
                    <br /> Je kan van start met de crowdfunding van je project{' '}
                    <span className={styles.grid_bold}>“{project.title}”</span>!
                    Om deze fase te starten moet je de donatierewards invullen .
                  </p>
                  {currentProject == '' && (
                    <div className={style.project_buttons}>
                      <div className={style.project_button}>
                        <button
                          onClick={(e) => setCurrentProject(project)}
                          className={`${style.button} scale`}
                        >
                          Invullen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
          {currentProject != '' && (
            <>
              <form
                className={style.donation_form}
                onSubmit={(e) => handlePhase(e, currentProject)}
              >
                <div className={style.donation_option}>
                  <div className={style.input_label}>
                    <label
                      htmlFor={currentProject.title}
                      className={style.label}
                    >
                      Donatiereward 1{' '}
                    </label>
                    <span className={styles.grid_text}>
                      (€5 - €20):{' '}
                      <span className={style.crowdfunding_limit}>
                        (max 35 karakters)
                      </span>
                    </span>
                    <p className={style.error} ref={refRewardOne}></p>
                  </div>
                  <input
                    required
                    id={currentProject.title}
                    minLength="0"
                    maxLength="35"
                    value={one}
                    type="text"
                    placeholder="Ticket op de 1e rij"
                    className={style.input}
                    onChange={(e) => setOne(e.currentTarget.value)}
                  />
                </div>
                <div className={style.donation_option}>
                  <div className={style.input_label}>
                    <label
                      htmlFor={currentProject.title}
                      className={style.label}
                    >
                      {' '}
                      Donatiereward 2{' '}
                    </label>

                    <span className={styles.grid_text}>
                      (€20 - €50):{' '}
                      <span className={style.crowdfunding_limit}>
                        (max 35 karakters)
                      </span>
                    </span>
                    <p className={style.error} ref={refRewardTwo}></p>
                  </div>
                  <input
                    required
                    id={currentProject.title}
                    minLength="0"
                    maxLength="35"
                    value={two}
                    type="text"
                    placeholder="Ticket op de 1e rij en ontmoeting kunstenaar"
                    className={style.input}
                    onChange={(e) => setTwo(e.currentTarget.value)}
                  />
                </div>
                <div className={style.donation_option}>
                  <div className={style.input_label}>
                    <label
                      htmlFor={currentProject.title}
                      className={style.label}
                    >
                      Donatiereward 3{' '}
                    </label>
                    <span className={styles.grid_text}>
                      (€50+):{' '}
                      <span className={style.crowdfunding_limit}>
                        (max 35 karakters)
                      </span>
                    </span>
                    <p className={style.error} ref={refRewardThree}></p>
                  </div>
                  <input
                    required
                    id={currentProject.title}
                    minLength="0"
                    maxLength="35"
                    value={three}
                    type="text"
                    placeholder="Ticket op de 1e rij, ontmoeting kunstenaar en gratis drankjes"
                    className={style.input}
                    onChange={(e) => setThree(e.currentTarget.value)}
                  />
                </div>
                <label className={style.project_button} htmlFor="button">
                  <input
                    id="button"
                    className={`${style.checkbox} scale`}
                    type="submit"
                    onClick={handleValidationCrowd}
                  />
                  <div className={style.button}>
                    <p>Verzenden</p>
                  </div>
                </label>
              </form>
            </>
          )}

          {projectReal.map((project) => (
            <>
              {project.donated >= 1500 && (
                <div className={`${styles.subdivision}`}>
                  <div className={`${styles.project_update}`}>
                    <p className={styles.grid_item__title}>{project.title}</p>
                    <p className={styles.grid_text}>
                      <span className={styles.grid_bold}>Gefeliciteerd!</span>
                      <br /> Je kan nu van start met de realisatiefase van{' '}
                      <span className={styles.grid_bold}>
                        “{project.title}”
                      </span>
                      ! Geef een dankwoord aan de doneerders en een update over
                      jouw project!
                    </p>
                    {currentSelected == '' && (
                      <div className={style.project_buttons}>
                        <div className={`${style.project_button} scale`}>
                          <button
                            onClick={(e) => setCurrentSelected(project)}
                            className={`${style.button} scale`}
                          >
                            Invullen
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ))}

          {currentSelected != '' && (
            <>
              <form
                className={style.donation_form}
                onSubmit={(e) => handleReal(e, currentSelected)}
              >
                <div
                  className={`${style.donation_option} ${style.donation_option__form} `}
                >
                  <div className={style.input_label}>
                    <label
                      htmlFor={currentSelected.title}
                      className={style.label}
                    >
                      Dankwoord{' '}
                    </label>
                    <span className={styles.grid_text}>
                      {' '}
                      <span className={style.crowdfunding_limit}>
                        (max 35 karakters)
                      </span>
                    </span>
                    <p className={style.error} ref={refSpeech}></p>
                  </div>
                  <textarea
                    required
                    id={currentSelected.title}
                    minLength="0"
                    maxLength="350"
                    rows="8"
                    value={speech}
                    type="text"
                    placeholder="Ik wil jullie bedanken.."
                    className={style.input_text}
                    onChange={(e) => setSpeech(e.currentTarget.value)}
                  />
                </div>

                <label
                  className={`${style.project_button} scale`}
                  htmlFor="button"
                >
                  <input
                    id="button"
                    className={`${style.checkbox}`}
                    type="submit"
                    onClick={handleValidationSpeech}
                  />
                  <div className={style.button}>
                    <p>Verzenden</p>
                  </div>
                </label>
              </form>
            </>
          )}
        </div>

        {needNotifications.length > 0 && (
          <div className={`${styles.subdivision} `}>
            <p
              className={`${styles.subtitle} ${styles.subtitle_notifications}`}
            >
              Benodigheden
            </p>
            <div
              className={`${styles.grid_notifications} ${styles.grid_titles}`}
            >
              <p className={`${styles.grid_title} ${styles.grid_title__left}`}>
                Project
              </p>
              <p className={`${styles.grid_title} ${styles.grid_title__type}`}>
                Type
              </p>
              <p
                className={`${styles.grid_title} ${styles.grid_title__durver}`}
              >
                Durver
              </p>
              <p className={`${styles.grid_title}`}>Motivatie</p>
              <p className={`${styles.grid_title} ${styles.grid_title__end}`}>
                Akkoord
              </p>
            </div>
            {needNotifications.map((need) => (
              <div
                className={`${styles.grid_items} ${styles.grid_notifications__items}`}
              >
                <div>
                  <a
                    href={`/detail/${need.project_id}`}
                    className={`${styles.grid_bold} ${styles.grid_bold__title} ${styles.grid_item__title} scale`}
                  >
                    {need.project.title}
                  </a>
                  <div
                    className={`${styles.grid_item__hidden} ${styles.grid_item__type__hidden}`}
                  >
                    <img
                      src={`../../../../assets/profiel/profiel_${need.type.toLowerCase()}.svg`}
                      alt={need.type}
                      className={styles.grid_item__image}
                    />
                    <p className={styles.grid_text}>{need.need}</p>
                  </div>
                </div>
                <div
                  className={`${styles.grid_item} ${styles.grid_item__mobile}`}
                >
                  <img
                    src={`../../../../assets/profiel/profiel_${need.type.toLowerCase()}.svg`}
                    alt={need.type}
                    className={styles.grid_item__image}
                  />
                  <p className={styles.grid_text}>{need.need}</p>
                </div>
                <div className={styles.grid_item__mobile}>
                  {' '}
                  <a
                    href={`/user/${need.otheruser.id}`}
                    className={`${styles.grid_text} ${styles.grid_text__user} scale`}
                  >
                    {need.otheruser.first_name} {need.otheruser.last_name}
                  </a>
                </div>
                <div className={styles.flex_mobile}>
                  <div className={styles.grid_item__hidden}>
                    {' '}
                    <a
                      href={`/user/${need.otheruser.id}`}
                      className={`${styles.grid_text} ${styles.grid_text__user}  ${styles.grid_item__name__hidden}`}
                    >
                      {need.otheruser.first_name} {need.otheruser.last_name}
                    </a>
                  </div>

                  <p
                    className={`${styles.grid_text} ${styles.grid_text__italic}`}
                  >
                    "{need.motivation}"
                  </p>
                </div>
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons}`}
                >
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

                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons__mobile}`}
                >
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleClick(e, 'v', need)}
                    >
                      <p
                        className={`${styles.mobile_button} ${styles.mobile_button__accept} `}
                      >
                        Accepteren
                      </p>
                    </button>
                  </div>
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleClick(e, 'x', need)}
                    >
                      <p
                        className={`${styles.mobile_button} ${styles.mobile_button__decline} `}
                      >
                        Afwijzen
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
      <div>
        {feedbackNotifications.length > 0 && (
          <div className={`${styles.subdivision} `}>
            <p
              className={`${styles.subtitle} ${styles.subtitle_notifications}`}
            >
              Feedback
            </p>
            <div
              className={`${styles.grid_notifications} ${styles.grid_titles}`}
            >
              <p className={`${styles.grid_title} ${styles.grid_title__left}`}>
                Project
              </p>
              <p className={`${styles.grid_title} ${styles.grid_title__type}`}>
                Type
              </p>
              <p
                className={`${styles.grid_title} ${styles.grid_title__durver}`}
              >
                Durver
              </p>
              <p className={`${styles.grid_title}`}>Motivatie</p>
              <p className={`${styles.grid_title} ${styles.grid_title__end}`}>
                Akkoord
              </p>
            </div>
            {feedbackNotifications.map((feedback) => (
              <div
                className={`${styles.grid_items} ${styles.grid_notifications__items}`}
              >
                <div>
                  <a
                    href={`/detail/${feedback.project_id}`}
                    className={`${styles.grid_bold} ${styles.grid_bold__title} ${styles.grid_item__title} scale`}
                  >
                    {feedback.project.title}
                  </a>
                  <div
                    className={`${styles.grid_item__hidden} ${styles.grid_item__type__hidden}`}
                  >
                    <img
                      src={`../../../../assets/profiel/profiel_${feedback.type.toLowerCase()}.svg`}
                      alt={feedback.type}
                      className={styles.grid_item__image}
                    />
                    <p className={styles.grid_text}>{feedback.type}</p>
                  </div>
                </div>
                <div
                  className={`${styles.grid_item} ${styles.grid_item__mobile}`}
                >
                  <img
                    src={`../../../../assets/profiel/profiel_${feedback.type.toLowerCase()}.svg`}
                    alt={feedback.type}
                    className={styles.grid_item__image}
                  />
                  <p className={styles.grid_text}>{feedback.type}</p>
                </div>
                <div className={styles.grid_item__mobile}>
                  {' '}
                  <a
                    href={`/user/${feedback.otheruser.id}`}
                    className={`${styles.grid_text} ${styles.grid_text__user} scale`}
                  >
                    {feedback.otheruser.first_name}{' '}
                    {feedback.otheruser.last_name}
                  </a>
                </div>
                <div>
                  <div className={styles.grid_item__hidden}>
                    {' '}
                    <a
                      href={`/user/${feedback.otheruser.id}`}
                      className={`${styles.grid_text} ${styles.grid_text__user}  ${styles.grid_item__name__hidden}`}
                    >
                      {feedback.otheruser.first_name}{' '}
                      {feedback.otheruser.last_name}
                    </a>
                  </div>
                  <p
                    className={`${styles.grid_text} ${styles.grid_text__italic}`}
                  >
                    "{feedback.motivation}"
                  </p>
                </div>
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons}`}
                >
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
                </div>
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons__mobile}`}
                >
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleFeedback(e, 'v', need)}
                    >
                      <p
                        className={`${styles.mobile_button} ${styles.mobile_button__accept} `}
                      >
                        Accepteren
                      </p>
                    </button>
                  </div>
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleFeedback(e, 'x', need)}
                    >
                      <p
                        className={`${styles.mobile_button} ${styles.mobile_button__decline} `}
                      >
                        Afwijzen
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
