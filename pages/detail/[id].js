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
  let scrollWhere = 1;

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

    if (props.projects[0].speech) {
      const realisationDiv = document.querySelector(`.progress_realisation`);
      const el = document.querySelector(".realisation");
      const lowerEl = document.querySelector(".crowdfund");

      if (el.classList.contains(`is-inview`)) {
        console.log("voeg toe aan realisatie");
        if (lowerEl.classList.contains(`progress_active_crowdfund`)) {
          lowerEl.classList.remove(`progress_active_crowdfund`);
        }
        if (realisationDiv.classList.contains(`progress_active_realisation`)) {
        } else {
          realisationDiv.classList.add(`progress_active_realisation`);
        }
      }
      if (!el.classList.contains(`is-inview`)) {
        if (realisationDiv.classList.contains(`progress_active_realisation`)) {
          realisationDiv.classList.remove(`progress_active_realisation`);
        }
      }
    }

    if (
      props.projects[0].phase.phase == "Crowdfunding" &&
      props.projects[0].reward_one
    ) {
      const crowdfundDiv = document.querySelector(`.progress_crowdfund`);
      const el = document.querySelector(".crowdfund");

      const lowerEl = document.querySelector(".feedback-container");

      if (el.classList.contains(`is-inview`)) {
        if (lowerEl.classList.contains(`progress_active_creation`)) {
          lowerEl.classList.remove(`progress_active_creation`);
        }
        if (crowdfundDiv.classList.contains(`progress_active_crowdfund`)) {
        } else {
          crowdfundDiv.classList.add(`progress_active_crowdfund`);
        }
      } else {
        crowdfundDiv.classList.remove(`progress_active_crowdfund`);
      }
      if (!el.classList.contains(`is-inview`)) {
        if (crowdfundDiv.classList.contains(`progress_active_crowdfund`)) {
          crowdfundDiv.classList.remove(`progress_active_crowdfund`);
        }
      }
    }

    if (
      props.projects[0].phase.phase == "Realisatie" &&
      props.projects[0].speech
    ) {
      const crowdfundDiv = document.querySelector(`.progress_crowdfund`);
      const el = document.querySelector(".crowdfund");
      const higherEl = document.querySelector(".realisation");
      const lowerEl = document.querySelector(".feedback-container");

      if (
        el.classList.contains(`is-inview`) &&
        !higherEl.classList.contains(`is-inview`)
      ) {
        if (lowerEl.classList.contains(`progress_active_creation`)) {
          lowerEl.classList.remove(`progress_active_creation`);
        }
        if (crowdfundDiv.classList.contains(`progress_active_crowdfund`)) {
        } else {
          crowdfundDiv.classList.add(`progress_active_crowdfund`);
        }
      } else {
        crowdfundDiv.classList.remove(`progress_active_crowdfund`);
      }
      if (!el.classList.contains(`is-inview`)) {
        if (crowdfundDiv.classList.contains(`progress_active_crowdfund`)) {
          crowdfundDiv.classList.remove(`progress_active_crowdfund`);
        }
      }
    }
    if (props.projects[0].reward_one) {
      const creationDiv = document.querySelector(`.progress_creation`);
      const el = document.querySelector(".feedback-container");
      const higherEl = document.querySelector(".crowdfund");
      const lowerEl = document.querySelector(".concept");

      if (
        el.classList.contains(`is-inview`) &&
        !higherEl.classList.contains(`is-inview`)
      ) {
        if (lowerEl.classList.contains(`progress_active_concept`)) {
          lowerEl.classList.remove(`progress_active_concept`);
        }
        if (creationDiv.classList.contains(`progress_active_creation`)) {
        } else {
          creationDiv.classList.add(`progress_active_creation`);
        }
      } else {
        creationDiv.classList.remove(`progress_active_creation`);
      }
      if (!el.classList.contains(`is-inview`)) {
        if (creationDiv.classList.contains(`progress_active_creation`)) {
          creationDiv.classList.remove(`progress_active_creation`);
        }
      }
    }
    if (!props.projects[0].reward_one) {
      const creationDiv = document.querySelector(`.progress_creation`);
      const el = document.querySelector(".feedback-container");

      const lowerEl = document.querySelector(".concept");

      if (el.classList.contains(`is-inview`)) {
        if (lowerEl.classList.contains(`progress_active_concept`)) {
          lowerEl.classList.remove(`progress_active_concept`);
        }
        if (creationDiv.classList.contains(`progress_active_creation`)) {
        } else {
          creationDiv.classList.add(`progress_active_creation`);
        }
      } else {
        creationDiv.classList.remove(`progress_active_creation`);
      }
      if (!el.classList.contains(`is-inview`)) {
        if (creationDiv.classList.contains(`progress_active_creation`)) {
          creationDiv.classList.remove(`progress_active_creation`);
        }
      }
    }

    const conceptDiv = document.querySelector(`.progress_concept`);
    const conceptEl = document.querySelector(".concept");
    const conceptHigherEl = document.querySelector(".feedback-container");

    if (
      conceptEl.classList.contains(`is-inview`) &&
      !conceptHigherEl.classList.contains(`is-inview`)
    ) {
      if (conceptDiv.classList.contains(`progress_active_concept`)) {
      } else {
        conceptDiv.classList.add(`progress_active_concept`);
      }
    } else {
      conceptDiv.classList.remove(`progress_active_concept`);
    }
    if (!conceptEl.classList.contains(`is-inview`)) {
      if (conceptDiv.classList.contains(`progress_active_concept`)) {
        conceptDiv.classList.remove(`progress_active_concept`);
      }
    }

    const line = document.querySelector(`.line_value`);
    const creationDiv = document.querySelector(`.progress_creation`);
    const crowdfundDiv = document.querySelector(`.progress_crowdfund`);
    const realisationDiv = document.querySelector(`.progress_realisation`);

    if (conceptDiv.classList.contains(`progress_active_concept`)) {
      line.classList.add(`progress_active_concept`);
    } else {
      if (line.classList.contains(`progress_active_concept`)) {
        line.classList.remove(`progress_active_concept`);
      }
    }
    if (creationDiv.classList.contains(`progress_active_creation`)) {
      line.classList.add(`progress_active_creation`);
    } else {
      if (line.classList.contains(`progress_active_creation`)) {
        line.classList.remove(`progress_active_creation`);
      }
    }
    if (crowdfundDiv.classList.contains(`progress_active_crowdfund`)) {
      line.classList.add(`progress_active_crowdfund`);
    } else {
      if (line.classList.contains(`progress_active_crowdfund`)) {
        line.classList.remove(`progress_active_crowdfund`);
      }
    }
    if (realisationDiv.classList.contains(`progress_active_realisation`)) {
      line.classList.add(`progress_active_realisation`);
    } else {
      if (line.classList.contains(`progress_active_realisation`)) {
        line.classList.remove(`progress_active_realisation`);
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
      <div className={style.progress}>
        <div className={style.lines}>
          <div className="line_value">
            <div className="line_color"></div>
          </div>
          <div className={`${style.line}`}></div>/
        </div>
        <div className={`${style.progressbar}`}>
          <div
            className={`${style.progressbar_item} progress_concept progress_active progress_active_concept `}
          >
            <p>Conceptbeschrijving</p>
          </div>
          <div className={`${style.progressbar_item} progress_creation `}>
            <p>Co-Creatie</p>
          </div>
          <div className={`${style.progressbar_item} progress_crowdfund `}>
            {!props.projects[0].reward_one && (
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 6.6C4.83424 6.6 4.67527 6.66321 4.55806 6.77574C4.44085 6.88826 4.375 7.04087 4.375 7.2V9C4.375 9.15913 4.44085 9.31174 4.55806 9.42426C4.67527 9.53679 4.83424 9.6 5 9.6C5.16576 9.6 5.32473 9.53679 5.44194 9.42426C5.55915 9.31174 5.625 9.15913 5.625 9V7.2C5.625 7.04087 5.55915 6.88826 5.44194 6.77574C5.32473 6.66321 5.16576 6.6 5 6.6ZM8.125 4.2V3C8.125 2.20435 7.79576 1.44129 7.20971 0.87868C6.62366 0.316071 5.8288 0 5 0C4.1712 0 3.37634 0.316071 2.79029 0.87868C2.20424 1.44129 1.875 2.20435 1.875 3V4.2C1.37772 4.2 0.900806 4.38964 0.549175 4.72721C0.197544 5.06477 0 5.52261 0 6V10.2C0 10.6774 0.197544 11.1352 0.549175 11.4728C0.900806 11.8104 1.37772 12 1.875 12H8.125C8.62228 12 9.09919 11.8104 9.45083 11.4728C9.80246 11.1352 10 10.6774 10 10.2V6C10 5.52261 9.80246 5.06477 9.45083 4.72721C9.09919 4.38964 8.62228 4.2 8.125 4.2ZM3.125 3C3.125 2.52261 3.32254 2.06477 3.67417 1.72721C4.02581 1.38964 4.50272 1.2 5 1.2C5.49728 1.2 5.97419 1.38964 6.32583 1.72721C6.67746 2.06477 6.875 2.52261 6.875 3V4.2H3.125V3ZM8.75 10.2C8.75 10.3591 8.68415 10.5117 8.56694 10.6243C8.44973 10.7368 8.29076 10.8 8.125 10.8H1.875C1.70924 10.8 1.55027 10.7368 1.43306 10.6243C1.31585 10.5117 1.25 10.3591 1.25 10.2V6C1.25 5.84087 1.31585 5.68826 1.43306 5.57574C1.55027 5.46321 1.70924 5.4 1.875 5.4H8.125C8.29076 5.4 8.44973 5.46321 8.56694 5.57574C8.68415 5.68826 8.75 5.84087 8.75 6V10.2Z"
                  fill="#FDECD2"
                />
              </svg>
            )}

            <p>Crowdfunding</p>
          </div>
          <div className={`${style.progressbar_item} progress_realisation `}>
            {!props.projects[0].speech && (
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 6.6C4.83424 6.6 4.67527 6.66321 4.55806 6.77574C4.44085 6.88826 4.375 7.04087 4.375 7.2V9C4.375 9.15913 4.44085 9.31174 4.55806 9.42426C4.67527 9.53679 4.83424 9.6 5 9.6C5.16576 9.6 5.32473 9.53679 5.44194 9.42426C5.55915 9.31174 5.625 9.15913 5.625 9V7.2C5.625 7.04087 5.55915 6.88826 5.44194 6.77574C5.32473 6.66321 5.16576 6.6 5 6.6ZM8.125 4.2V3C8.125 2.20435 7.79576 1.44129 7.20971 0.87868C6.62366 0.316071 5.8288 0 5 0C4.1712 0 3.37634 0.316071 2.79029 0.87868C2.20424 1.44129 1.875 2.20435 1.875 3V4.2C1.37772 4.2 0.900806 4.38964 0.549175 4.72721C0.197544 5.06477 0 5.52261 0 6V10.2C0 10.6774 0.197544 11.1352 0.549175 11.4728C0.900806 11.8104 1.37772 12 1.875 12H8.125C8.62228 12 9.09919 11.8104 9.45083 11.4728C9.80246 11.1352 10 10.6774 10 10.2V6C10 5.52261 9.80246 5.06477 9.45083 4.72721C9.09919 4.38964 8.62228 4.2 8.125 4.2ZM3.125 3C3.125 2.52261 3.32254 2.06477 3.67417 1.72721C4.02581 1.38964 4.50272 1.2 5 1.2C5.49728 1.2 5.97419 1.38964 6.32583 1.72721C6.67746 2.06477 6.875 2.52261 6.875 3V4.2H3.125V3ZM8.75 10.2C8.75 10.3591 8.68415 10.5117 8.56694 10.6243C8.44973 10.7368 8.29076 10.8 8.125 10.8H1.875C1.70924 10.8 1.55027 10.7368 1.43306 10.6243C1.31585 10.5117 1.25 10.3591 1.25 10.2V6C1.25 5.84087 1.31585 5.68826 1.43306 5.57574C1.55027 5.46321 1.70924 5.4 1.875 5.4H8.125C8.29076 5.4 8.44973 5.46321 8.56694 5.57574C8.68415 5.68826 8.75 5.84087 8.75 6V10.2Z"
                  fill="#FDECD2"
                />
              </svg>
            )}

            <p>Realisatie</p>
          </div>
        </div>
      </div>
      <main
        ref={scrollRef}
        data-scroll-container
        className="data-scroll-container-detail"
      >
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
