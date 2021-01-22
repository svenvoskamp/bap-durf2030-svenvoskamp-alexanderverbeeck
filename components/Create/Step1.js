import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      category
    }
  }
`;

const Step1 = ({ currentIndex }) => {
  let categories;
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }

  categories = data.categories;

  return (
    <>
      <div class="ui checkbox">
        {categories.map((category) => (
          <>
            <input type="checkbox" name="tag" />
            <label>{category.category}</label>
          </>
        ))}
      </div>
    </>
  );
};

export default Step1;
