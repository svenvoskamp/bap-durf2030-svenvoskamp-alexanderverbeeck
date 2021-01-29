import React from 'react';

const Info = ({ props }) => {
  return (
    <>
      <div>
        <p>{props.first_name}</p>
        <p>{props.last_name}</p>
      </div>
      <div>
        {props.company && (
          <>
            <p>{props.company_name}</p>
            <p>{props.department}</p>
          </>
        )}
        <p>{props.sector}</p>
        {props.phone_number && <p>{props.phone_number}</p>}
      </div>
    </>
  );
};

export default Info;
