import React, { useState } from "react";
import style from "./needs.module.css";
import { useFetchUser } from "../../../lib/user";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import Loading from "../../Loading/Loading";
import Mouse from "../../Mouse";

const UPDATE_NEED = gql`
  mutation update_need(
    $id: Int!
    $other_user_id: String!
    $motivation: String!
    $pending: Boolean!
  ) {
    update_needs(
      where: { id: { _eq: $id } }
      _set: {
        other_user_id: $other_user_id
        motivation: $motivation
        pending: $pending
      }
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
      donated
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
        first_name
        last_name
        company
        company_name
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

const Needs = ({ needs, user, props }) => {
  const [updateNeed] = useMutation(UPDATE_NEED);
  const [needsForm, setNeedsForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [motivation, setMotivation] = useState("");
  const router = useRouter();

  const goBack = () => {
    setNeedsForm(false);
  };

  const handleClick = (need) => {
    console.log(need);
    if (!user) {
      router.push("/api/login");
    }
    if (user && !user.first_name) {
      router.push(`/register`);
    }
    if (user && user.first_name) {
      setNeedsForm(true);
      setSelectedNeed(need);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (motivation != "") {
      updateNeed({
        variables: {
          id: selectedNeed.id,
          motivation: motivation,
          other_user_id: user.id,
          pending: true,
        },
        optimisticResponse: true,
        update: (cache) => {
          console.log(cache);
          const cachedData = cache.readQuery({
            query: GET_PROJECT_BY_ID,
            variables: {
              id: router.query.id,
              user_id: user.id,
              user: true,
            },
          });
          console.log(cachedData);
          const newNeeds = cachedData.needs.map((n) => {
            if (n.id === selectedNeed.id) {
              return { ...n, pending: !n.pending };
            } else {
              return n;
            }
          });
          console.log(newNeeds);
          cache.writeQuery({
            query: GET_PROJECT_BY_ID,
            variables: {
              id: router.query.id,
              user_id: user.id,
              user: true,
            },
            data: {
              projects: cachedData.projects,
              needs: newNeeds,
              users: cachedData.users,
              feedbacks: cachedData.feedbacks,
            },
          });
        },
      });
      setNeedsForm(false);
    }
  };
  const providedNeeds = needs.filter((need) => need.provided);
  return (
    <>
      <Mouse></Mouse>
      <div className={style.project_needs}>
        <div className={style.needs_header}>
          <p className={style.needs_title}>Durf mee te helpen</p>
          <p className={style.needs_provided}>
            <span className={style.needs_provided__light}>
              {providedNeeds.length}
            </span>
            / {needs.length}
          </p>
        </div>
        {!needsForm && (
          <div className={style.needs_list}>
            {needs.map((need) => (
              <>
                {!need.provided && (
                  <>
                    {!need.pending && (
                      <div className={style.need}>
                        <div className={style.need_item}>
                          <p className={style.need_item__text}>{need.need}</p>
                          <div>
                            <div
                              className={`${style.needs_item__image} ${style.needs_provided}`}
                            >
                              <img
                                src={`../../../../assets/needs/needs_${need.type.toLowerCase()}.svg`}
                                alt="upload hier"
                              />
                            </div>
                            <div className={style.need_button}>
                              <a
                                onClick={(e) => handleClick(need)}
                                className={style.button}
                              >
                                <div
                                  className={`${style.circle_button} ${style.circle_button__help} scale`}
                                >
                                  <img
                                    className={style.button_image}
                                    src="../../../../assets/needs/needs_help.svg"
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {need.pending && (
                      <div className={style.need}>
                        <div className={style.need_item}>
                          <p className={style.need_item__text}>{need.need}</p>
                          <div>
                            <div
                              className={`${style.needs_item__image} ${style.needs_not__provided}`}
                            >
                              <img
                                src={`../../../../assets/needs/needs_${need.type.toLowerCase()}.svg`}
                                alt="upload hier"
                              />
                            </div>
                            <div className={style.need_button}>
                              <a className={style.button}>
                                <div
                                  className={`${style.circle_button}  ${style.circle_button_provided}`}
                                >
                                  <img src="../../../../assets/needs/needs_pending.svg" />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {need.provided && (
                  <div className={style.need}>
                    <div className={style.need_item}>
                      <p className={style.need_item__text}>{need.need}</p>
                      <div>
                        <div
                          className={`${style.needs_item__image} ${style.needs_not__provided}`}
                        >
                          <img
                            src={`../../../../assets/needs/needs_${need.type.toLowerCase()}.svg`}
                            alt="upload hier"
                          />
                        </div>
                        <div className={style.need_button}>
                          <a className={style.button}>
                            <div
                              className={`${style.circle_button}  ${style.circle_button_provided}`}
                            >
                              <img src="../../../../assets/needs/needs_provided.svg" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        )}
        {needsForm && (
          <>
            <div className={style.need_motivation}>
              <form onSubmit={onSubmit}>
                <div className={style.motivation_text}>
                  <p className={style.need_item__text}>
                    Leg de projecteigenaar uit hoe je {selectedNeed.need} wilt
                    voorzien{" "}
                  </p>
                  <div className={style.button_back}>
                    <button
                      className={`${style.button_arrow} scale`}
                      onClick={goBack}
                    >
                      <img
                        className={style.back_image}
                        src="../../../../assets/images/button_back.svg"
                      />
                      <span className={style.back_text}> Terug </span>
                    </button>
                  </div>
                </div>
                <div className={style.motivation}>
                  <textarea
                    required
                    id="motivation"
                    min="0"
                    max="100"
                    value={motivation}
                    type="text"
                    placeholder="Ik heb veel ... over"
                    className={style.motivation_input}
                    onChange={(e) => setMotivation(e.currentTarget.value)}
                  />
                </div>
                <label
                  className={style.motivation_need__button}
                  htmlFor="button"
                >
                  <input
                    className={style.input_submit}
                    type="submit"
                    value="submit"
                    id="button"
                  />
                  <div className={style.motivation_button}>
                    <div className={style.motivation_circle__button}>
                      <img
                        className={style.motivation_button__image}
                        src="../../../../assets/buttons/bevestig_item_button.svg"
                      />
                    </div>
                  </div>
                </label>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Needs;
