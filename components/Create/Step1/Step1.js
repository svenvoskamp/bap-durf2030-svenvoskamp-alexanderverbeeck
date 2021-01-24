import React, { useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import style from "./step1.module.css";


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
      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>Project.
            <span className={style.title_outline}>aanmaken.</span>
          </h1>
          <p className={style.title_description}>Super dat je een project wilt starten voor DURF 2030, we beginnen met de basis.</p>
        </div>
        <div className={style.part_content}>
          <div className={style.content_theme}>
            <p className={style.subtitle}>Selecteer een thema dat past bij jouw project</p>
            <div className={style.content_options}>
              {themes.map((theme) => (
              <>
                <label className={style.content_option} htmlFor = {theme.theme}>
                  <input className={style.checkbox}  id = {theme.theme} type = "radio" name = "theme" onClick={(e) => setTheme(theme.id)}/>
                  <p className={style.checkbox_text}>{theme.theme}</p>
                </label>
              </>
              ))}
            </div>
          </div>
          <div className={style.content_category}>
            <p className={style.subtitle}>Selcteer de categorie van je project</p>
            <div className={style.content_options}>
              {categories.map((category) => (
              <>
                <label className={style.content_option} htmlFor = {category.category}>
                  <input className={style.checkbox}  id = {category.category} type = "radio" name = "category" onClick={(e) => setCategory(category.id)}/>
                  <p className={style.checkbox_text}>{category.category}</p>
                </label>
              </>
              ))}
            </div>
          </div>
        </div>
        <div className={style.part_end}>
            <div>
              <button onClick={handleClick} className={style.button}>
                <div className={style.circle_button}>
                <img className={style.button_image}
                  src="./assets/images/account_aanmaken.svg"
                />
                </div>
              </button>
            </div>
          </div>
      </article>
    </>
  );
};

export default Step1;
