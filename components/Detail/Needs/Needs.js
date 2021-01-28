import React, { useState } from 'react';
import style from './needs.module.css';
import { useFetchUser } from '../../../lib/user';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import Loading from '../../Loading/Loading';

const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      password
      picture
      first_name
    }
  }
`;

const UPDATE_NEED = gql`
  mutation update_need(
    $id: Int!
    $user_id: String!
    $motivation: String!
    $pending: Boolean!
  ) {
    update_needs(
      where: { id: { _eq: $id } }
      _set: { user_id: $user_id, motivation: $motivation, pending: $pending }
    ) {
      affected_rows
    }
  }
`;

const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    projects(where: { id: { _eq: $id } }) {
      category {
        category
      }
      description
      district {
        district
      }
      image
      impact
      needs(order_by: { provided: asc, pending: asc }) {
        id
        need
        type
        provided
        pending
        user_id
        motivation
      }
      phase {
        phase
      }
      tagline
      theme {
        theme
      }
      title
      user {
        first_name
        last_name
        company
        company_name
      }
    }
  }
`;

const GET_NEEDS_BY_PROJECT = gql`
  query getNeedsByProject($id: Int!) {
    needs(where: { project_id: { _eq: $id } }) {
      id
      type
      need
      provided
    }
  }
`;

const NeedsList = ({ needs, user }) => {
  const [updateNeed] = useMutation(UPDATE_NEED);
  const [needsForm, setNeedsForm] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState('');
  const [motivation, setMotivation] = useState('');
  const router = useRouter();

  const projectId = router.query;
  const realId = parseInt(projectId.id);
  console.log(realId);

  const goBack = () => {
    setNeedsForm(false);
  };

  const handleClick = (need) => {
    console.log(user);
    console.log(need);
    if (!user) {
      router.push('/api/login');
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
    console.log(projectId);

    if (motivation != '') {
      updateNeed({
        variables: {
          id: selectedNeed.id,
          motivation: motivation,
          user_id: user.id,
          pending: true,
        },
        optimisticResponse: true,
        // update: (cache) => {
        //   const existingNeeds = cache.readQuery({
        //     query: GET_NEEDS_BY_PROJECT,
        //     variables: { id: realId },
        //   });
        //   console.log(existingNeeds);
        //   const newNeeds = existingNeeds.needs.map((n) => {
        //     if (n.id === need.id) {
        //       return { ...n, pending: pending };
        //     } else {
        //       return n;
        //     }
        //   });
        //   console.log(newNeeds);
        //   cache.writeQuery({
        //     query: GET_NEEDS_BY_PROJECT,
        //     variables: { id: realId },
        //     data: { needs: newNeeds },
        //   });
        // },
      });
    }
  };
  const providedNeeds = needs.filter((need) => need.provided);
  return (
    <>
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
                                <div className={style.circle_button}>
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
                    voorzien{' '}
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
                <div>
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
                <input type="submit" value="submit" />

                <label className={style.need_button} htmlFor="button">
                  <input
                    className={style.input_submit}
                    type="submit"
                    value="Ga verder"
                    id="button"
                  />
                  <div className={style.button}>
                    <div className={style.circle_button}>
                      <img
                        className={style.button_image}
                        src="../../../../assets/images/account_aanmaken.svg"
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

const Needs = ({ needs, user, projectId }) => {
  if (user) {
    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
      variables: { id: user.sub },
    });
    if (loading) {
      return <Loading props={'loading'} />;
    }
    if (error) {
      <NeedsList user="" needs={needs} projectId={projectId} />;
    }
    if (!loading && data) {
      return <NeedsList user={data.users[0]} needs={needs} />;
    }
    if (!loading && !data) {
      return <>error 404 </>;
    }
  }
  if (!user) {
    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
      variables: { id: '' },
    });
    if (loading) {
      return <Loading props={'loading'} />;
    }
    if (error) {
      <NeedsList needs={needs} projectId={projectId} />;
    }

    return <NeedsList user="" needs={needs} projectId={projectId} />;
  }
};

export default Needs;
