import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../../../lib/withApollo';
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
      <form onSubmit={handleSubmit}>
        <input
          id="food"
          type="radio"
          name="needs"
          onClick={(e) => setTypeNeed('Eten')}
        />
        <label htmlFor="food">Eten</label>
        <input
          id="person"
          type="radio"
          name="needs"
          onClick={(e) => setTypeNeed('Persoon')}
        />
        <label htmlFor="person">Persoon</label>
        <input
          id="item"
          type="radio"
          name="needs"
          onClick={(e) => setTypeNeed('Item')}
        />
        <label htmlFor="item">Item</label>
        <input
          id="drink"
          type="radio"
          name="needs"
          onClick={(e) => setTypeNeed('Drank')}
        />
        <label htmlFor="drink">Drank</label>
        <input
          id="building"
          type="radio"
          name="needs"
          onClick={(e) => setTypeNeed('Gebouw')}
        />
        <label htmlFor="building">Gebouw</label>

        {!typeNeed == '' && (
          <>
            <label htmlFor="need">Titel:</label>
            <input
              required
              id="need"
              min="0"
              max="100"
              value={need}
              type="text"
              placeholder="De vraagstraat"
              onChange={(e) => setNeed(e.currentTarget.value)}
            />

            <p>Al voorzien?</p>

            <input
              id="true"
              type="radio"
              name="gotneed"
              onClick={(e) => setGotNeed(true)}
            />
            <label htmlFor="true">Ja</label>

            <input
              id="false"
              type="radio"
              name="gotneed"
              defaultChecked
              onClick={(e) => setGotNeed(false)}
            />
            <label htmlFor="false">Nee</label>

            <input type="submit" value="Voeg toe" />
          </>
        )}
      </form>
      <div>
        {data && (
          <>
            {data.needs.map((need) => (
              <div>
                <li>
                  {need.type} {need.need}
                </li>
                {need.provided && (
                  <>
                    <button style={{ background: 'green' }}>V</button>
                    <button onClick={() => handleToggle(need)}>X</button>
                  </>
                )}
                {!need.provided && (
                  <>
                    <button onClick={() => handleToggle(need)}>V</button>
                    <button style={{ background: 'red' }}>X</button>
                  </>
                )}
                <button onClick={() => handleDelete(need)}>Remove need</button>
              </div>
            ))}
          </>
        )}
        {!data && <p>U heeft nog geen benodigheden opgegeven</p>}
      </div>
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
