import React from 'react';

const Contributes = ({ props, user, feedbacks }) => {
  let acceptedRequest = [];
  let acceptedFeedback = [];
  props.map((need) => {
    if (need.other_user_id == user.id) {
      if (need.provided == true && need.pending == false) {
        acceptedRequest.push(need);
      }
    }
  });

  feedbacks.map((feedback) => {
    if (feedback.other_user_id == user.id) {
      if (feedback.accepted == true && feedback.pending == false) {
        acceptedFeedback.push(feedback);
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
        {acceptedFeedback.map((feedback) => (
          <>
            <li>
              <p>{feedback.project.title}</p>
              <p>{feedback.type}</p>
              <p>{feedback.motivation}</p>
            </li>
          </>
        ))}
      </div>
    </>
  );
};

export default Contributes;
