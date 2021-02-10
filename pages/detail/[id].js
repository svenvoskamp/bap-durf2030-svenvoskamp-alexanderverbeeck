import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/react-hooks";
import { withApollo } from "../../lib/withApollo";
import Mouse from "../../components/Mouse";
import Header from "../../components/Detail/Header/Header";
import Extra from "../../components/Detail/Extra/Extra";
import Needs from "../../components/Detail/Needs/Needs";
import Creatie from "../../components/Detail/Creatie/Creatie";
import Crowdfunding from "../../components/Detail/Crowdfunding/Crowdfunding";
import Realisation from "../../components/Detail/Realisation/Realisation";
import { useFetchUser } from "../../lib/user";
import gsap from "gsap";

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
      created_at
      donated
      speech
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
        id
        first_name
        last_name
        company
        company_name
        name
        nickname
        phone_number
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

const Detail = ({ props, user, navUser }) => {
  const scrollRef = useRef(null);
  const [scrollNow, setScrollNow] = useState(false);

  import("locomotive-scroll").then((locomotiveModule) => {
    let lscroll = new locomotiveModule.default({
      el: scrollRef.current,
      smooth: true,
      direction: "horizontal",

      smartphone: {
        smooth: true,
        gestureDirection: "vertical",
        direction: "vertical",
      },
    });
    if (scrollNow == true) {
      lscroll.scrollTo(`.donations`);
    }
  });

  const onScroll = () => {
    if (
      (props.projects[0].phase.phase == "Crowdfunding" &&
        props.projects[0].reward_one) ||
      props.projects[0].phase.phase == "Realisatie"
    ) {
      const div = document.getElementsByTagName("html");
      const el = document.querySelector(`.donations`);

      if (el.classList.contains(`is-inview`)) {
        if (div[0].classList.contains(`dark-mode`)) {
        } else {
          div[0].classList.add(`dark-mode`);
        }
      }
      if (!el.classList.contains(`is-inview`)) {
        if (div[0].classList.contains(`dark-mode`)) {
          div[0].classList.remove(`dark-mode`);
        }
      }
    }
    if (
      (props.projects[0].phase.phase == "Crowdfunding" &&
        props.projects[0].reward_one) ||
      props.projects[0].phase.phase == "Realisatie"
    ) {
      console.log("ik moet nu wat doen");
      const crowdfundDiv = document.querySelector(`.progress_crowdfund`);
      const el = document.querySelector(".crowdfund");

      if (el.classList.contains(`is-inview`)) {
        if (crowdfundDiv.classList.contains(`progress_active`)) {
        } else {
          crowdfundDiv.classList.add(`progress_active`);
        }
      }
      if (!el.classList.contains(`is-inview`)) {
        if (crowdfundDiv.classList.contains(`progress_active`)) {
          crowdfundDiv.classList.remove(`progress_active`);
        }
      }
    }

    if (
      props.projects[0].phase.phase == "Realisatie" &&
      props.projects[0].speech
    ) {
      const realisationDiv = document.querySelector(`.progress_realisation`);
      const el = document.querySelector(".realisation");

      if (el.classList.contains(`is-inview`)) {
        if (realisationDiv.classList.contains(`progress_active`)) {
        } else {
          realisationDiv.classList.add(`progress_active`);
        }
      }
      if (!el.classList.contains(`is-inview`)) {
        if (realisationDiv.classList.contains(`progress_active`)) {
          realisationDiv.classList.remove(`progress_active`);
        }
      }
    }
    const creationDiv = document.querySelector(`.progress_creation`);
    const el = document.querySelector(".feedback");

    if (el.classList.contains(`is-inview`)) {
      if (creationDiv.classList.contains(`progress_active`)) {
      } else {
        creationDiv.classList.add(`progress_active`);
      }
    }
    if (!el.classList.contains(`is-inview`)) {
      if (creationDiv.classList.contains(`progress_active`)) {
        creationDiv.classList.remove(`progress_active`);
      }
    }

    const conceptDiv = document.querySelector(`.progress_concept`);
    const conceptEl = document.querySelector(".concept");

    if (conceptEl.classList.contains(`is-inview`)) {
      if (conceptDiv.classList.contains(`progress_active`)) {
      } else {
        conceptDiv.classList.add(`progress_active`);
      }
    }
    if (!conceptEl.classList.contains(`is-inview`)) {
      if (conceptDiv.classList.contains(`progress_active`)) {
        conceptDiv.classList.remove(`progress_active`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", onScroll);
  }, [window.removeEventListener("wheel", onScroll)]);

  return (
    <>
      <Mouse></Mouse>
      <Nav user={navUser}></Nav>
      <main
        ref={scrollRef}
        data-scroll-container
        className="data-scroll-container-detail"
      >
        <div className={style.progress}>
          <div className={style.progressbar}>
            <div
              className={`${style.progressbar_item} progress_concept progress_active `}
            >
              <p>Conceptbeschrijving</p>
            </div>
            <div className={`${style.progressbar_item} progress_creation `}>
              <p>Co-Creatie</p>
            </div>
            <div className={`${style.progressbar_item} progress_crowdfund `}>
              <p>Crowdfund</p>

              <img src="" />
            </div>
            <div className={`${style.progressbar_item} progress_realisation `}>
              <p>Realisatie</p>
              <img src="" />
            </div>
          </div>
        </div>
        <article className={style.part_project}>
          <div className={style.part_info}>
            <Header scrollRef={scrollRef} props={props.projects[0]}></Header>
            <Needs
              user={user}
              needs={props.needs}
              props={props.projects[0]}
            ></Needs>
          </div>
          <Extra className={style.part_extra} props={props.projects[0]}></Extra>
          <div className={style.timeline}>
            {" "}
            {props.projects[0].phase.phase == "Co-creatie" && (
              <div
                className={`${style.timeline_line} ${style.timeline_line__cocreatie}`}
              ></div>
            )}
            {!props.projects[0].reward_one &&
              props.projects[0].phase.phase == "Crowdfunding" && (
                <div
                  className={`${style.timeline_line} ${style.timeline_line__waiting}`}
                ></div>
              )}
            {props.projects[0].reward_one &&
              props.projects[0].phase.phase != "Realisatie" && (
                <div
                  className={`${style.timeline_line} ${style.timeline_line__crowdfunding}`}
                ></div>
              )}
            {props.projects[0].phase.phase == "Realisatie" && (
              <div
                className={`${style.timeline_line} ${style.timeline_line__realisatie}`}
              ></div>
            )}
            <Creatie props={props} user={user}></Creatie>
            {props.projects[0].reward_one && (
              <Crowdfunding props={props} user={user}></Crowdfunding>
            )}
            {props.projects[0].phase.phase == "Realisatie" && (
              <Realisation
                className={style.part_info}
                props={props}
                user={user}
              ></Realisation>
            )}
          </div>
        </article>
      </main>
    </>
  );
};

const LoadUser = ({ user }) => {
  const router = useRouter();
  if (user) {
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
      variables: { user_id: user.sub, id: router.query.id, user: true },
    });
    if (loading) {
      return <Loading props={"detail"} />;
    }
    if (!data && !loading) {
      router.push("/");
      return <></>;
    }
    if (!data.projects[0] && !loading) {
      router.push("/");
      return <></>;
    }
    if (data.projects[0].phase.phase == "Conceptvoorstel" && !loading) {
      router.push("/");
      return <></>;
    }
    if (data && !loading) {
      return <Detail navUser={user} user={data.users[0]} props={data} />;
    }
  }
  if (!user) {
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
      variables: { user_id: "", id: router.query.id, user: false },
    });
    if (loading) {
      return <Loading props={"detail"} />;
    }
    if (!data && !loading) {
      router.push("/");
      return <></>;
    }
    if (!data.projects[0] && !loading) {
      router.push("/");
      return <></>;
    }
    if (data.projects[0].phase.phase == "Conceptvoorstel" && !loading) {
      router.push("/");
      return <></>;
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
