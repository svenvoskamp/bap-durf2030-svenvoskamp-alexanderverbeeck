import React, { useRef, useEffect, useState } from 'react';
import { useFetchUser } from '../lib/user';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withApollo } from '../lib/withApollo';
import Mouse from '../components/Mouse';
import Step1 from '../components/Form/Step1';
import Step2 from '../components/Form/Step2';
import { useStores } from '../hooks/index';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';

const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      password
      picture
      first_name
      last_name
      company
      company_name
      street
      house_number
      city
      zip
      phone_number
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $first_name: String!
    $last_name: String!
    $company: Boolean!
    $company_name: String
    $street: String!
    $house_number: String!
    $city: String!
    $zip: String!
    $phone_number: numeric
    $addition: String
    $sector: String!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        first_name: $first_name
        last_name: $last_name
        company: $company
        company_name: $company_name
        street: $street
        house_number: $house_number
        city: $city
        zip: $zip
        phone_number: $phone_number
        addition: $addition
        sector: $sector
      }
    ) {
      affected_rows
    }
  }
`;

const Register = ({ props }) => {
  const pRef = useRef(null);
  const router = useRouter();
  if (props.first_name) {
    router.push('/');
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [department, setDepartment] = useState('');
  const [sector, setSector] = useState('');
  const [streetName, setStreetName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [addition, setAddition] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [telephone, setTelephone] = useState('');

  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = (e) => {
    console.log('formulier verzend');
    e.preventDefault();
    if (company == false) {
      if (
        firstName !== '' &&
        lastName !== '' &&
        company !== '' &&
        sector !== '' &&
        streetName !== '' &&
        houseNumber !== '' &&
        city !== '' &&
        zip !== ''
      ) {
        updateUser({
          variables: {
            id: props.id,
            first_name: firstName,
            last_name: lastName,
            company: company,
            company_name: companyName,
            street: streetName,
            house_number: houseNumber,
            city: city,
            zip: zip,
            phone_number: telephone,
            addition: addition,
            sector: sector,
          },
          optimisticResponse: true,
        });
        pRef.current.innerHTML = `Registratie is voltooid`;
      }
    } else {
      if (
        firstName !== '' &&
        lastName !== '' &&
        company !== '' &&
        sector !== '' &&
        streetName !== '' &&
        houseNumber !== '' &&
        city !== '' &&
        zip !== '' &&
        companyName !== '' &&
        department !== ''
      ) {
        console.log('formulier voor bedrijf moet verzonden worden');
        updateUser({
          variables: {
            id: props.id,
            first_name: firstName,
            last_name: lastName,
            company: company,
            company_name: companyName,
            street: streetName,
            house_number: houseNumber,
            city: city,
            zip: zip,
            phone_number: telephone,
            addition: addition,
            sector: sector,
          },
          optimisticResponse: true,
        });
        pRef.current.innerHTML = `Registratie is voltooid`;
      }
    }
  };

  return (
    <>
      <Mouse></Mouse>
      <form onSubmit={handleSubmit}>
        {currentIndex === 0 && (
          <Step1
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            company={company}
            setCompany={setCompany}
            companyName={companyName}
            setCompanyName={setCompanyName}
            department={department}
            setDepartment={setDepartment}
            sector={sector}
            setSector={setSector}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        {currentIndex === 1 && (
          <Step2
            company={company}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            streetName={streetName}
            setStreetName={setStreetName}
            houseNumber={houseNumber}
            setHouseNumber={setHouseNumber}
            addition={addition}
            setAddition={setAddition}
            city={city}
            setCity={setCity}
            zip={zip}
            setZip={setZip}
            telephone={telephone}
            setTelephone={setTelephone}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </form>
      <p ref={pRef}></p>
    </>
  );
};

const GetCurrentUser = ({ props }) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { id: props.sub },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
  }
  return <Register props={data.users[0]} />;
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
  if (!user) {
    router.push('/');
  }
};

export default withApollo({ ssr: true })(getUser);
