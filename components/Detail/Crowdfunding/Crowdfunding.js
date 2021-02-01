import React, { useState } from 'react';
import style from './crowdfunding.module.css';

const Crowdfunding = ({ props }) => {
  const [typeAmount, setTypeAmount] = useState();
  const [amount, setAmount] = useState();

  const handleSubmit = (e) => {};

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
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
                setTypeAmount('1');
                setCurrentIndex(1);
              }}
            />
            <p>1. {props.projects[0].reward_one}</p>
          </label>
        </form>
      </div>
    </>
  );
};

export default Crowdfunding;
