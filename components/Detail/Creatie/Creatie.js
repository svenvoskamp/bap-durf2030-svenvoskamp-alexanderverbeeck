import React, { useRef, useState } from "react";
import style from "./creatie.module.css";
import styles from "../../../css/detail.module.css";
import gql from "graphql-tag";
// import crowdfundingstyle from "./feedback/feedback.module.css";
import { useMutation } from "@apollo/react-hooks";
import Feedback from "./Feedback/Feedback";
import { useRouter } from "next/router";
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
  const [typeFeedback, setTypeFeedback] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [addFeedback] = useMutation(ADD_FEEDBACK);
  const refMotivation = useRef();
  const router = useRouter();

  const date = new Date(props.projects[0].created_at.replace(" ", "T"));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  const handleMotivation = () => {
    if (motivation == "") {
      refMotivation.current.innerHTML = `Gelieve een motivatie in te vullen`;
    } else {
      refMotivation.current.innerHTML = ``;
    }
  };

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
    <>
      <p className={style.timeline_title}>Projectevolutie</p>
      <div className={`${style.timeline}`}>
        <div className="feedback-container" data-scroll data-scroll-repeat>
          {props.projects[0].phase.phase == "Co-creatie" && (
            <form className={style.form_feedback} onSubmit={handleSubmit}>
              <div className={style.feedback}>
                {currentIndex == 0 && (
                  <>
                    <p className={style.form_title}>
                      <span className={style.form_number}>1.</span> Kies de
                      juiste bouwsteen voor jouw denkwijze.
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
                          className={style.form_image}
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
                          className={style.form_image}
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
                          className={style.form_image}
                          src="../../../../assets/creatie/creatie_overig_form.svg"
                        />
                        <p className={styles.form_option__text}>Overig</p>
                      </label>
                    </div>
                  </>
                )}
                {currentIndex == 1 && (
                  <>
                    <p className={style.form_title}>
                      <span className={style.form_number}>2.</span> Leg jouw{" "}
                      {typeFeedback == "Overig" && (
                        <span>overige feedback</span>
                      )}{" "}
                      {typeFeedback != "Overig" && (
                        <span>{typeFeedback.toLowerCase()}</span>
                      )}{" "}
                      verder uit!
                    </p>
                    <p className={style.error} ref={refMotivation}></p>
                    <div
                      className={`${
                        style.form_card
                      } form_card__two__${typeFeedback.toLowerCase()} ${
                        style.form_card__feedback
                      } `}
                    >
                      <textarea
                        required
                        minLength="10"
                        maxLength="300"
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
                            onClick={handleMotivation}
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
                  <>
                    <p className={style.form_title}>
                      <span className={style.form_number}>3.</span> Uw feedback
                      is in behandeling bij de projecteigenaar!
                    </p>
                    <div
                      className={`${style.form_card} ${style.form_card__feedback}`}
                    >
                      <p className={style.form_title}>
                        Bedankt voor het ondersteunen van "
                        {props.projects[0].title}"
                      </p>
                      <div className={style.voorzien_three__button}>
                        <label className={styles.voorzien} htmlFor="verzend">
                          <input
                            id="verzend"
                            className={`${styles.checkbox} scale`}
                            type="submit"
                            onClick={handleBack}
                          />
                          <div className={styles.button_voorzien}>
                            <p>Meer toevoegen</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          )}
          <div className={style.feedback_timeline__start}>
            {props.projects[0].phase.phase != "Co-creatie" && (
              <>
                <div className={style.start}>
                  <li className={style.locked_content}>
                    <div className={style.locked_info}>
                      <p className={style.locked_type}>Start Co-creatie</p>
                      <p className={style.locked_date}>
                        {props.projects[0].title} is op {finalDate} van start
                        gegaan.
                      </p>
                    </div>
                  </li>
                  <div className={style.locked_icon}>
                    <div className={style.icon_circle}>
                      <svg
                        className={style.icon_circle__svg}
                        width="28"
                        height="27"
                        viewBox="0 0 28 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.5333 18.2746L21.2185 12.2046C21.3507 11.5846 21.4162 10.9532 21.4141 10.3203C21.4136 8.58495 20.9591 6.87774 20.0924 5.35644C19.2258 3.83515 17.9751 2.54888 16.4558 1.61653C14.9366 0.684172 13.1979 0.135824 11.4005 0.0221671C9.60307 -0.0914893 7.8049 0.233214 6.17221 0.966264C5.96536 1.0573 5.7847 1.1956 5.64592 1.36917C5.50715 1.54274 5.41445 1.74632 5.37589 1.96223C5.33747 2.17541 5.35297 2.39436 5.42106 2.60054C5.48916 2.80671 5.60784 2.99404 5.76706 3.14663L11.8443 8.98785L9.32957 11.4105L3.26633 5.55579C3.1066 5.40479 2.91155 5.29296 2.6976 5.22972C2.48365 5.16648 2.25707 5.15368 2.03691 5.1924C1.8142 5.22819 1.6038 5.31546 1.42375 5.44672C1.2437 5.57799 1.09936 5.74934 1.00309 5.94611C0.239631 7.52418 -0.0971216 9.26265 0.0241578 10.9998C0.145437 12.7369 0.720808 14.4163 1.69675 15.8817C2.67269 17.347 4.01748 18.5508 5.60604 19.381C7.1946 20.2112 8.97531 20.6408 10.7825 20.6299C11.4395 20.6319 12.0949 20.5688 12.7384 20.4415L19.0391 26.525C19.169 26.6511 19.3235 26.7512 19.4938 26.8196C19.664 26.8879 19.8466 26.9231 20.031 26.9231C20.2155 26.9231 20.3981 26.8879 20.5683 26.8196C20.7386 26.7512 20.8931 26.6511 21.023 26.525C21.1539 26.3998 21.2578 26.251 21.3288 26.087C21.3997 25.923 21.4362 25.747 21.4362 25.5694C21.4362 25.3917 21.3997 25.2158 21.3288 25.0518C21.2578 24.8878 21.1539 24.7389 21.023 24.6138L14.1774 18.0189C14.0063 17.8551 13.7942 17.7369 13.5616 17.6756C13.329 17.6142 13.0839 17.6119 12.8502 17.6689C12.1756 17.8429 11.4808 17.9334 10.7825 17.9381C9.73758 17.947 8.70115 17.7566 7.73292 17.3779C6.7647 16.9992 5.88382 16.4397 5.14103 15.7316C4.39823 15.0235 3.80821 14.1809 3.40494 13.2521C3.00167 12.3234 2.79313 11.327 2.79133 10.3203C2.78952 9.86944 2.8269 9.41923 2.90309 8.97439L8.37956 14.2638C8.50944 14.3899 8.66396 14.4901 8.8342 14.5584C9.00445 14.6267 9.18705 14.6619 9.37148 14.6619C9.55591 14.6619 9.73851 14.6267 9.90875 14.5584C10.079 14.4901 10.2335 14.3899 10.3634 14.2638L14.806 9.94344C15.0578 9.69247 15.1986 9.35708 15.1986 9.00803C15.1986 8.65899 15.0578 8.3236 14.806 8.07263L9.37148 2.79669C9.83332 2.72403 10.3006 2.68802 10.7685 2.68902C12.867 2.69259 14.8782 3.49817 16.3607 4.92892C17.8433 6.35967 18.6759 8.29868 18.6759 10.3203C18.671 10.993 18.5771 11.6624 18.3965 12.3122C18.3373 12.5374 18.3397 12.7735 18.4034 12.9976C18.467 13.2217 18.5898 13.426 18.7597 13.5908L25.6053 20.1858C25.8684 20.4392 26.2252 20.5816 26.5972 20.5816C26.9693 20.5816 27.3261 20.4392 27.5891 20.1858C27.8522 19.9323 28 19.5886 28 19.2302C28 18.8718 27.8522 18.528 27.5891 18.2746H27.5333Z"
                          fill="#FDECD2"
                        />
                      </svg>
                      <svg
                        className={style.icon_circle__svg__mobile}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.6666 13.0533L15.1561 8.71754C15.2505 8.27471 15.2973 7.8237 15.2958 7.37163C15.2955 6.13211 14.9708 4.91267 14.3517 3.82603C13.7327 2.73939 12.8393 1.82063 11.7542 1.15466C10.669 0.488694 9.42709 0.0970168 8.14321 0.0158337C6.85933 -0.0653495 5.57493 0.166582 4.40872 0.690189C4.26097 0.755213 4.13193 0.854003 4.0328 0.977979C3.93368 1.10196 3.86747 1.24737 3.83992 1.40159C3.81248 1.55386 3.82355 1.71026 3.87219 1.85753C3.92083 2.00479 4.0056 2.1386 4.11933 2.24759L8.46019 6.41989L6.66398 8.15034L2.33309 3.96842C2.219 3.86056 2.07968 3.78068 1.92686 3.73551C1.77404 3.69034 1.61219 3.6812 1.45494 3.70886C1.29585 3.73442 1.14557 3.79676 1.01697 3.89052C0.888359 3.98428 0.785258 4.10667 0.716492 4.24722C0.171165 5.37442 -0.0693725 6.61618 0.0172556 7.85699C0.103884 9.0978 0.514863 10.2974 1.21196 11.344C1.90906 12.3907 2.86963 13.2506 4.00432 13.8436C5.139 14.4366 6.41093 14.7434 7.70179 14.7356C8.17104 14.7371 8.63919 14.692 9.09885 14.6011L13.5994 18.9464C13.6921 19.0365 13.8025 19.108 13.9241 19.1568C14.0457 19.2056 14.1762 19.2308 14.3079 19.2308C14.4396 19.2308 14.5701 19.2056 14.6917 19.1568C14.8133 19.108 14.9236 19.0365 15.0164 18.9464C15.1099 18.857 15.1842 18.7507 15.2348 18.6336C15.2855 18.5164 15.3116 18.3907 15.3116 18.2638C15.3116 18.1369 15.2855 18.0113 15.2348 17.8941C15.1842 17.777 15.1099 17.6706 15.0164 17.5813L10.1267 12.8706C10.0045 12.7537 9.85297 12.6692 9.68684 12.6254C9.52072 12.5816 9.34566 12.58 9.17868 12.6207C8.69687 12.745 8.20057 12.8096 7.70179 12.8129C6.95541 12.8193 6.2151 12.6833 5.52352 12.4128C4.83193 12.1423 4.20273 11.7427 3.67216 11.2369C3.1416 10.7311 2.72015 10.1292 2.4321 9.46581C2.14405 8.80244 1.99509 8.09071 1.9938 7.37163C1.99251 7.0496 2.01921 6.72802 2.07364 6.41028L5.9854 10.1884C6.07817 10.2785 6.18854 10.35 6.31014 10.3989C6.43175 10.4477 6.56218 10.4728 6.69391 10.4728C6.82565 10.4728 6.95608 10.4477 7.07768 10.3989C7.19928 10.35 7.30965 10.2785 7.40242 10.1884L10.5757 7.10245C10.7556 6.92319 10.8561 6.68363 10.8561 6.43431C10.8561 6.18499 10.7556 5.94543 10.5757 5.76616L6.69391 1.99764C7.0238 1.94574 7.35755 1.92001 7.69181 1.92073C9.1907 1.92328 10.6273 2.49869 11.6862 3.52066C12.7452 4.54262 13.3399 5.92763 13.3399 7.37163C13.3364 7.85215 13.2694 8.33028 13.1403 8.79445C13.0981 8.95531 13.0998 9.12396 13.1453 9.284C13.1907 9.44404 13.2784 9.59002 13.3998 9.70774L18.2895 14.4184C18.4774 14.5994 18.7323 14.7011 18.998 14.7011C19.2638 14.7011 19.5186 14.5994 19.7065 14.4184C19.8944 14.2374 20 13.9918 20 13.7358C20 13.4798 19.8944 13.2343 19.7065 13.0533H19.6666Z"
                          fill="#FDECD2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}

            {props.feedbacks.length > 0 && (
              <>
                {props.feedbacks.map((feedback) => (
                  <Feedback feedback={feedback}></Feedback>
                ))}
              </>
            )}
          </div>
          {/* <div className={style.timeline_line}></div> */}
          {props.projects[0].phase.phase == "Co-creatie" && (
            <div className={style.feedback_timeline__start}>
              <div className={style.locked}>
                <div className={style.locked_icon}>
                  <div className={style.icon_circle}>
                    <img
                      className={style.icon_circle__image}
                      src={`../../../../assets/crowdfunding/crowdfunding_locked.svg`}
                    />
                  </div>
                </div>
                <li className={style.locked_content}>
                  <div className={style.locked_info}>
                    <p className={style.locked_type}>Crowdfunding</p>
                    <p className={style.locked_date}>
                      Help het project om in deze fase te komen.
                    </p>
                  </div>
                </li>
              </div>
            </div>
          )}
          {props.projects[0].phase.phase == "Crowdfunding" &&
            !props.projects[0].reward_one && (
              <div className={style.feedback_timeline__start}>
                <div className={style.locked}>
                  <div className={style.locked_icon}>
                    <div className={style.icon_circle}>
                      <img
                        className={style.icon_circle__image}
                        src={`../../../../assets/crowdfunding/crowdfunding_waiting.svg`}
                      />
                    </div>
                  </div>
                  <li className={style.locked_content}>
                    <div className={style.locked_info}>
                      <p className={style.locked_type}>Crowdfunding</p>
                      <p className={style.locked_date}>
                        We wachten nog op gegevens voor de Crowdfunding te
                        starten
                      </p>
                    </div>
                  </li>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Creatie;
