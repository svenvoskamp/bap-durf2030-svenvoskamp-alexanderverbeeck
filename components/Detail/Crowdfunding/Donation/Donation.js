import React, { useState } from 'react';

const Donation = ({ donation }) => {
  console.log(donation);
  const date = new Date(donation.created_at.replace(' ', 'T'));

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  return (
    <div>
      <p>
        {donation.user.first_name} {donation.user.last_name}
      </p>
      <p>Gedoneer op {finalDate}</p>
      <div>
        <p>€{donation.amount}</p>
      </div>
    </div>
  );
};

export default Donation;
