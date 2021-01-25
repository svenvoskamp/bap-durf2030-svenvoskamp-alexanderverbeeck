import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../../../lib/withApollo';
import style from './step3.module.css';
import Mouse from '../../../components/Mouse';

const GET_PROJECT_BY_USER = gql`
  query getProjectByUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      projects(order_by: { created_at: desc }, limit: 1) {
        id
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

const ADD_NEED = gql`
  mutation addNeed(
    $project_id: Int!
    $type: String!
    $need: String!
    $provided: Boolean!
  ) {
    insert_needs(
      objects: {
        project_id: $project_id
        type: $type
        need: $need
        provided: $provided
      }
    ) {
      affected_rows
      returning {
        id
        project_id
        type
        need
        provided
      }
    }
  }
`;

const TOGGLE_NEED = gql`
  mutation toggleNeed($id: Int!, $provided: Boolean!) {
    update_needs(where: { id: { _eq: $id } }, _set: { provided: $provided }) {
      affected_rows
    }
  }
`;

const REMOVE_NEED = gql`
  mutation removeNeed($id: Int!) {
    delete_needs(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const Needs = ({ project_id }) => {
  let id = project_id;
  const [addNeed] = useMutation(ADD_NEED);
  const [toggleNeed] = useMutation(TOGGLE_NEED);
  const [removeNeed] = useMutation(REMOVE_NEED);

  const { data } = useQuery(GET_NEEDS_BY_PROJECT, {
    variables: { id: project_id },
  });
  console.log(data);

  const [typeNeed, setTypeNeed] = useState('');
  const [need, setNeed] = useState('');
  const [gotNeed, setGotNeed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeNeed !== '' && need !== '') {
      addNeed({
        variables: {
          project_id: project_id,
          type: typeNeed,
          need: need,
          provided: gotNeed,
        },
        update: (cache, { data }) => {
          const cachedData = cache.readQuery({
            query: GET_NEEDS_BY_PROJECT,
            variables: { id },
          });
          const newNeed = data['insert_needs'].returning[0];
          cache.writeQuery({
            query: GET_NEEDS_BY_PROJECT,
            variables: { id },
            data: {
              ...cachedData,
              needs: [newNeed, ...cachedData.needs],
            },
          });
        },
      });
      setGotNeed(false);
      setNeed('');
      setTypeNeed('');
    }
  };

  const handleToggle = (need) => {
    toggleNeed({
      variables: { id: need.id, provided: !need.provided },
      optimisticResponse: true,
      update: (cache) => {
        const existingNeeds = cache.readQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
        });
        console.log(existingNeeds);
        const newNeeds = existingNeeds.needs.map((n) => {
          if (n.id === need.id) {
            return { ...n, provided: !n.provided };
          } else {
            return n;
          }
        });
        console.log(newNeeds);
        cache.writeQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
          data: { needs: newNeeds },
        });
      },
    });
  };

  const handleDelete = (need) => {
    removeNeed({
      variables: { id: need.id },
      optimisticResponse: true,
      update: (cache) => {
        const existingNeeds = cache.readQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
        });
        const newNeeds = existingNeeds.needs.filter((n) => n.id !== need.id);
        cache.writeQuery({
          query: GET_NEEDS_BY_PROJECT,
          variables: { id },
          data: { needs: newNeeds },
        });
      },
    });
  };

  return (
    <>
      <Mouse></Mouse>
      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            Project.
            <span className={style.title_outline}>benodigheden.</span>
          </h1>
          <p className={style.title_description}>
            Super dat je een project wilt starten voor DURF 2030, we beginnen
            met de basis.
          </p>
        </div>
        <div className={style.part_content}>
          <div className={style.form}>
            <form className={style.form_needs} onSubmit={handleSubmit}>
              <div className={style.checkboxes}>
                <div className={style.checkbox_container}>
                  <label htmlFor="food">
                    <input
                      id="food"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Eten')}
                    />
                    <p className={style.checkbox_text}>Eten</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <img src="./assets/images/eten_icon.svg" />
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="person">
                    <input
                      id="person"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Persoon')}
                    />
                    <p className={style.checkbox_text}>Persoon</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <img src="./assets/images/persoon_icon.svg" />
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="item">
                    <input
                      id="item"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Item')}
                    />
                    <p className={style.checkbox_text}>Item</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <img src="./assets/images/item_icon.svg" />
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="drink">
                    <input
                      id="drink"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Drank')}
                    />
                    <p className={style.checkbox_text}>Drank</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <img src="./assets/images/drank_icon.svg" />
                    </div>
                  </label>
                </div>
                <div className={style.checkbox_container}>
                  <label htmlFor="building">
                    <input
                      id="building"
                      type="radio"
                      name="needs"
                      className={style.checkbox}
                      onClick={(e) => setTypeNeed('Gebouw')}
                    />
                    <p className={style.checkbox_text}>Gebouw</p>
                    <div className={`${style.checkbox_image} scale`}>
                      <img src="./assets/images/gebouw_icon.svg" />
                    </div>
                  </label>
                </div>
                {!typeNeed == '' && (
                  <div className={style.input_item}>
                    <div className={`${style.input_container} ${style.input_title}`}>
                      <label htmlFor="need" className={style.label}>
                        Titel{' '}
                        <span className={style.label_extra}>
                          (max 20 karakters)
                        </span>
                      </label>
                      <input
                        required
                        id="need"
                        min="0"
                        max="100"
                        value={need}
                        type="text"
                        placeholder="De vraagstraat"
                        className={style.input}
                        onChange={(e) => setNeed(e.currentTarget.value)}
                      />
                    </div>
                    <div className={style.input_voorzien}>
                      <p className={`${style.label_extra} ${style.label_extra__voorzien}`}>Is dit al voorzien?</p>
                      <div className={style.buttons_voorzien}>
                        <div className={style.voorzien}>
                          <label htmlFor="true">
                            <input
                              id="true"
                              type="radio"
                              name="gotneed"
                              className={`${style.checkbox} ${style.checkbox_voorzien}`}
                              onClick={(e) => setGotNeed(true)}
                            />
                            <div className={`${style.true_false} ${style.checkbox_true} scale`}>
                              <img src="./assets/images/true_icon.svg" />
                            </div>
                          </label>
                          <label htmlFor="false">
                            <input
                              id="false"
                              type="radio"
                              name="gotneed"
                              className={`${style.checkbox} ${style.checkbox_voorzien}`}
                              defaultChecked
                              onClick={(e) => setGotNeed(false)}
                            />
                            <div className={`${style.true_false} ${style.checkbox_false} scale`}>
                              <img src="./assets/images/false_icon.svg" />
                            </div>
                          </label>
                        </div>
                        <input className={style.button_voorzien} type="submit" value="Voeg toe" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className={style.my_needs}>
              <div className={style.form_my__needs}>
                <h2 className={`${style.subtitle} ${style.subtitle_needs}`}>
                  Mijn benodigdheden
                </h2>
                {data && (
                  <div className={style.needs_list}>
                    {data.needs.map((need) => (
                      <div className={style.need_item}>
                        <li className={style.need_types}>
                          {need.type == 'Gebouw' && (
                            <>
                              <img className={style.need_image} src="./assets/images/gebouw_icon__small.svg" />
                            </>
                          )}
                          {need.type == 'Eten' && (
                            <>
                              <img className={style.need_image} src="./assets/images/eten_icon__small.svg" />
                            </>
                          )}
                          {need.type == 'Persoon' && (
                            <>
                              <img className={style.need_image} src="./assets/images/persoon_icon__small.svg" />
                            </>
                          )}
                          {need.type == 'Item' && (
                            <>
                              <img className={style.need_image} src="./assets/images/item_icon__small.svg" />
                            </>
                          )}
                          {need.type == 'Drank' && (
                            <>
                              <img className={style.need_image} src="./assets/images/drank_icon__small.svg" />
                            </>
                          )}
                          <span className={style.need_type__text}>{need.need}</span>
                        </li>
                        <div className={style.need_buttons}>
                          {need.provided && (
                            <div className={style.need_toggles}>
                              <button className={style.button}>                    
                                <div className={`${style.true_false} ${style.toggle_true} scale`}>
                                  <img src="./assets/images/true_icon.svg" />
                                </div>
                              </button>
                              <button className={style.button} onClick={() => handleToggle(need)}>
                                <div className={`${style.true_false} scale`}>
                                  <img src="./assets/images/false_icon.svg" />
                                </div>
                              </button>
                            </div>
                          )}
                          {!need.provided && (
                            <div className={style.need_toggles}>
                              <button className={style.button} onClick={() => handleToggle(need)}>
                                <div className={`${style.true_false} scale`}>
                                  <img src="./assets/images/true_icon.svg" />
                                </div>
                              </button>
                              <button className={style.button}>
                                <div className={`${style.true_false} ${style.toggle_false} scale`}>
                                  <img src="./assets/images/false_icon.svg" />
                                </div>
                              </button>
                            </div>
                          )}
                          <button className={style.button} onClick={() => handleDelete(need)}>
                            <img src="./assets/images/drank_icon__small.svg" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {data && (
                      <>
                        {data.needs.length < 1 && (
                          <div className={style.empty}>
                            <p className={style.need_empty}>U heeft nog <span className={style.need_empty__outline}>geen</span> benodigdheden</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

const Step3 = ({ user }) => {
  const { loading, data } = useQuery(GET_PROJECT_BY_USER, {
    variables: { id: user.sub },
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (data) {
    return <Needs project_id={data.users[0].projects[0].id} />;
  }
};
export default withApollo({ ssr: true })(Step3);
