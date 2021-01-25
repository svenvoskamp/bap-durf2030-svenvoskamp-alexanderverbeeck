import React, { useRef, useState, useEffect } from 'react';

import Mouse from '../components/Mouse';
import Project from '../components/Project';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { ApolloClient } from 'apollo-client';
import { useQuery } from '@apollo/react-hooks';
import Nav from '../components/Nav';
import { set } from 'mobx';

const GET_PROJECTS = gql`
  query getProjects {
    projects {
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

const Projects = ({ projects, categories, themes, phases, districts }) => {
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
    setPhaseId(0);
    setCategoryId(0);
    setThemeId(0);
    setDistrictId(0);
  };

  const filter = () => {
    if (phaseId == 0 && categoryId == 0 && themeId == 0 && districtId == 0) {
      setNewProjects(projects);
    } else {
      let filter = projects;
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
      <p>FASES</p>
      {phases.map((phase) => (
        <label htmlFor={phase.phase}>
          <input
            id={phase.phase}
            type="radio"
            name="phase"
            onClick={(e) => handlePhase(phase.id)}
          />
          <p>{phase.phase}</p>
        </label>
      ))}
      <p>CATEGORIEN</p>
      {categories.map((category) => (
        <label htmlFor={category.category}>
          <input
            id={category.category}
            type="radio"
            name="category"
            onClick={(e) => handleCategory(category.id)}
          />
          <p>{category.category}</p>
        </label>
      ))}
      <p>THEMAS</p>
      {themes.map((theme) => (
        <label htmlFor={theme.theme}>
          <input
            id={theme.theme}
            type="radio"
            name="theme"
            onClick={(e) => handleTheme(theme.id)}
          />
          <p>{theme.theme}</p>
        </label>
      ))}
      <p>DISTRICTS</p>
      {districts.map((district) => (
        <label htmlFor={district.district}>
          <input
            id={district.district}
            type="radio"
            name="district"
            onClick={(e) => handleDistrict(district.id)}
          />
          <p>{district.district}</p>
        </label>
      ))}

      <div>
        {newProjects.map((project) => (
          <Project project={project} key={project.id}></Project>
        ))}
      </div>
      <button onClick={reset}>Reset filter</button>
    </>
  );
};

const AllProjects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return (
    <Projects
      projects={data.projects}
      themes={data.themes}
      categories={data.categories}
      districts={data.districts}
      phases={data.phase}
    />
  );
};

export default withApollo({ ssr: true })(AllProjects);