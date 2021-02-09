import React, { useRef, useEffect, useState } from "react";
import { useFetchUser } from "../lib/user";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../lib/withApollo";
import Step1 from "../components/Form/Step1/Step1";
import Step2 from "../components/Form/Step2/Step2";
import { useStores } from "../hooks/index";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import Nav from "../components/Nav";
import Loading from "../components/Loading/Loading";
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
    $phone_number: String
    $addition: String
    $sector: String!
    $department: String
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
        department: $department
      }
    ) {
      affected_rows
    }
  }
`;

const Register = ({ props, user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("not");
  const [companyName, setCompanyName] = useState("");
  const [department, setDepartment] = useState("");
  const [sector, setSector] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [addition, setAddition] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [telephone, setTelephone] = useState("");
  const streetRef = useRef();

  const [updateUser] = useMutation(UPDATE_USER);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (company == false) {
      if (
        firstName !== "" &&
        lastName !== "" &&
        company !== "" &&
        sector !== "" &&
        streetName !== "" &&
        houseNumber !== "" &&
        city !== "" &&
        zip !== ""
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

        router.push("/");
      }
    } else {
      if (
        firstName !== "" &&
        lastName !== "" &&
        company !== "" &&
        sector !== "" &&
        streetName !== "" &&
        houseNumber !== "" &&
        city !== "" &&
        zip !== "" &&
        companyName !== "" &&
        department !== ""
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
            department: department,
          },
          optimisticResponse: true,
        });
        router.push("/");
      }
    }
  };

  return (
    <>
      <Nav user={user}></Nav>
      {!props.first_name && (
        <>
          {currentIndex === 0 && (
            <div
              className={`${style.progressbar} ${style.progressbar_register} `}
            >
              <div
                className={`${style.progress_item} ${style.progress_item__active}`}
              >
                <div>1. Soort durver</div>
              </div>
              <div
                className={`${style.progress_item} ${style.progress_item__inactive}`}
              >
                <div>2. Kennismaking</div>
              </div>
            </div>
          )}
          {currentIndex === 1 && (
            <div
              className={`${style.progressbar} ${style.progressbar_register} `}
            >
              <div
                className={`${style.progress_item} ${style.progress_item__active}`}
              >
                <div>1. Soort durver</div>
              </div>
              <div
                className={`${style.progress_item} ${style.progress_item__active}`}
              >
                <div>2. Kennismaking</div>
              </div>
            </div>
          )}
          <form className={`form form__register`} onSubmit={handleSubmit}>
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
                companyName={companyName}
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
                streetRef={streetRef}
              />
            )}
          </form>
        </>
      )}
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
  if (data.users[0].first_name) {
    router.push("/");
    return <></>;
  }
  return <Register user={props} props={data.users[0]} />;
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
    router.push("/");
    return <></>;
  }
};

export default withApollo({ ssr: true })(getUser);
