import React, { useState } from 'react';

const Creatie = ({ feedback }) => {
  console.log(feedback);
  const date = new Date(feedback.updated_at.replace(' ', 'T'));

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  return (
    <>
      <li>
        <div>
          <p>
            {feedback.type} {feedback.otheruser.first_name}
          </p>
          <p>toegevoegd op {finalDate}</p>
        </div>
        <div>
          <p>{feedback.otheruser.first_name}:</p>
          <p>{feedback.motivation}</p>
        </div>
      </li>
    </>
  );
};

export default Creatie;
