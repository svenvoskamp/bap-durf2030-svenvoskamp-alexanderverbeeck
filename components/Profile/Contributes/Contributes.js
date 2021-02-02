import React from 'react';

const Contributes = ({ props, user, feedbacks }) => {
  let acceptedRequest = [];
  let acceptedFeedback = [];
  let realizedProjects = [];
  let donatedMoney = 0;
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

  user.projects.map((project) => {
    if (project.phase.phase == 'Realisatie') {
      realizedProjects.push(project);
    }
  });

  user.donations.map((donation) => {
    donatedMoney = donatedMoney + donation.amount;
  });
  console.log('projecten:', realizedProjects.length);
  console.log('feedback:', acceptedFeedback.length);
  console.log('benodigdheden:', acceptedRequest.length);
  console.log('gedoneerd:', donatedMoney);

  return (
    <>
      <div>
        <div>
          <h1>Afgeronde Projecten</h1>
          <div>
            <img />
          </div>
          <div>
            <h1>Level 1 "Doener"</h1>
            <progress value={realizedProjects.length} max="5"></progress>
            <p>{realizedProjects.length}/5 Projecten</p>
          </div>
        </div>
        <div>
          <h1>Ondersteunende feedback</h1>
          <div>
            <img />
          </div>
          <div>
            <h1>Level 1 "Ondersteuner"</h1>
            <progress value={acceptedFeedback.length} max="10"></progress>
            <p>{acceptedFeedback.length}/10 Feedback</p>
          </div>
        </div>
        <div>
          <h1>Geholpen benodigdheden</h1>
          <div>
            <img />
          </div>
          <div>
            <h1>Level 1 "Helper"</h1>
            <progress value={acceptedRequest.length} max="10"></progress>
            <p>{acceptedRequest.length}/10 Benodigdheden</p>
          </div>
        </div>
        <div>
          <h1>Gedoneerd geld</h1>
          <div>
            <img />
          </div>
          <div>
            <h1>Level 1 "Gever"</h1>
            <progress value={donatedMoney} max="100"></progress>
            <p>€{donatedMoney}/€100</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributes;
