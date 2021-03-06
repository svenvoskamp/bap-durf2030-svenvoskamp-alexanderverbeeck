import { map, clamp } from '../lib/utils';
import React, { useRef, useEffect } from 'react';
import Tyle from '../components/Tyle/Tyle';
import Mouse from '../components/Mouse';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import dynamic from 'next/dynamic';
import Nav from '../components/Nav';
import { useFetchUser } from '../lib/user';

const Home = ({ projects }) => {
  const { user, loading } = useFetchUser();

  const scrollRef = useRef(null);

  import('locomotive-scroll').then((locomotiveModule) => {
    const lscroll = new locomotiveModule.default({
      el: scrollRef.current,
      smooth: true,
      direction: 'horizontal',
      smartphone: {
        smooth: true,
        horizontalGesture: true,
        direction: 'horizontal',
      },
    });

    lscroll.on('scroll', (obj) => {
      for (const key of Object.keys(obj.currentElements)) {
        if (obj.currentElements[key].el.classList.contains('card')) {
          let progress = obj.currentElements[key].progress;
          const brightnessVal =
            progress < 0.5
              ? clamp(map(progress, 0, 0.5, 0, 1), 0.4, 1)
              : clamp(map(progress, 0.5, 1, 1, 0), 0.4, 1);
          obj.currentElements[
            key
          ].el.style.filter = `opacity(${brightnessVal})`;
        }
      }
    });
    lscroll.update();
  });

  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <main
        ref={scrollRef}
        data-scroll-container
        className="data-scroll-container-home"
      >
        <div className="content">
          <div className="gallery">
            <div className="home_start">
              <div className="home_text">
                <div className="text_start">
                  <div className="text-start--button">
                    <p
                      className="text-large--fill start-text--large--fill"
                      data-scroll
                      data-scroll-speed="5"
                      data-scroll-direction="vertical"
                    >
                      {' '}
                      ONTDEK.{' '}
                    </p>
                    <a
                      href={'/about'}
                      className="button scale"
                      data-scroll
                      data-scroll-speed="8"
                      data-scroll-direction="vertical"
                    >
                      <div className="circle_button">
                        <img
                          className="button_image"
                          src="./assets/buttons/wat_durf_button.svg"
                        />
                      </div>
                    </a>
                  </div>
                  <p
                    data-scroll
                    data-scroll-speed="5"
                    data-scroll-direction="vertical"
                    className="text-large--inner start-text--large--inner"
                  >
                    {' '}
                    DURF 2030.{' '}
                  </p>
                </div>
              </div>
              <div
                className="home_start__info"
                data-scroll
                data-scroll-speed="-5"
                data-scroll-direction="vertical"
              >
                <p className="home_subtitle">
                  Bouw mee aan de toekomst en zorg ervoor dat Kortrijk de
                  culturele hoofdstad van Europa wordt!
                </p>
                <div className="home_start__buttons">
                  <div className="home_button__arrow">
                    <p className="home_button__bold">Projecten in de kijker</p>
                    <picture>
                      <source
                        media="(max-width: 850px)"
                        srcSet="./assets/images/arrow_small.svg"
                      />
                      <img
                        className="button_arrow__image"
                        src="./assets/images/arrow_large.svg"
                      />
                    </picture>
                  </div>
                  <a href={'/projects'} className="home_button__light scale">
                    Alle projecten
                  </a>
                </div>
              </div>
            </div>

            <div className="cards">
              {projects.map((project, key) => (
                <>
                  {key % 2 == 0 && (
                    <Tyle
                      direction="3"
                      button=".5"
                      project={project}
                      key={key}
                    />
                  )}
                  {key % 2 != 0 && (
                    <Tyle
                      direction="-3"
                      button="-.5"
                      project={project}
                      key={key}
                    />
                  )}
                </>
              ))}
            </div>

            <div className="home_end">
              <div className="text_end">
                <p
                  className="text-large--fill end-text--large--fill"
                  data-scroll
                  data-scroll-speed="2"
                  data-scroll-direction="vertical"
                >
                  {' '}
                  JOUW PROJECT.{' '}
                </p>
                <p
                  data-scroll
                  data-scroll-speed="-2"
                  data-scroll-direction="vertical"
                  className="text-large--inner end-text--large--inner"
                >
                  {' '}
                  START NU.{' '}
                </p>
              </div>
              <div
                className="home_end__info"
                data-scroll
                data-scroll-speed="3"
                data-scroll-direction="vertical"
              >
                <div className="home_end__buttons">
                  <a
                    href={'/create-project'}
                    className="home_button__start scale"
                  >
                    Start Nu
                  </a>
                  <a href={'/projects'} className="home_button__light scale">
                    Alle projecten
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const apollo = require('../lib/apolloClient'); // import client
  var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  const GET_PROJECTS = gql`
    query getProjects {
      projects(where: { theme_id: { _eq: 1 } }, order_by: { updated_at: asc }) {
        image
        title
        id
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
    props: { projects: data.projects }, // will be passed to the page component as props
  };
}

export default withApollo({ ssr: false })(Home);
