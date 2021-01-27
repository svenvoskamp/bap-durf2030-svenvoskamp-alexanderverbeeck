import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/withApollo';
import Mouse from '../../components/Mouse';
import Header from '../../components/Detail/Header';

import Nav from '../../components/Nav';
import style from '../../css/detail.module.css';
import Loading from '../../components/Loading/Loading';

const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    projects(where: { id: { _eq: $id } }) {
      category {
        category
      }
      description
      district {
        district
      }
      image
      impact
      needs {
        need
        type
        provided
      }
      phase {
        phase
      }
      tagline
      theme {
        theme
      }
      title
      user {
        first_name
        last_name
        company
        company_name
      }
    }
  }
`;

const Detail = ({ props }) => {
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
  });

  return (
    <>
      <Mouse></Mouse>
      <Nav></Nav>
      <main ref={scrollRef} data-scroll-container>
        <article className={style.part_project}>
          <div className={style.project}>
            <div className={style.project_header}>
              <div className={style.project_tags}>
                <p className={style.card_tag}>{props.theme.theme}</p>
                <p className={style.card_tag}>{props.category.category}</p>
              </div>
              <h1 className={style.title}>
                {props.title}.
                <span className={style.title_outline}>
                  {props.user.first_name} {props.user.last_name}
                </span>
              </h1>
              <div className={style.project_subtitles}>
                <div className={`${style.info_phase} ${style.info_item}`}>
                  {props.phase.phase == 'Conceptvoorstel' && (
                    <>
                      <div
                        className={`${style.fase_color} ${style.fase_concept}`}
                      ></div>
                    </>
                  )}
                  {props.phase.phase == 'Co-creatie' && (
                    <>
                      <div
                        className={`${style.fase_color} ${style.fase_creatie}`}
                      ></div>
                    </>
                  )}
                  {props.phase.phase == 'Crowdfunding' && (
                    <>
                      <div
                        className={`${style.fase_color} ${style.fase_crowdfunding}`}
                      ></div>
                    </>
                  )}
                  {props.phase.phase == 'Realisatie' && (
                    <>
                      <div
                        className={`${style.fase_color} ${style.fase_realisatie}`}
                      ></div>
                    </>
                  )}
                  <p className={`${style.info_text} ${style.info_light}`}>
                    {props.phase.phase}
                  </p>
                </div>
                <div className={`${style.info_location} ${style.info_item}`}>
                  <img src="../assets/images/project_location_icon.svg" />
                  <p className={`${style.info_text} ${style.info_light}`}>
                    {props.district.district}
                  </p>
                </div>
                <p>{props.user.company}</p>
                <p>{props.user.company_name}</p>
              </div>
            </div>
            <div className={style.project_description}>
              <p className={style.description_bold}> {props.impact}</p>
              <p className={style.description_light}>{props.description}</p>
            </div>
            <div className={style.project_benodigdheden}>
              <p className={style.benodigdheden_title}>Durf mee te helpen</p>
            </div>
          </div>
          <div className={style.project_extra}>
            <div>
              <div classname={style.extra_tagline}>
                <p className={style.tagline_text}>{props.tagline}</p>
                <img
                  className={style.tagline_image}
                  src="../assets/images/quotes.svg"
                  alt="upload hier"
                />
              </div>
              <div className={style.extra_image}>
                <img
                  className={style.project_image}
                  src={props.image}
                  alt={props.title}
                />
              </div>
              <div className={style.extra_button}>
                <p className={style.extra_button__text}>
                  Projecten in de kijker
                </p>
                <img
                  className={style.extra_button__arrow}
                  src="../assets/images/arrow_large.svg"
                />
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

// const getProject = () => {
//   const router = useRouter();
//   const id = router.query.id;

//   const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
//     variables: { id: id },
//   });
//   if (loading) {
//     return <Loading props={'detail'} />;
//   }
//   if (error) {
//     console.log(error);
//     return <div>Error...</div>;
//   }
//   if (!data.projects[0]) {
//     const handleClick = () => {
//       router.push('/');
//     };
//     return (
//       <>
//         <Mouse></Mouse>
//         <div>Project kan niet gevonden worden</div>
//         <button onClick={handleClick}>Ga terug</button>
//       </>
//     );
//   }
//   if (data.projects[0]) {
//     return <Detail props={data.projects[0]} />;
//   }
// };

export async function getStaticPaths() {
  const apollo = require('../../lib/apolloClient'); // import client
  var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  const GET_ID = gql`
    query MyQuery {
      projects {
        id
      }
    }
  `;
  const client = apollo.default(); //initialize client

  const { data, error } = await client.query({
    query: GET_ID,
  });
  console.log(data);

  const paths = data.projects.map((project) => ({
    params: { id: '' + project.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const apollo = require('../../lib/apolloClient'); // import client
  var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  var xhr = new XMLHttpRequest();
  const GET_PROJECT_BY_ID = gql`
    query getProjectById($id: Int!) {
      projects(where: { id: { _eq: $id } }) {
        category {
          category
        }
        description
        district {
          district
        }
        image
        impact
        needs {
          need
          type
          provided
        }
        phase {
          phase
        }
        tagline
        theme {
          theme
        }
        title
        user {
          first_name
          last_name
          company
          company_name
        }
      }
    }
  `;
  const client = apollo.default(); //initialize client

  const { data, error } = await client.query({
    query: GET_PROJECT_BY_ID,
    variables: { id: params.id },
  });

  if (!data || error) {
    return {
      notFound: true,
    };
  }
  return { props: { props: data.projects[0] } };
}

export default withApollo({ ssr: false })(Detail);
