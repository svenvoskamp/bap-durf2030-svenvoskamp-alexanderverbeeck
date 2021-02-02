import React, { useRef, useEffect, useState } from 'react';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import Step1 from '../components/Form/Step1/Step1';
import Step2 from '../components/Form/Step2/Step2';
import { useStores } from '../hooks/index';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import Nav from '../components/Nav';
import Loading from '../components/Loading/Loading';
import Mouse from '../components/Mouse';

const Admin = ({ props }) => {
  return (
    <>
      <Mouse></Mouse>
      {/* <Nav user={props}></Nav> */}
    </>
  );
};

// const GetCurrentUser = ({ props }) => {
//   const router = useRouter();
//   const { loading, error, data } = useQuery(GET_CURRENT_USER, {
//     variables: { id: props.sub },
//   });
//   if (loading) {
//     return <Loading props={'gebruiker'} />;
//   }
//   if (error) {
//     console.log(error);
//   }
//   if (data.users[0].first_name) {
//     router.push('/');
//     return <></>;
//   }
//   return <Register props={data.users[0]} />;
// };

// const getUser = () => {
//   const { user, loading } = useFetchUser();
//   const router = useRouter();
//   if (loading) {
//     return <Loading props={'gebruiker'} />;
//   }
//   if (!loading && !user) {
//     router.push('/');
//   }
//   if (!loading && user.sub != 'auth0|6019996f27e50e006cb10777') {
//     router.push('/');
//   }
//   if (!loading && user.sub == 'auth0|6019996f27e50e006cb10777')
//       return <GetAdminData user = {props}></GetAdminData>
//     }
// };

export default withApollo({ ssr: true })(Admin);
