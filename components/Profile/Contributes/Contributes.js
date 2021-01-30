import React from 'react';

const Contributes = ({ props, user }) => {
  let acceptedRequest = [];
  props.map((need) => {
    if (need.other_user_id == user.id) {
      if (need.provided == true && need.pending == false) {
        acceptedRequest.push(need);
      }
    }
  });

  return (
    <>
      <div>
        <p>Goedgkeurde aanvragen</p>
        {acceptedRequest.map((need) => (
          <>
            <li>
              <p>{need.project.title}</p>
              <p>{need.need}</p>
              <p>{need.motivation}</p>
            </li>
          </>
        ))}
      </div>
    </>
  );
};

export default Contributes;
