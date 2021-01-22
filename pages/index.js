import { preloadImages, map, clamp } from '../lib/utils';
import React, { useRef } from 'react';
import Tyle from '../components/Tyle';
import Mouse from '../components/Mouse';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { useQuery } from '@apollo/react-hooks';
import Nav from '../components/Nav/Nav';
import { useFetchUser } from '../lib/user';

// Initialize Locomotive Scroll (horizontal direction)

const GET_PROJECTS = gql`
  query getProjects {
    projects(
      limit: 10
      order_by: { updated_at: asc }
      where: { phase: { id: { _neq: 1 } } }
    ) {
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

const Home = ({ projects }) => {
  console.log(projects);
  const { user, loading } = useFetchUser();
  console.log(user);

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
        if (obj.currentElements[key].el.classList.contains('card-layers')) {
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

    // Preload images and fonts
    Promise.all([preloadImages('.card-image')]).then(() => {
      // Remove loader (loading class)
      document.body.classList.remove('loading');
    });
  });

  return (
    <>
      <Mouse></Mouse>

      <body class="loading">
        <Nav user={user}></Nav>
        <main ref={scrollRef} data-scroll-container>
          <div class="content">
            <div class="gallery">
              <div class="text-large">
                <span
                  class="text-large--inner text-large--fill"
                  data-scroll
                  data-scroll-speed="3"
                  data-scroll-direction="vertical"
                >
                  ONTDEK.
                </span>
                <span
                  data-scroll
                  data-scroll-speed="-4"
                  data-scroll-direction="vertical"
                  class="text-large--inner"
                >
                  DURF 2030.
                </span>
              </div>

              <div class="cards">
                {projects.map((project, key) => {
                  if (key == 0 && key % 2 == 0)
                    return (
                      <Tyle
                        color="red"
                        direction="2"
                        button="0.5"
                        project={project}
                        key={key}
                      />
                    );
                  else
                    return (
                      <Tyle
                        color="yellow"
                        direction="-2"
                        button="-0.5"
                        project={project}
                        key={key}
                      />
                    );
                })}
                {/* <Tyle color="red" direction="2" button="0.5"></Tyle>
                <Tyle color="yellow" direction="-2" button="-0.5"></Tyle>
                <Tyle color="green" direction="2" button="0.5"></Tyle>
                <Tyle color="red" direction="-2" button="-0.5"></Tyle>
                <Tyle color="yellow" direction="2" button="0.5"></Tyle> */}
              </div>
              <div class="text-large">
                <span
                  class="text-large--inner text-large--fill text-large--inner-2 "
                  data-scroll
                  data-scroll-speed="3"
                  data-scroll-direction="vertical"
                >
                  JOUW PROJECT.
                </span>
                <span
                  data-scroll
                  data-scroll-speed="-4"
                  data-scroll-direction="vertical"
                  class="text-large--inner text-large--inner-2"
                >
                  START NU.
                </span>
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
};

const ProjectList = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <Home projects={data.projects} />;
};

export default withApollo({ ssr: true })(ProjectList);
