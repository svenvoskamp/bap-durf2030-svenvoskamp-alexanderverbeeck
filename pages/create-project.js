import React, { useRef, useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Step1 from '../components/Create/Step1/Step1';
import Step2 from '../components/Create/Step2/Step2';
import Step3 from '../components/Create/Step3/Step3';
import Nav from '../components/Nav';
import Loading from '../components/Loading/Loading';

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

  const [theme, setTheme] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState('');
  const [tagline, setTagline] = useState('');
  const [impact, setImpact] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phase_id = 1;
    const imgRef = await firebase.storage().ref('images/' + image.name);
    const imgUrl = imgRef.name;
    await imgRef.put(image);

    if (
      theme !== '' &&
      category !== '' &&
      title !== '' &&
      district !== '' &&
      tagline !== '' &&
      impact !== '' &&
      description !== '' &&
      image !== ''
    ) {
      addProject({
        variables: {
          title: title,
          tagline: tagline,
          impact: impact,
          description: description,
          district_id: district,
          image: imgUrl,
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
    return <Loading props={"gebruiker"}/>;
  }
  if (error) {
    console.log(error);
  }
  if (!data.users[0].first_name) {
    router.push('/register');
    return <></>;
  }

  return <Create props={props} />;
};

const getUser = () => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  if (loading) {
    return <Loading props={"gebruiker"}/>;
  }
  if (!loading && user) {
    return <GetCurrentUser props={user} />;
  }
  if (!user && !loading) {
    router.push('/api/login');
    return <></>;
  }
};

export default withApollo({ ssr: true })(getUser);
