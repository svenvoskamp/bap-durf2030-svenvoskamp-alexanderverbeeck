import React, { useRef } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../lib/withApollo";
import Mouse from "../../components/Mouse";
import Header from "../../components/Detail/Header/Header";
import Extra from "../../components/Detail/Extra/Extra";
import Needs from "../../components/Detail/Needs/Needs";
import Creatie from "../../components/Detail/Creatie/Creatie";
import Crowdfunding from "../../components/Detail/Crowdfunding/Crowdfunding";
import { useFetchUser } from "../../lib/user";

import Nav from "../../components/Nav";
import style from "../../css/detail.module.css";
import Loading from "../../components/Loading/Loading";

const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!, $user_id: String, $user: Boolean!) {
    projects(where: { id: { _eq: $id } }) {
      id
      category {
        category
      }
      description
      district {
        district
      }
      image
      impact
      reward_one
      reward_two
      reward_three
      donated
      phase {
        phase
      }
      tagline
      theme {
        theme
      }
      title
      user_id
      donations(order_by: { created_at: asc }) {
        id
        created_at
        amount
        reward
        updated_at
        user {
          first_name
          last_name
        }
        project_id
        user_id
      }
      user {
        first_name
        last_name
        company
        company_name
      }
    }
    needs(
      order_by: { provided: asc, pending: asc }
      where: { project_id: { _eq: $id } }
    ) {
      id
      type
      motivation
      need
      user_id
      provided
      other_user_id
      otheruser {
        id
        first_name
        last_name
      }
      pending
      project {
        title
      }
    }
    feedbacks(
      order_by: { updated_at: asc }
      where: {
        updated_at: {}
        project_id: { _eq: $id }
        pending: { _eq: false }
        accepted: { _eq: true }
      }
    ) {
      id
      updated_at
      motivation
      other_user_id
      otheruser {
        id
        first_name
        last_name
      }
      type
      project_id
    }
    users(where: { id: { _eq: $user_id } }) @include(if: $user) {
      id
      name
      password
      picture
      first_name
    }
  }
`;

// const GET_CURRENT_USER = gql`
//   query getCurrentUser($id: String!) {
//     users(where: { id: { _eq: $id } }) {
//       id
//       name
//       password
//       picture
//       first_name
//     }
//   }
// `;

const Detail = ({ props, user }) => {
  const scrollRef = useRef(null);

  import("locomotive-scroll").then((locomotiveModule) => {
    const lscroll = new locomotiveModule.default({
      el: scrollRef.current,
      smooth: true,
      direction: "horizontal",
    });

    // Preload images and fonts
  });

  return (
    <>
      <Mouse></Mouse>
      <Nav user={user}></Nav>
      <main ref={scrollRef} data-scroll-container>
        <article className={style.part_project}>
          <div className={style.part_info}>
            <Header props={props.projects[0]}></Header>
            <Needs user={user} needs={props.needs} props={props}></Needs>
          </div>
          <Extra className={style.part_extra} props={props.projects[0]}></Extra>
          <Creatie props={props} user={user}></Creatie>
          {props.projects[0].reward_one && (
            <Crowdfunding props={props} user={user}></Crowdfunding>
          )}
        </article>
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

// export async function getServerSideProps(context) {
//   const apollo = require('../../lib/apolloClient'); // import client
//   var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//   var xhr = new XMLHttpRequest();

//
//   const client = apollo.default(); //initialize client

//   const { data, error } = await client.query({
//     query: GET_PROJECT_BY_ID,
//     variables: { id: context.params.id },
//   });

//   if (!data || error) {
//     return {
//       notFound: true,
//     };
//   }
//   return { props: { props: data.projects[0] } };
// }

// const LoadDetail = ({ user }) => {
//   const router = useRouter();
//   const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
//     variables: { id: router.query.id },
//   });
//   if (loading) {
//     return <Loading props={'detail'} />;
//   }
//   if (error) {
//     console.log(error);
//   }
//   if (!loading && data) {
//     return <Detail props={data} user={user} />;
//   }
//   if (!loading && !data) {
//     return <>Error</>;
//   }
// };

const LoadUser = ({ user }) => {
  console.log(user);
  const router = useRouter();
  if (user) {
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
      variables: { user_id: user.sub, id: router.query.id, user: true },
    });
    if (loading) {
      return <Loading props={"detail"} />;
    }
    if (data && !loading) {
      return <Detail user={data.users[0]} props={data} />;
    }
  }
  if (!user) {
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
      variables: { user_id: "", id: router.query.id, user: false },
    });
    if (loading) {
      return <Loading props={"detail"} />;
    }
    if (data && !loading) {
      return <Detail user="" props={data} />;
    }
  }
};
const getUser = () => {
  const { user, loading } = useFetchUser();

  if (loading) {
    return <Loading props={"detail"} />;
  }
  if (!loading && user) {
    return <LoadUser user={user} />;
  }
  if (!user && !loading) {
    return <LoadUser user={user} />;
  }
};

export default withApollo({ ssr: true })(getUser);
