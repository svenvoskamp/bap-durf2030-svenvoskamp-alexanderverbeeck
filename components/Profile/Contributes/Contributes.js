import React from "react";

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
        <div>
          <h1>Afgeronde Projecten</h1>
          <img src="" alt="" />
          <p>Level 1 Doener</p>
        </div>
      </div>
    </>
  );
};

export default Contributes;
