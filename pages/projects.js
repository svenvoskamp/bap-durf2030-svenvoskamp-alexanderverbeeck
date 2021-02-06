import React, { useRef, useState, useEffect } from "react";
import Mouse from "../components/Mouse";
import Project from "../components/Project";
import gql from "graphql-tag";
import { withApollo } from "../lib/withApollo";
import { ApolloClient } from "apollo-client";
import { useQuery } from "@apollo/react-hooks";
import Nav from "../components/Nav";
import { set } from "mobx";
import style from "../css/projects.module.css";
import Loading from "../components/Loading/Loading";
import { useFetchUser } from "../lib/user";

const Projects = ({ projects, categories, themes, phases, districts }) => {
  console.log(phases);
  const { user, loading } = useFetchUser();
  const [search, setSearch] = useState("");
  const [newProjects, setNewProjects] = useState(projects);
  const [phaseId, setPhaseId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [themeId, setThemeId] = useState(0);
  const [districtId, setDistrictId] = useState(0);

  useEffect(() => {
    filter();
  }, [phaseId]);

  useEffect(() => {
    filter();
  }, [categoryId]);

  useEffect(() => {
    filter();
  }, [themeId]);

  useEffect(() => {
    filter();
  }, [districtId]);

  useEffect(() => {
    filter();
  }, [search]);

  const handlePhase = (id) => {
    setPhaseId(id);
  };

  const handleCategory = (id) => {
    setCategoryId(id);
  };

  const handleTheme = (id) => {
    setThemeId(id);
  };

  const handleDistrict = (id) => {
    setDistrictId(id);
  };

  const reset = () => {
    const phases = document.querySelectorAll(".phase");
    phases.forEach((phase) => {
      if (phase.checked) {
        phase.checked = false;
      }
    });
    const themes = document.querySelectorAll(".theme");
    themes.forEach((theme) => {
      if (theme.selected) {
        theme.selected = false;
      }
    });
    const categories = document.querySelectorAll(".category");
    categories.forEach((category) => {
      if (category.selected) {
        category.selected = false;
      }
    });
    const districts = document.querySelectorAll(".district");
    districts.forEach((district) => {
      if (district.selected) {
        district.selected = false;
      }
    });
    setPhaseId(0);
    setCategoryId(0);
    setThemeId(0);
    setDistrictId(0);
    setSearch("");
  };

  const filter = () => {
    if (
      phaseId == 0 &&
      categoryId == 0 &&
      themeId == 0 &&
      districtId == 0 &&
      search == ""
    ) {
      setNewProjects(projects);
    } else {
      let filter = projects;
      if (search != "") {
        const keyword = search.toLowerCase();
        filter = filter.filter(function (x) {
          x = x.title.toLowerCase();
          return x.indexOf(keyword) > -1;
        });
      }
      if (phaseId != 0) {
        filter = filter.filter((x) => x.phase_id == phaseId);
      }
      if (categoryId != 0) {
        filter = filter.filter((x) => x.category_id == categoryId);
      }
      if (themeId != 0) {
        filter = filter.filter((x) => x.theme_id == themeId);
      }
      if (districtId != 0) {
        filter = filter.filter((x) => x.district_id == districtId);
      }
      setNewProjects(filter);
    }
  };

  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>

      <article className={style.part}>
        <div className={style.part_header}>
          <h1 className={style.title}>
            durf 2030.
            <span className={style.title_outline}>projecten.</span>
          </h1>
          <div className={style.part_filter}>
            <div class={style.filter_search}>
              <label htmlFor="search">
                <img
                  className={style.search_image}
                  src="./assets/images/search_icon.svg"
                />
              </label>
              <input
                required
                id="search"
                min="0"
                max="100"
                value={search}
                type="text"
                placeholder="Zoek project"
                className={`${style.input_search} scale`}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
            <div className={style.filter_fase}>
              <label htmlFor="alles">
                <input
                  id="alles"
                  type="radio"
                  name="phase"
                  defaultChecked
                  className={`${style.input_none} ${style.input_radio}`}
                  onClick={(e) => handlePhase(0)}
                />
                <p className={`${style.filter_radio} scale`}>Alle fase's</p>
              </label>
              {phases.map((phase) => (
                <>
                  {phase.id != 1 && (
                    <>
                      <label htmlFor={phase.phase}>
                        <input
                          id={phase.phase}
                          type="radio"
                          name="phase"
                          className={`${style.input_none} ${style.input_radio}`}
                          onClick={(e) => handlePhase(phase.id)}
                        />
                        <p className={`${style.filter_radio} scale`}>
                          {phase.phase}
                        </p>
                      </label>
                    </>
                  )}
                </>
              ))}
            </div>
            <select
              className={`${style.filter_select} scale`}
              name="category"
              id="category"
              onChange={(e) => handleCategory(e.currentTarget.value)}
            >
              <option value="">Categorie</option>
              {categories.map((category) => (
                <option className="category" value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
            <select
              className={`${style.filter_select} scale`}
              name="theme"
              id="theme"
              onChange={(e) => handleTheme(e.currentTarget.value)}
            >
              <option value="">Thema</option>
              {themes.map((theme) => (
                <option className="theme" value={theme.id}>
                  {theme.theme}
                </option>
              ))}
            </select>
            <select
              className={`${style.filter_select} scale`}
              name="district"
              id="district"
              onChange={(e) => handleDistrict(e.currentTarget.value)}
            >
              <option value="">Filter op regio</option>
              {districts.map((district) => (
                <option className="district" value={district.id}>
                  {district.district}
                </option>
              ))}
            </select>
            <div className={style.filter_delete}>
              <button
                className={`${style.delete_button} scale`}
                onClick={reset}
              >
                <img
                  className={style.delete_filter}
                  src="./assets/images/delete_filter.svg"
                />
                <p className={style.delete_filter__small}>Verwijder filter</p>
              </button>
            </div>
          </div>
        </div>
        <div className={style.part_content}>
          {newProjects && (
            <div className={style.projecten}>
              {newProjects.map((project) => (
                <Project project={project} key={project.id}></Project>
              ))}
            </div>
          )}
          {newProjects.length < 1 && (
            <div className={style.empty_state}>
              <p className={style.empty_state__text}>
                Er zijn{" "}
                <span className={style.empty_state__text__outline}>geen</span>{" "}
                projecten gevonden
              </p>
              <div className={style.empty_state__buttons}>
                <button
                  className={`${style.empty_state__button} scale`}
                  onClick={reset}
                >
                  Verwijder filter
                </button>
                <button
                  className={`${style.empty_state__button__extra} scale`}
                  onClick={reset}
                >
                  Maak zelf een project
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export async function getServerSideProps() {
  const apollo = require("../lib/apolloClient"); // import client
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  const GET_PROJECTS = gql`
    query getProjects {
      projects(
        where: { phase: { id: { _neq: 1 } } }
        order_by: { updated_at: desc }
      ) {
        image
        title
        id
        phase_id
        theme_id
        district_id
        category_id
        user {
          first_name
          last_name
        }
        phase {
          phase
        }
        theme {
          theme
        }
        category {
          category
        }
        district {
          district
        }
        needs {
          need
          type
          provided
        }
      }
      themes {
        id
        theme
      }
      categories {
        id
        category
      }
      districts {
        id
        district
      }
      phase {
        id
        phase
      }
    }
  `;
  const client = apollo.default(); //initialize client

  const { data, error } = await client.query({
    query: GET_PROJECTS,
  });

  if (!data || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projects: data.projects,
      themes: data.themes,
      districts: data.districts,
      categories: data.categories,
      phases: data.phase,
    }, // will be passed to the page component as props
  };
}

export default withApollo({ ssr: false })(Projects);
