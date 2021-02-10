import React, { useRef, useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import { useFetchUser } from "../lib/user";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/withApollo";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import Step1 from "../components/Create/Step1/Step1";
import Step2 from "../components/Create/Step2/Step2";
import Step3 from "../components/Create/Step3/Step3";
import Nav from "../components/Nav";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import style from "../css/steps.module.css";

const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      password
      picture
      first_name
    }
  }
`;

const ADD_PROJECT = gql`
  mutation addProject(
    $title: String!
    $tagline: String!
    $impact: String!
    $description: String!
    $district_id: Int!
    $image: String!
    $user_id: String!
    $theme_id: Int!
    $category_id: Int!
    $phase_id: Int!
  ) {
    insert_projects(
      objects: {
        title: $title
        tagline: $tagline
        impact: $impact
        description: $description
        district_id: $district_id
        image: $image
        user_id: $user_id
        theme_id: $theme_id
        category_id: $category_id
        phase_id: $phase_id
      }
    ) {
      affected_rows
    }
  }
`;

const Create = ({ props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addProject] = useMutation(ADD_PROJECT);

  const [theme, setTheme] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [tagline, setTagline] = useState("");
  const [impact, setImpact] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      theme !== "" &&
      category !== "" &&
      title !== "" &&
      district !== "" &&
      tagline !== "" &&
      impact !== "" &&
      description !== "" &&
      image !== ""
    ) {
      const form_data = new FormData();
      form_data.append("files", image);
      const response = await axios.post(
        `https://durf2030.herokuapp.com/storage/upload`,
        form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-path": "/upload-folder/",
          },
          withCredentials: true,
        }
      );

      const inserted_file = response.data[0];
      const url = `https://durf2030.ams3.digitaloceanspaces.com/durf2030/${inserted_file.key}`;
      const phase_id = 1;

      addProject({
        variables: {
          title: title,
          tagline: tagline,
          impact: impact,
          description: description,
          district_id: district,
          image: url,
          user_id: props.sub,
          theme_id: theme,
          category_id: category,
          phase_id: phase_id,
        },
      });
      setCurrentIndex(3);
    }
  };

  return (
    <>
      <Nav user={props}></Nav>
      {currentIndex === 0 && (
        <div className={`${style.progressbar} ${style.progressbar_project} `}>
          <div
            className={`${style.progress_item} ${style.progress_item__active}`}
          >
            <div>1. Projecttags</div>
          </div>
          <div
            className={`${style.progress_item} ${style.progress_item__inactive}`}
          >
            <div>2. Beschrijving</div>
          </div>
          <div
            className={`${style.progress_item} ${style.progress_item__inactive}`}
          >
            <div>3. Benodigdheden</div>
          </div>
        </div>
      )}
      {currentIndex === 1 && (
        <div className={`${style.progressbar} ${style.progressbar_project} `}>
          <div
            className={`${style.progress_item} ${style.progress_item__active}`}
          >
            <div>1. Projecttags</div>
          </div>
          <div
            className={`${style.progress_item} ${style.progress_item__active}`}
          >
            <div>2. Beschrijving</div>
          </div>
          <div
            className={`${style.progress_item} ${style.progress_item__inactive}`}
          >
            <div>3. Benodigdheden</div>
          </div>
        </div>
      )}
      {currentIndex === 2 && (
        <div className={`${style.progressbar} ${style.progressbar_project} `}>
          <div
            className={`${style.progress_item} ${style.progress_item__active}`}
          >
            <div>1. Projecttags</div>
          </div>
          <div
            className={`${style.progress_item} ${style.progress_item__active}`}
          >
            <div>2. Beschrijving</div>
          </div>
          <div
            className={`${style.progress_item} ${style.progress_item__active}`}
          >
            <div>3. Benodigdheden</div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {currentIndex === 0 && (
          <Step1
            theme={theme}
            category={category}
            setTheme={setTheme}
            setCategory={setCategory}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          ></Step1>
        )}
        {currentIndex === 1 && (
          <Step2
            title={title}
            setTitle={setTitle}
            district={district}
            setDistrict={setDistrict}
            tagline={tagline}
            setTagline={setTagline}
            impact={impact}
            setImpact={setImpact}
            description={description}
            setDescription={setDescription}
            image={image}
            setImage={setImage}
            setCurrentIndex={setCurrentIndex}
          ></Step2>
        )}
      </form>
      {currentIndex === 3 && <Step3 user={props}></Step3>}
    </>
  );
};

const GetCurrentUser = ({ props }) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: props.sub },
  });
  if (loading) {
    return <Loading props={"gebruiker"} />;
  }
  if (error) {
    console.log(error);
  }
  if (!data.users[0].first_name) {
    router.push("/register");
    return <></>;
  }

  return <Create props={props} />;
};

const getUser = () => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  if (loading) {
    return <Loading props={"gebruiker"} />;
  }
  if (!loading && user) {
    return <GetCurrentUser props={user} />;
  }
  if (!user && !loading) {
    router.push("/api/login");
    return <></>;
  }
};

export default withApollo({ ssr: true })(getUser);
