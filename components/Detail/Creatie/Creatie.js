import React, { useState } from "react";
import style from "./creatie.module.css";
import styles from "../../../css/detail.module.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Feedback from "./Feedback/Feedback";

const ADD_FEEDBACK = gql`
  mutation addFeedback(
    $type: String!
    $motivation: String!
    $user_id: String!
    $other_user_id: String!
    $project_id: Int!
  ) {
    insert_feedbacks(
      objects: {
        type: $type
        motivation: $motivation
        user_id: $user_id
        other_user_id: $other_user_id
        project_id: $project_id
      }
    ) {
      affected_rows
      returning {
        id
        type
        motivation
        user_id
        other_user_id
        project_id
        pending
        accepted
        created_at
        updated_at
      }
    }
  }
`;

const Creatie = ({ props, user }) => {
  console.log(props.feedbacks.length);
  const [typeFeedback, setTypeFeedback] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [addFeedback] = useMutation(ADD_FEEDBACK);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeFeedback != "" && motivation != "") {
      addFeedback({
        variables: {
          type: typeFeedback,
          motivation: motivation,
          user_id: props.projects[0].user_id,
          other_user_id: props.users[0].id,
          project_id: props.projects[0].id,
        },
      });
      setCurrentIndex(2);
    }
  };

  const checkUser = (typeFeedback) => {
    if (!user) {
      router.push("/api/login");
    }
    if (user && !user.first_name) {
      router.push(`/register`);
    }
    if (user && user.first_name) {
      setTypeFeedback(typeFeedback);
      setCurrentIndex(1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setMotivation("");
    setTypeFeedback("");
    setCurrentIndex(0);
  };
  return (
    <div className={style.timeline}>
      {props.projects[0].phase.phase != "Crowdfunding" && (
        <form className={style.form_feedback} onSubmit={handleSubmit}>
          <div className={style.feedback}>
            {currentIndex == 0 && (
              <>
                <p className={style.form_title}>
                  <span className={style.form_number}>1.</span> Kies de juiste
                  bouwsteen voor jouw denkwijze.
                </p>
                <div
                  className={`${style.form_card} ${style.form_card__one} ${style.form_card__feedback} `}
                >
                  <label
                    className={`${style.form_option} scale`}
                    htmlFor="change"
                  >
                    <input
                      id="change"
                      type="radio"
                      name="feedback"
                      className={styles.form_radio}
                      onClick={(e) => {
                        checkUser("Aanpassing");
                      }}
                    />
                    <img
                      className={style.icon_circle__image}
                      src="../../../../assets/creatie/creatie_aanpassing_form.svg"
                    />
                    <p className={styles.form_option__text}>Aanpassing</p>
                  </label>
                  <label
                    className={`${style.form_option} scale`}
                    htmlFor="addition"
                  >
                    <input
                      id="addition"
                      type="radio"
                      name="feedback"
                      className={styles.form_radio}
                      onClick={(e) => {
                        checkUser("Toevoeging");
                      }}
                    />
                    <img
                      className={style.icon_circle__image}
                      src="../../../../assets/creatie/creatie_toevoeging_form.svg"
                    />
                    <p className={styles.form_option__text}>Toevoeging</p>
                  </label>
                  <label
                    className={`${style.form_option} scale`}
                    htmlFor="other"
                  >
                    <input
                      id="other"
                      type="radio"
                      name="feedback"
                      className={styles.form_radio}
                      onClick={(e) => {
                        checkUser("Overig");
                      }}
                    />
                    <img
                      className={style.icon_circle__image}
                      src="../../../../assets/creatie/creatie_overig_form.svg"
                    />
                    <p className={styles.form_option__text}>Overig</p>
                    <div></div>
                  </label>
                </div>
              </>
            )}
            {currentIndex == 1 && (
              <>
                <p className={style.form_title}>
                  <span className={style.form_number}>2.</span> Leg jouw{" "}
                  {typeFeedback == "Overig" && <span>overige feedback</span>}{" "}
                  {typeFeedback != "Overig" && (
                    <span>{typeFeedback.toLowerCase()}</span>
                  )}{" "}
                  verder uit!
                </p>
                <div
                  className={`${
                    style.form_card
                  } form_card__two__${typeFeedback.toLowerCase()} ${
                    style.form_card__feedback
                  } `}
                >
                  <textarea
                    required
                    minLength="50"
                    value={motivation}
                    className={style.form_input}
                    placeholder="Misschien is het leuk om ..."
                    onChange={(e) => setMotivation(e.currentTarget.value)}
                  />

                  <div className={styles.form_buttons}>
                    <button
                      className={styles.button_back}
                      onClick={(e) => {
                        setCurrentIndex(0);
                      }}
                    >
                      <img
                        className={style.back_image}
                        src="../assets/images/button_back.svg"
                      />
                      <span className={styles.back_text}>Terug</span>
                    </button>

                    <label className={styles.voorzien} htmlFor="verzend">
                      <input
                        id="verzend"
                        className={`${styles.checkbox} scale`}
                        type="submit"
                      />
                      <div className={styles.button_voorzien}>
                        <p>Verzenden</p>
                      </div>
                    </label>
                  </div>
                </div>
              </>
            )}
            {currentIndex == 2 && (
              <div
                className={`${style.form_card} ${style.form_card__feedback}`}
              >
                <p className={style.form_title}>
                  Uw feedback is in behandeling bij de projecteigenaar!
                </p>
                <div className={`${style.voorzien} ${style.voorzien_three}`}>
                  <button
                    className={style.button_voorzien}
                    onClick={handleBack}
                  >
                    Meer toevoegen
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
      <div className={style.feedback_timeline}>
        {props.feedbacks.length > 0 && (
          <>
            {props.feedbacks.map((feedback) => (
              <Feedback feedback={feedback}></Feedback>
            ))}
          </>
        )}
        {props.feedbacks.length == 0 && <p>Test</p>}
      </div>
      <div className={style.timeline_line}></div>
    </div>
  );
};

export default Creatie;
