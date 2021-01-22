import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_THEMES_AND_CATEGORIES = gql`
  query getThemesAndCategories {
    themes {
      id
      theme
      theme_durf
    }
    categories {
      category
      id
    }
  }
`;

const Step1 = ({ theme, category, setCategory, setTheme, setCurrentIndex }) => {
  let categories, themes;
  const { loading, error, data } = useQuery(GET_THEMES_AND_CATEGORIES);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (theme != '' && category != '') {
      setCurrentIndex(1);
    }
  };
  categories = data.categories;
  themes = data.themes;

  return (
    <>
      <div>
        <h1>Kies Thema:</h1>
        {themes.map((theme) => (
          <>
            <input
              id={theme.theme}
              type="radio"
              name="theme"
              onClick={(e) => setTheme(theme.id)}
            />
            <label htmlFor={theme.theme}>{theme.theme}</label>
          </>
        ))}
      </div>
      <div>
        <h1>Kies Category:</h1>
        {categories.map((category) => (
          <>
            <input
              id={category.category}
              type="radio"
              name="category"
              onClick={(e) => setCategory(category.id)}
            />
            <label htmlFor={category.category}>{category.category}</label>
          </>
        ))}
      </div>
      <button onClick={handleClick}>Ga verder</button>
    </>
  );
};

export default Step1;
