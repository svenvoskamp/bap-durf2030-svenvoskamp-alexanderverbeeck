import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/withApollo';
import Mouse from '../../components/Mouse';
import Header from '../../components/Detail/Header';
import firebase from 'firebase/app';
import 'firebase/storage';
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
  const imgRef = useRef(null);
  const storageRef = firebase.storage().ref();
  storageRef
    .child('images/' + props.image)
    .getDownloadURL()
    .then(function (url) {
      imgRef.current.src = url;
    });
  console.log(props);
  return (
    <>
      <Mouse></Mouse>
      <Header
        theme={props.theme.theme}
        category={props.category.category}
        title={props.title}
        name={props.user.first_name}
        lastName={props.user.last_name}
        companyName={props.user.company_name}
        company={props.user.company}
        phase={props.phase.phase}
        district={props.district.district}
      ></Header>
      <div>
        <p>{props.impact}</p>
        <p>{props.description}</p>
      </div>
      <div>
        <p>{props.tagline}</p>
        <img ref={imgRef} alt={props.title}></img>
      </div>
    </>
  );
};

const getProject = () => {
  const router = useRouter();
  const id = router.query.id;

  const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { id: id },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error...</div>;
  }
  if (!data.projects[0]) {
    const handleClick = () => {
      router.push('/');
    };
    return (
      <>
        <Mouse></Mouse>
        <div>Project kan niet gevonden worden</div>
        <button onClick={handleClick}>Ga terug</button>
      </>
    );
  }
  if (data.projects[0]) {
    return <Detail props={data.projects[0]} />;
  }
};

export default withApollo({ ssr: true })(getProject);
