import React, { useState } from 'react';
import style from './crowdfunding.module.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Donation from './Donation/Donation';
import { useRouter } from 'next/router';

const ADD_DONATION = gql`
  mutation addDonation(
    $amount: Int!
    $project_id: Int!
    $user_id: String!
    $reward: String!
    $donated: Int!
  ) {
    insert_donations(
      objects: {
        amount: $amount
        project_id: $project_id
        user_id: $user_id
        reward: $reward
      }
    ) {
      affected_rows
      returning {
        id
        amount
        project_id
        user_id
        reward
        created_at
        updated_at
        user {
          first_name
          last_name
        }
      }
    }
    update_projects(
      where: { id: { _eq: $project_id } }
      _set: { donated: $donated }
    ) {
      affected_rows
    }
  }
`;

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

const Crowdfunding = ({ props, user }) => {
  const [typeAmount, setTypeAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addDonation] = useMutation(ADD_DONATION);
  // const [updateAmount] = useMutation(UPDATE_PROJECT);
  const router = useRouter();

  const handleSubmit = (e) => {
    let totalAmount;
    totalAmount = +props.projects[0].donated + +amount;
    console.log(totalAmount);
    let finalReward;
    if (typeAmount == 1) {
      finalReward = props.projects[0].reward_one;
    }
    if (typeAmount == 2) {
      finalReward = props.projects[0].reward_two;
    }
    if (typeAmount == 3) {
      finalReward = props.projects[0].reward_three;
    }
    e.preventDefault();
    if (amount != '' && typeAmount != '') {
      addDonation({
        variables: {
          amount: amount,
          project_id: props.projects[0].id,
          user_id: user.id,
          reward: finalReward,
          donated: totalAmount,
        },
        optimisticResponse: false,
        update: (cache, { data }) => {
          const cachedData = cache.readQuery({
            query: GET_PROJECT_BY_ID,
            variables: {
              id: router.query.id,
              user_id: user.id,
              user: true,
            },
          });

          const newProject = props.projects.map((p) => {
            const newDonation = data['insert_donations'].returning[0];
            p.donated = totalAmount;
            p.donations.push(newDonation);
            return p;
          });

          cache.writeQuery({
            query: GET_PROJECT_BY_ID,
            variables: {
              id: router.query.id,
              user_id: user.id,
              user: true,
            },
            data: {
              projects: newProject,
              needs: cachedData.needs,
              users: cachedData.users,
              feedbacks: cachedData.feedbacks,
            },
          });
        },
      });
    }
    setCurrentIndex(2);
  };

  const handleBack = () => {
    setCurrentIndex(0);
  };

  const handleStart = () => {
    setCurrentIndex(0);
    setTypeAmount('');
    setAmount('');
  };

  return (
    <>
      <div>
        <p>Totaal gedoneerd: €{props.projects[0].donated}</p>
      </div>
      <div>
        {props.projects[0].donations.map((donation) => (
          <Donation donation={donation}></Donation>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {currentIndex == 0 && (
            <div>
              <label htmlFor="reward1">
                <input
                  id="reward1"
                  type="radio"
                  name="rewards"
                  onClick={(e) => {
                    setTypeAmount('1');
                    setCurrentIndex(1);
                  }}
                />
                <p>1. {props.projects[0].reward_one}</p>
              </label>
              <label htmlFor="reward2">
                <input
                  id="reward2"
                  type="radio"
                  name="rewards"
                  onClick={(e) => {
                    setTypeAmount('2');
                    setCurrentIndex(1);
                  }}
                />
                <p>1. {props.projects[0].reward_two}</p>
              </label>
              <label htmlFor="reward3">
                <input
                  id="reward3"
                  type="radio"
                  name="rewards"
                  onClick={(e) => {
                    setTypeAmount('3');
                    setCurrentIndex(1);
                  }}
                />
                <p>1. {props.projects[0].reward_one}</p>
              </label>
            </div>
          )}
          {currentIndex == 1 && (
            <>
              <div>
                <p onClick={handleBack}>Terug</p>
                {typeAmount == 1 && (
                  <>
                    <p>{props.projects[0].reward_one}</p>
                    <input
                      type="number"
                      required
                      min="5"
                      max="20"
                      value={amount}
                      placeholder="Een bedrag tussen de 5 en 20 euro"
                      onChange={(e) => setAmount(e.currentTarget.value)}
                    />
                  </>
                )}
                {typeAmount == 2 && (
                  <>
                    {' '}
                    <p>{props.projects[0].reward_two}</p>
                    <input
                      type="number"
                      required
                      min="20"
                      max="50"
                      value={amount}
                      placeholder="Een bedrag tussen de 20 en 50 euro"
                      onChange={(e) => setAmount(e.currentTarget.value)}
                    />{' '}
                  </>
                )}
                {typeAmount == 3 && (
                  <>
                    {' '}
                    <p>{props.projects[0].reward_three}</p>
                    <input
                      type="number"
                      required
                      min="50"
                      max="3000"
                      value={amount}
                      placeholder="Een bedrag hoger dan 50 euro"
                      onChange={(e) => setAmount(e.currentTarget.value)}
                    />
                  </>
                )}
              </div>
              <input type="submit" value="Doneer!" />
            </>
          )}
        </form>
        {currentIndex == 2 && (
          <>
            <div>
              <p>Bedankt voor het doneren, {user.first_name}</p>
              <button onClick={handleStart}>Meer doneren?</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Crowdfunding;
