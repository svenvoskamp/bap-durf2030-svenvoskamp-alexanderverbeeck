import React from "react";
import style from "./requests.module.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Empty from "../../Empty/Empty";
import styles from "../../../css/profile.module.css";

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
        <Empty props={"inafwachting"} />
      )}

      {requests.length > 0 && (
        <>
          <div className={`${styles.subdivision} `}>
            <p
              className={`${styles.subtitle} ${styles.subtitle_notifications}`}
            >
              Benodigdheden
            </p>
            <div className={`${styles.grid_requests} ${styles.grid_titles}`}>
              <p className={`${styles.grid_title} ${styles.grid_title__start}`}>
                Project
              </p>
              <p className={`${styles.grid_title} ${styles.grid_title__type}`}>
                Type
              </p>
              <p className={styles.grid_title}>Motivatie</p>
            </div>
            {requests.map((need) => (
              <div
                className={`${styles.grid_items} ${styles.grid_requests__items}`}
              >
                <div className={styles.pending}>
                  {" "}
                  <img
                    class
                    className={styles.grid_image__pending}
                    src="../../../assets/images/pending_state.svg"
                  />
                  <p className={style.grid_image_pending__text}>
                    In afwachting
                  </p>
                </div>
                <div className={styles.flex_mobile}>
                  <a
                    href={`detail/${need.project_id}`}
                    className={`${styles.grid_bold}  ${styles.grid_item__title}`}
                  >
                    {need.project.title}
                  </a>
                  <div
                    className={`${styles.grid_item__hidden} ${styles.grid_item__type__hidden__requests}`}
                  >
                    <img
                      src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
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
                    src={`../../../../assets/images/${need.type.toLowerCase()}_icon__small.svg`}
                    alt={need.type}
                    className={styles.grid_item__image}
                  />
                  <p className={styles.grid_text}>{need.need}</p>
                </div>
                <p
                  className={`${styles.grid_text} ${styles.grid_text__italic}`}
                >
                  "{need.motivation}"
                </p>
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons}`}
                >
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
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons__mobile}`}
                >
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleClick(e, need)}
                    >
                      <p
                        className={`${styles.mobile_button} ${styles.mobile_button__decline} `}
                      >
                        Annuleren
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {feedbackRequests.length > 0 && (
        <>
          <div className={`${styles.subdivision} `}>
            <p
              className={`${styles.subtitle} ${styles.subtitle_notifications}`}
            >
              Feedback
            </p>
            <div className={`${styles.grid_requests} ${styles.grid_titles}`}>
              <p className={`${styles.grid_title} ${styles.grid_title__start}`}>
                Projectnaam
              </p>
              <p className={`${styles.grid_title} ${styles.grid_title__type}`}>
                Type
              </p>
              <p className={styles.grid_title}>Motivatie</p>
            </div>
            {feedbackRequests.map((feedback) => (
              <div
                className={`${styles.grid_items} ${styles.grid_requests__items}`}
              >
                <div className={styles.pending}>
                  {" "}
                  <img
                    class
                    className={styles.grid_image__pending}
                    src="../../../assets/images/pending_state.svg"
                  />
                  <p className={style.grid_image_pending__text}>
                    In afwachting
                  </p>
                </div>
                <div className={styles.flex_mobile}>
                  <a
                    href={`/detail/${feedback.project_id}`}
                    className={`${styles.grid_bold}  ${styles.grid_item__title}`}
                  >
                    {feedback.project.title}
                  </a>
                  <div
                    className={`${styles.grid_item__hidden} ${styles.grid_item__type__hidden} ${styles.grid_item__type__hidden__requests}`}
                  >
                    <img
                      src={`../../../../assets/images/type_${feedback.type.toLowerCase()}.svg`}
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
                    src={`../../../../assets/images/type_${feedback.type.toLowerCase()}.svg`}
                    alt={feedback.type}
                    className={styles.grid_item__image}
                  />
                  <p className={styles.grid_text}>{feedback.type}</p>
                </div>
                <p
                  className={`${styles.grid_text} ${styles.grid_text__italic}`}
                >
                  "{feedback.motivation}"
                </p>
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons}`}
                >
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
                <div
                  className={`${styles.buttons} ${styles.grid_item__buttons__mobile}`}
                >
                  <div className={styles.need_button}>
                    <button
                      className={styles.input_submit}
                      onClick={(e) => handleFeedback(e, feedback)}
                    >
                      <p
                        className={`${styles.mobile_button} ${styles.mobile_button__decline} `}
                      >
                        Annuleren
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Requests;
