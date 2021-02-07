import React, { useRef, useState } from "react";
import style from "./crowdfunding.module.css";
import styles from "../../../css/detail.module.css";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Donation from "./Donation/Donation";
import { useRouter } from "next/router";

const ADD_DONATION = gql`
  mutation addDonation(
    $amount: Int!
    $project_id: Int!
    $user_id: String!
    $reward: String!
    $donated: Int!
  ) {
    insert_donations(
      objects: {
        amount: $amount
        project_id: $project_id
        user_id: $user_id
        reward: $reward
      }
    ) {
      affected_rows
      returning {
        id
        amount
        project_id
        user_id
        reward
        created_at
        updated_at
        user {
          first_name
          last_name
        }
      }
    }
    update_projects(
      where: { id: { _eq: $project_id } }
      _set: { donated: $donated }
    ) {
      affected_rows
    }
  }
`;

const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!, $user_id: String, $user: Boolean!) {
    projects(where: { id: { _eq: $id } }) {
      id
      category {
        category
      }
      description
      district {
        district
      }
      image
      impact
      reward_one
      reward_two
      reward_three
      created_at
      donated
      speech
      phase {
        phase
      }
      tagline
      theme {
        theme
      }
      title
      user_id
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
      user {
        id
        first_name
        last_name
        company
        company_name
        name
        nickname
        phone_number
      }
    }
    needs(
      order_by: { provided: asc, pending: asc }
      where: { project_id: { _eq: $id } }
    ) {
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
    feedbacks(
      order_by: { updated_at: asc }
      where: {
        updated_at: {}
        project_id: { _eq: $id }
        pending: { _eq: false }
        accepted: { _eq: true }
      }
    ) {
      id
      updated_at
      motivation
      other_user_id
      otheruser {
        id
        first_name
        last_name
      }
      type
      project_id
    }
    users(where: { id: { _eq: $user_id } }) @include(if: $user) {
      id
      name
      password
      picture
      first_name
    }
  }
`;
const Crowdfunding = ({ props, user }) => {
  const [typeAmount, setTypeAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addDonation] = useMutation(ADD_DONATION);
  // const [updateAmount] = useMutation(UPDATE_PROJECT);
  const router = useRouter();
  const refAmountOne = useRef();
  const refAmountTwo = useRef();
  const refAmountThree = useRef();

  const checkUser = (typeAmount) => {
    if (!user) {
      router.push("/api/login");
    }
    if (user && !user.first_name) {
      router.push(`/register`);
    }
    if (user && user.first_name) {
      setTypeAmount(typeAmount);
      setCurrentIndex(1);
    }
  };

  const handleAmount = () => {
    if (typeAmount == 1) {
      if (amount == "") {
        refAmountOne.current.innerHTML = `Gelieve een bedrag in te vullen`;
      } else {
        refAmountOne.current.innerHTML = ``;
      }
    }
    if (typeAmount == 2) {
      if (amount == "") {
        refAmountTwo.current.innerHTML = `Gelieve een bedrag in te vullen`;
      } else {
        refAmountTwo.current.innerHTML = ``;
      }
    }
    if (typeAmount == 3) {
      if (amount == "") {
        refAmountThree.current.innerHTML = `Gelieve een bedrag in te vullen`;
      } else {
        refAmountThree.current.innerHTML = ``;
      }
    }
  };

  const handleSubmit = (e) => {
    let totalAmount;
    totalAmount = +props.projects[0].donated + +amount;
    console.log(totalAmount);
    let finalReward;
    if (typeAmount == 1) {
      finalReward = props.projects[0].reward_one;
    }
    if (typeAmount == 2) {
      finalReward = props.projects[0].reward_two;
    }
    if (typeAmount == 3) {
      finalReward = props.projects[0].reward_three;
    }
    e.preventDefault();
    if (amount != "" && typeAmount != "") {
      addDonation({
        variables: {
          amount: amount,
          project_id: props.projects[0].id,
          user_id: user.id,
          reward: finalReward,
          donated: totalAmount,
        },
        optimisticResponse: false,
        update: (cache, { data }) => {
          const cachedData = cache.readQuery({
            query: GET_PROJECT_BY_ID,
            variables: {
              id: router.query.id,
              user_id: user.id,
              user: true,
            },
          });

          const newProject = props.projects.map((p) => {
            const newDonation = data["insert_donations"].returning[0];
            p.donated = totalAmount;
            p.donations.push(newDonation);
            return p;
          });

          cache.writeQuery({
            query: GET_PROJECT_BY_ID,
            variables: {
              id: router.query.id,
              user_id: user.id,
              user: true,
            },
            data: {
              projects: newProject,
              needs: cachedData.needs,
              users: cachedData.users,
              feedbacks: cachedData.feedbacks,
            },
          });
        },
      });
    }
    setCurrentIndex(2);
  };

  const handleBack = () => {
    setCurrentIndex(0);
  };

  const handleStart = () => {
    setCurrentIndex(0);
    setTypeAmount("");
    setAmount("");
  };

  return (
    <div className={`${style.timeline} `}>
      {/* <div className="donations" data-scroll data-scroll-repeat> */}
      {props.projects[0].phase.phase == "Crowdfunding" && (
        <>
          <div className={`${style.header}`} id="donations">
            <div className={style.part_title}>
              <p className={style.title}>
                durf.
                <span className={style.title_outline}>doneren.</span>
              </p>
              <p className={style.title_description}>
                Welkom bij de crowdfunding! Help dit project om het te laten
                realiseren.
              </p>
            </div>
            <div
              data-scroll
              data-scroll-repeat
              className={`${style.crowdfunding_scroll} donations`}
            >
              <form
                className={`${styles.form} ${style.form_crowdfunding} `}
                onSubmit={handleSubmit}
              >
                {currentIndex == 0 && (
                  <div
                    className={`${styles.form_card} ${style.form_card__crowdfunding}`}
                  >
                    <label
                      className={style.crowdfunding_reward}
                      htmlFor="reward1"
                    >
                      <input
                        id="reward1"
                        type="radio"
                        name="rewards"
                        className={styles.form_radio}
                        onClick={(e) => {
                          checkUser("1");
                        }}
                      />
                      <p className={`${style.form_option__text__crowdfunding}`}>
                        <span className={style.crowdfunding_number}>1.</span>{" "}
                        {props.projects[0].reward_one}
                      </p>
                      <div className={`${style.value} scale `}>
                        <p className={style.crowdfunding_value}>€5 - €20</p>
                      </div>
                    </label>
                    <label
                      className={style.crowdfunding_reward}
                      htmlFor="reward2"
                    >
                      <input
                        id="reward2"
                        type="radio"
                        name="rewards"
                        className={styles.form_radio}
                        onClick={(e) => {
                          checkUser("2");
                        }}
                      />
                      <p className={`${style.form_option__text__crowdfunding}`}>
                        <span className={style.crowdfunding_number}>2.</span>{" "}
                        {props.projects[0].reward_two}
                      </p>
                      <div className={`${style.value} scale `}>
                        <p className={style.crowdfunding_value}>€20 - €50</p>
                      </div>
                    </label>
                    <label
                      className={style.crowdfunding_reward}
                      htmlFor="reward3"
                    >
                      <input
                        id="reward3"
                        type="radio"
                        name="rewards"
                        className={styles.form_radio}
                        onClick={(e) => {
                          checkUser("3");
                        }}
                      />
                      <p className={`${style.form_option__text__crowdfunding}`}>
                        <span className={style.crowdfunding_number}>3.</span>{" "}
                        {props.projects[0].reward_three}
                      </p>
                      <div className={`${style.value} scale `}>
                        <p className={style.crowdfunding_value}>+ €50</p>
                      </div>
                    </label>
                  </div>
                )}
                {currentIndex == 1 && (
                  <>
                    <div
                      className={`${styles.form_card} ${style.form_card__crowdfunding}`}
                    >
                      {typeAmount == 1 && (
                        <>
                          <p
                            className={`${style.form_option__text__crowdfunding}`}
                          >
                            <span className={style.crowdfunding_number}>
                              1.
                            </span>{" "}
                            {props.projects[0].reward_one}
                          </p>
                          <div className={style.input_label}>
                            <input
                              type="number"
                              required
                              min="5"
                              max="20"
                              value={amount}
                              className={style.input}
                              placeholder="Een bedrag tussen de 5 en 20 euro"
                              onChange={(e) => setAmount(e.currentTarget.value)}
                            />
                            <p className={style.error} ref={refAmountOne}></p>
                          </div>
                        </>
                      )}
                      {typeAmount == 2 && (
                        <>
                          {" "}
                          <p
                            className={`${style.form_option__text__crowdfunding}`}
                          >
                            <span className={style.crowdfunding_number}>
                              2.
                            </span>{" "}
                            {props.projects[0].reward_two}
                          </p>
                          <div className={style.input_label}>
                            <input
                              type="number"
                              required
                              min="20"
                              max="50"
                              value={amount}
                              className={style.input}
                              placeholder="Een bedrag tussen de 20 en 50 euro"
                              onChange={(e) => setAmount(e.currentTarget.value)}
                            />{" "}
                            <p className={style.error} ref={refAmountTwo}></p>
                          </div>
                        </>
                      )}
                      {typeAmount == 3 && (
                        <>
                          {" "}
                          <p
                            className={`${style.form_option__text__crowdfunding}`}
                          >
                            <span className={style.crowdfunding_number}>
                              3.
                            </span>{" "}
                            {props.projects[0].reward_three}
                          </p>
                          <div className={style.input_label}>
                            <input
                              type="number"
                              required
                              min="50"
                              max="3000"
                              value={amount}
                              className={style.input}
                              placeholder="Een bedrag hoger dan 50 euro"
                              onChange={(e) => setAmount(e.currentTarget.value)}
                            />
                            <p className={style.error} ref={refAmountThree}></p>
                          </div>
                        </>
                      )}
                      <div className={styles.form_buttons}>
                        <button
                          className={`${styles.button_back} ${style.button_back__crowdfunding} scale`}
                          onClick={handleBack}
                        >
                          <img
                            className={style.back_image}
                            src="../assets/images/button_back__beige.svg"
                          />
                          <span
                            className={`${styles.back_text} ${style.back_text__crowdfunding}`}
                          >
                            Terug
                          </span>
                        </button>

                        <label className={styles.voorzien} htmlFor="verzend">
                          <input
                            id="verzend"
                            className={styles.checkbox}
                            type="submit"
                            onClick={handleAmount}
                          />
                          <div
                            className={`${styles.button_voorzien} ${style.button_voorzien__crowdfunding} scale`}
                          >
                            <p>Doneer</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </form>
              {currentIndex == 2 && (
                <>
                  <div
                    className={`${styles.form_card} ${style.form_card__crowdfunding}`}
                  >
                    <p className={style.form_title}>
                      Bedankt voor het doneren, {user.first_name}!
                    </p>
                    <div className={style.voorzien_three__button}>
                      <label className={styles.voorzien} htmlFor="verzend">
                        <input
                          id="verzend"
                          className={`${styles.checkbox} scale`}
                          type="submit"
                          onClick={handleStart}
                        />
                        <div className={styles.button_voorzien}>
                          <p>Meer doneren?</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={style.donation_progress}>
              <div>
                <p className={style.progress_caps}>Reeds opgehaald</p>
                <div className={style.progress_donated}>
                  <div className={style.progress_donated__circle}></div>
                  <p className={style.progress_donated__text}>
                    €{props.projects[0].donated}
                  </p>
                </div>
              </div>
              <progress
                className={style.progressbar}
                value={props.projects[0].donated}
                max="1500"
              ></progress>{" "}
              <div className={style.progress_points}>
                <p className={style.progress_caps}>€0,-</p>
                <p className={style.progress_caps}>€1500,-</p>
              </div>
            </div>
          </div>
        </>
      )}
      {props.projects[0].phase.phase == "Realisatie" && (
        <>
          <div
            className={`${style.header} donations`}
            data-scroll
            data-scroll-repeat
          >
            <div className={style.part_title}>
              {/* <p className={style.title}>
                durf.
                <span className={style.title_outline}>doneren.</span>
              </p> */}
              <span className={style.title}>
                €{props.projects[0].donated},-
              </span>
              <span className={style.title_outline}>ingezameld</span>
              <p className={style.title_description}>
                Bedankt voor alle donaties!
              </p>
            </div>
          </div>
        </>
      )}
      <div className={style.crowdfunding_timeline}>
        {props.projects[0].donations.map((donation) => (
          <Donation donation={donation}></Donation>
        ))}
      </div>
      <div className={style.timeline_line}></div>
      {/* </div> */}
      {props.projects[0].phase.phase != "Realisatie" && (
        <p className={style.endcrowdfunding}>
          ueaguhisuihguihseruguihtgusguyhsguhysuhygsuhyuhsughruhuhu
        </p>
      )}
    </div>
  );
};

export default Crowdfunding;
