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
    <div
      className={`${style.timeline} crowdfund`}
      data-scroll
      data-scroll-repeat
    >
      {props.projects[0].phase.phase == "Crowdfunding" && (
        <>
          <div className={`${style.header} `} id="donations">
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
            <div className={`${style.crowdfunding_scroll}`}>
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
          <div className={`${style.header}`}>
            <div className={style.part_title}>
              <span className={style.title}>
                €{props.projects[0].donated},-
              </span>
              <span className={style.title_outline}>ingezameld</span>
              <p className={style.title_description}>
                Bedankt voor alle donaties!
              </p>
            </div>
            <div className={`${style.crowdfunding_scroll}`}></div>
          </div>
        </>
      )}
      <div
        data-scroll
        data-scroll-repeat
        className={`${style.crowdfunding_timeline} donations `}
      >
        {props.projects[0].donations.map((donation) => (
          <Donation donation={donation}></Donation>
        ))}
        {props.projects[0].phase.phase != "Realisatie" && (
          <>
            <div className={style.start}>
              <div className={style.locked_icon}>
                <div className={style.icon_circle}>
                  <svg
                    className={style.icon_circle__svg}
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.75 2.5H20V1.25C20 0.918479 19.8683 0.600537 19.6339 0.366116C19.3995 0.131696 19.0815 0 18.75 0H6.25C5.91848 0 5.60054 0.131696 5.36612 0.366116C5.1317 0.600537 5 0.918479 5 1.25V2.5H1.25C0.918479 2.5 0.600537 2.6317 0.366116 2.86612C0.131696 3.10054 0 3.41848 0 3.75V7.5C0 8.82608 0.526784 10.0979 1.46447 11.0355C2.40215 11.9732 3.67392 12.5 5 12.5H6.925C8.05567 13.7614 9.58008 14.6029 11.25 14.8875V17.5H10C9.00544 17.5 8.05161 17.8951 7.34835 18.5983C6.64509 19.3016 6.25 20.2554 6.25 21.25V23.75C6.25 24.0815 6.3817 24.3995 6.61612 24.6339C6.85054 24.8683 7.16848 25 7.5 25H17.5C17.8315 25 18.1495 24.8683 18.3839 24.6339C18.6183 24.3995 18.75 24.0815 18.75 23.75V21.25C18.75 20.2554 18.3549 19.3016 17.6517 18.5983C16.9484 17.8951 15.9946 17.5 15 17.5H13.75V14.8875C15.4199 14.6029 16.9443 13.7614 18.075 12.5H20C21.3261 12.5 22.5979 11.9732 23.5355 11.0355C24.4732 10.0979 25 8.82608 25 7.5V3.75C25 3.41848 24.8683 3.10054 24.6339 2.86612C24.3995 2.6317 24.0815 2.5 23.75 2.5V2.5ZM5 10C4.33696 10 3.70107 9.73661 3.23223 9.26777C2.76339 8.79893 2.5 8.16304 2.5 7.5V5H5V7.5C5.00275 8.35214 5.1507 9.19757 5.4375 10H5ZM15 20C15.3315 20 15.6495 20.1317 15.8839 20.3661C16.1183 20.6005 16.25 20.9185 16.25 21.25V22.5H8.75V21.25C8.75 20.9185 8.8817 20.6005 9.11612 20.3661C9.35054 20.1317 9.66848 20 10 20H15ZM17.5 7.5C17.5 8.82608 16.9732 10.0979 16.0355 11.0355C15.0979 11.9732 13.8261 12.5 12.5 12.5C11.1739 12.5 9.90215 11.9732 8.96447 11.0355C8.02678 10.0979 7.5 8.82608 7.5 7.5V2.5H17.5V7.5ZM22.5 7.5C22.5 8.16304 22.2366 8.79893 21.7678 9.26777C21.2989 9.73661 20.663 10 20 10H19.5625C19.8493 9.19757 19.9972 8.35214 20 7.5V5H22.5V7.5Z"
                      fill="#091422"
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
                      d="M19 2H16V1C16 0.734784 15.8946 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0H5C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1V2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V6C0 7.06087 0.421427 8.07828 1.17157 8.82843C1.92172 9.57857 2.93913 10 4 10H5.54C6.44453 11.0091 7.66406 11.6824 9 11.91V14H8C7.20435 14 6.44129 14.3161 5.87868 14.8787C5.31607 15.4413 5 16.2044 5 17V19C5 19.2652 5.10536 19.5196 5.29289 19.7071C5.48043 19.8946 5.73478 20 6 20H14C14.2652 20 14.5196 19.8946 14.7071 19.7071C14.8946 19.5196 15 19.2652 15 19V17C15 16.2044 14.6839 15.4413 14.1213 14.8787C13.5587 14.3161 12.7956 14 12 14H11V11.91C12.3359 11.6824 13.5555 11.0091 14.46 10H16C17.0609 10 18.0783 9.57857 18.8284 8.82843C19.5786 8.07828 20 7.06087 20 6V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2V2ZM4 8C3.46957 8 2.96086 7.78929 2.58579 7.41421C2.21071 7.03914 2 6.53043 2 6V4H4V6C4.0022 6.68171 4.12056 7.35806 4.35 8H4ZM12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17V18H7V17C7 16.7348 7.10536 16.4804 7.29289 16.2929C7.48043 16.1054 7.73478 16 8 16H12ZM14 6C14 7.06087 13.5786 8.07828 12.8284 8.82843C12.0783 9.57857 11.0609 10 10 10C8.93913 10 7.92172 9.57857 7.17157 8.82843C6.42143 8.07828 6 7.06087 6 6V2H14V6ZM18 6C18 6.53043 17.7893 7.03914 17.4142 7.41421C17.0391 7.78929 16.5304 8 16 8H15.65C15.8794 7.35806 15.9978 6.68171 16 6V4H18V6Z"
                      fill="#091422"
                    />
                  </svg>
                </div>
              </div>
              <li className={style.locked_content}>
                <div className={style.locked_info}>
                  <p className={style.locked_type}>Realisatie</p>
                  <p className={style.locked_date}>
                    Donneer mee om {props.projects[0].title} te realiseren!
                  </p>
                </div>
              </li>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Crowdfunding;
