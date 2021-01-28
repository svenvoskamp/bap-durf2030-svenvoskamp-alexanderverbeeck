import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/withApollo';
import Mouse from '../../components/Mouse';
import Header from '../../components/Detail/Header/Header';
import Extra from '../../components/Detail/Extra/Extra';
import Needs from '../../components/Detail/Needs/Needs';

import Nav from '../../components/Nav';
import style from '../../css/detail.module.css';
import Loading from '../../components/Loading/Loading';

const Detail = ({ props }) => {
  const scrollRef = useRef(null);

  import('locomotive-scroll').then((locomotiveModule) => {
    const lscroll = new locomotiveModule.default({
      el: scrollRef.current,
      smooth: true,
      direction: 'horizontal',
    });

    // Preload images and fonts
  });

  return (
    <>
      <Mouse></Mouse>
      <Nav></Nav>
      <main ref={scrollRef} data-scroll-container>
        <article className={style.part_project}>
          <div className={style.part_info}>
            <Header props={props}></Header>
            <Needs needs={props.needs}></Needs>
          </div>
          <Extra props={props}></Extra>
        </article>
        <div className={style.div}>
          <p className={style.div_text}>Hier staat een heleboel tekst</p>
        </div>
      </main>
    </>
  );
};

// export async function getStaticPaths() {
//   const apollo = require('../../lib/apolloClient'); // import client
//   var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//   var xhr = new XMLHttpRequest();
//   const GET_ID = gql`
//     query MyQuery {
//       projects {
//         id
//       }
//     }
//   `;
//   const client = apollo.default(); //initialize client

//   const { data, error } = await client.query({
//     query: GET_ID,
//   });
//   console.log(data);

//   const paths = data.projects.map((project) => ({
//     params: { id: '' + project.id },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
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
        needs(order_by: { provided: asc }) {
          id
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
