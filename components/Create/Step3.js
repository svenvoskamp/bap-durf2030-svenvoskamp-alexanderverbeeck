import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
    }
  }
`;

const Needs = ({ project_id }) => {
  const updateCache = (cache, { data }) => {
    const existingNeeds = cache.readQuery({
      query: gql`
        query getNeedsByProject($id: Int!) {
          needs(where: { project_id: { _eq: $id } }) {
            id
            type
            need
            provided
          }
        }
      `,
      variables: {
        id: project_id,
      },
    });

    const newNeed = data.insert_needs.returning[0];
    console.log(newNeed);
    cache.writeQuery({
      query: gql`
        query getNeedsByProject($id: Int!) {
          needs(where: { project_id: { _eq: $id } }) {
            id
            type
            need
            provided
          }
        }
      `,
      variables: {
        id: project_id,
      },
      data: { needs: [newNeed, ...existingNeeds.needs] },
    });
  };

  const { data } = useQuery(GET_NEEDS_BY_PROJECT, {
    variables: { id: project_id },
  });

  console.log(data);

  const [typeNeed, setTypeNeed] = useState('');
  const [need, setNeed] = useState('');
  const [gotNeed, setGotNeed] = useState(false);
  const [addNeed] = useMutation(ADD_NEED, { update: updateCache });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('voer uit');
    if (typeNeed !== '' && need !== '') {
      console.log('voer uit nu!');
      addNeed({
        variables: {
          project_id: project_id,
          type: typeNeed,
          need: need,
          provided: gotNeed,
        },
      });
      setGotNeed(false);
      setNeed('');
      setTypeNeed('');
    }
  };
  return (
    <>
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
              <li>
                {need.type} {need.need}
              </li>
            ))}
          </>
        )}
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

export default Step3;
