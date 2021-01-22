import React, { useRef, useEffect, useState } from 'react';
import Mouse from '../components/Mouse';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Step1 from '../components/Create/Step1';

const handleChange = async (e) => {
  if (e.target.files[0]) {
    const img = e.target.files[0];
    const imgRef = await firebase.storage().ref('images/' + img.name);
    const imgUrl = imgRef.name;
    await imgRef.put(img);
  }
};

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



const Create = ({ props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, error, data } = useQuery(GET_CURRENT_USER);
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState('');
  const [tagline, setTagline] = useState('');
  const [impact, setImpact] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  return (
    <>
      <Mouse></Mouse>
      <Step1
        tag1={tag1}
        setTag1={setTag1}
        tag2={tag2}
        setTag2={setTag2}
        currentIndex={currentIndex}
      ></Step1>
    </>
  );
};

const GetCurrentUser = ({ props }) => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: props.sub },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }
  if (!data.users[0].first_name) {
    router.push('/register');
    return <></>;
  }

  return <Create props={data.users[0]} />;
};

const getUser = () => {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  if (loading) {
    return <p>Loading</p>;
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
