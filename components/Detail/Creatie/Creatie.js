import React, { useState } from 'react';
import style from './creatie.module.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_FEEDBACK = gql`
  mutation addFeedback(
    $type: String!
    $motivation: String!
    $user_id: String!
    $other_user_id: String!
    $project_id: Int!
  ) {
    insert_feedbacks(
      objects: {
        type: $type
        motivation: $motivation
        user_id: $user_id
        other_user_id: $other_user_id
        project_id: $project_id
      }
    ) {
      affected_rows
      returning {
        id
        type
        motivation
        user_id
        other_user_id
        project_id
        pending
        accepted
        created_at
        updated_at
      }
    }
  }
`;

const Creatie = ({ props }) => {
  console.log(props);
  const [typeFeedback, setTypeFeedback] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [motivation, setMotivation] = useState('');
  const [addFeedback] = useMutation(ADD_FEEDBACK);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeFeedback != '' && motivation != '') {
      addFeedback({
        variables: {
          type: typeFeedback,
          motivation: motivation,
          user_id: props.projects[0].user_id,
          other_user_id: props.users[0].id,
          project_id: props.projects[0].id,
        },
      });
      setCurrentIndex(2);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setMotivation('');
    setTypeFeedback('');
    setCurrentIndex(0);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {currentIndex == 0 && (
            <>
              <p>1. Kies de juiste bouwsteen voor jouw denkwijze.</p>
              <label htmlFor="change">
                <input
                  id="change"
                  type="radio"
                  name="feedback"
                  onClick={(e) => {
                    setTypeFeedback('Aanpassing');
                    setCurrentIndex(1);
                  }}
                />
                <p>Aanpassing</p>
                <div>
                  {/* <svg
                    width="47"
                    height="47"
                    viewBox="0 0 47 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M43.4553 15.6958L43.3974 15.6625C42.6146 15.2127 41.75 14.9229 40.854 14.8101C39.9579 14.6972 39.0483 14.7636 38.1782 15.0053L38.1759 15.0059C37.2714 15.2479 36.4292 15.68 35.7056 16.2735L35.5718 16.3832L35.422 16.2966L8.13317 0.531352L43.4553 15.6958ZM43.4553 15.6958H43.4763M43.4553 15.6958H43.4763M43.4763 15.6958C44.9634 16.5978 46.049 18.0348 46.5086 19.7123C46.974 21.4111 46.7612 23.2239 45.915 24.769C42.1344 31.427 36.6574 36.9675 30.0398 40.828C23.4216 44.6889 15.8984 46.732 8.23394 46.75H6.87347C5.10076 46.7019 3.4168 45.9649 2.17994 44.6957C0.942321 43.4258 0.250151 41.7235 0.250812 39.9515L0.250754 39.9476C0.22952 38.5375 0.65721 37.1571 1.4722 36.0053C2.2872 34.8535 3.44741 33.99 4.78559 33.5391L4.95578 33.4818V33.3022L4.95578 2.3593C4.95578 2.35921 4.95578 2.35913 4.95578 2.35904C4.95647 1.98716 5.05606 1.62212 5.24438 1.30126C5.43276 0.980328 5.70316 0.715105 6.02794 0.532775L6.02794 0.532789L6.03044 0.531352C6.35007 0.347043 6.71268 0.25 7.0818 0.25C7.45086 0.25 7.8134 0.347007 8.13299 0.53125L43.4763 15.6958ZM4.45578 39.9521C4.45597 40.6414 4.73022 41.3024 5.21814 41.7897C5.70541 42.2763 6.36592 42.55 7.05478 42.5509C14.1717 42.7436 21.2071 40.9995 27.4077 37.5053C33.5671 34.0345 38.6724 28.9666 42.1851 22.8384H42.2175L42.2868 22.7008C42.5913 22.0957 42.6475 21.3959 42.4433 20.7501C42.2393 20.1049 41.7915 19.5646 41.1951 19.244C40.6018 18.9156 39.9035 18.8316 39.2491 19.0098C38.9299 19.0859 38.63 19.2276 38.3685 19.4257C38.1061 19.6245 37.888 19.8759 37.7284 20.1638C34.7799 25.3779 30.4981 29.7167 25.3204 32.7366C20.1425 35.7567 14.2544 37.3494 8.25805 37.3519C8.25802 37.3519 8.25798 37.3519 8.25795 37.3519L7.05978 37.3519C7.05956 37.3519 7.05934 37.3519 7.05913 37.3519C6.3804 37.348 5.72693 37.6091 5.23814 38.0796L5.23665 38.0811C4.98759 38.3249 4.79012 38.6162 4.65597 38.9378C4.52192 39.2591 4.45384 39.604 4.45578 39.9521ZM4.45578 39.9521C4.45578 39.9524 4.45578 39.9526 4.45578 39.9529L4.70578 39.9514H4.45578C4.45578 39.9516 4.45578 39.9519 4.45578 39.9521ZM9.53566 6.20699L9.16078 5.99082V6.42356V32.9028V33.164L9.42174 33.1526C14.0928 32.9475 18.6502 31.6483 22.726 29.3599C26.8017 27.0715 30.2816 23.8579 32.8846 19.9787L33.0337 19.7565L32.8019 19.6228L9.53566 6.20699ZM14.1473 25.2364C14.4931 25.0056 14.8996 24.8824 15.3155 24.8824C15.8733 24.8824 16.4081 25.1037 16.8023 25.4975C17.1966 25.8913 17.418 26.4252 17.418 26.982C17.418 27.3972 17.2948 27.803 17.0638 28.1483C16.8328 28.4936 16.5045 28.7627 16.1202 28.9217C15.736 29.0806 15.3132 29.1222 14.9053 29.0412C14.4974 28.9601 14.1228 28.7601 13.8287 28.4665C13.5347 28.1728 13.3345 27.7987 13.2534 27.3915C13.1723 26.9843 13.214 26.5622 13.373 26.1786C13.5321 25.795 13.8016 25.4671 14.1473 25.2364ZM14.1473 14.7105C14.4931 14.4797 14.8996 14.3565 15.3155 14.3565C15.8733 14.3565 16.4081 14.5778 16.8023 14.9716C17.1966 15.3654 17.418 15.8993 17.418 16.4561C17.418 16.8712 17.2948 17.2771 17.0638 17.6224C16.8328 17.9676 16.5045 18.2368 16.1202 18.3957C15.736 18.5547 15.3132 18.5963 14.9053 18.5152C14.4974 18.4342 14.1228 18.2342 13.8287 17.9406C13.5347 17.6469 13.3345 17.2728 13.2534 16.8656C13.1723 16.4584 13.214 16.0363 13.373 15.6527C13.5321 15.2691 13.8016 14.9412 14.1473 14.7105ZM22.039 19.6707C22.4332 19.2769 22.968 19.0556 23.5258 19.0556C24.0835 19.0556 24.6183 19.2769 25.0126 19.6707C25.4068 20.0644 25.6283 20.5984 25.6283 21.1551V23.5047C25.6283 24.0614 25.4068 24.5954 25.0126 24.9892C24.6183 25.3829 24.0835 25.6042 23.5258 25.6042C22.968 25.6042 22.4332 25.3829 22.039 24.9892C21.6447 24.5954 21.4233 24.0614 21.4233 23.5047V21.1551C21.4233 20.5984 21.6447 20.0644 22.039 19.6707Z"
                      fill="#091422"
                      stroke="#FDECD2"
                      stroke-width="0.5"
                    />
                  </svg> */}
                </div>
              </label>
              <label htmlFor="addition">
                <input
                  id="addition"
                  type="radio"
                  name="feedback"
                  onClick={(e) => {
                    setTypeFeedback('Toevoeging');
                    setCurrentIndex(1);
                  }}
                />
                <p>Toevoeging</p>
                <div>
                  {/* <svg
                    width="47"
                    height="47"
                    viewBox="0 0 47 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M43.4553 15.6958L43.3974 15.6625C42.6146 15.2127 41.75 14.9229 40.854 14.8101C39.9579 14.6972 39.0483 14.7636 38.1782 15.0053L38.1759 15.0059C37.2714 15.2479 36.4292 15.68 35.7056 16.2735L35.5718 16.3832L35.422 16.2966L8.13317 0.531352L43.4553 15.6958ZM43.4553 15.6958H43.4763M43.4553 15.6958H43.4763M43.4763 15.6958C44.9634 16.5978 46.049 18.0348 46.5086 19.7123C46.974 21.4111 46.7612 23.2239 45.915 24.769C42.1344 31.427 36.6574 36.9675 30.0398 40.828C23.4216 44.6889 15.8984 46.732 8.23394 46.75H6.87347C5.10076 46.7019 3.4168 45.9649 2.17994 44.6957C0.942321 43.4258 0.250151 41.7235 0.250812 39.9515L0.250754 39.9476C0.22952 38.5375 0.65721 37.1571 1.4722 36.0053C2.2872 34.8535 3.44741 33.99 4.78559 33.5391L4.95578 33.4818V33.3022L4.95578 2.3593C4.95578 2.35921 4.95578 2.35913 4.95578 2.35904C4.95647 1.98716 5.05606 1.62212 5.24438 1.30126C5.43276 0.980328 5.70316 0.715105 6.02794 0.532775L6.02794 0.532789L6.03044 0.531352C6.35007 0.347043 6.71268 0.25 7.0818 0.25C7.45086 0.25 7.8134 0.347007 8.13299 0.53125L43.4763 15.6958ZM4.45578 39.9521C4.45597 40.6414 4.73022 41.3024 5.21814 41.7897C5.70541 42.2763 6.36592 42.55 7.05478 42.5509C14.1717 42.7436 21.2071 40.9995 27.4077 37.5053C33.5671 34.0345 38.6724 28.9666 42.1851 22.8384H42.2175L42.2868 22.7008C42.5913 22.0957 42.6475 21.3959 42.4433 20.7501C42.2393 20.1049 41.7915 19.5646 41.1951 19.244C40.6018 18.9156 39.9035 18.8316 39.2491 19.0098C38.9299 19.0859 38.63 19.2276 38.3685 19.4257C38.1061 19.6245 37.888 19.8759 37.7284 20.1638C34.7799 25.3779 30.4981 29.7167 25.3204 32.7366C20.1425 35.7567 14.2544 37.3494 8.25805 37.3519C8.25802 37.3519 8.25798 37.3519 8.25795 37.3519L7.05978 37.3519C7.05956 37.3519 7.05934 37.3519 7.05913 37.3519C6.3804 37.348 5.72693 37.6091 5.23814 38.0796L5.23665 38.0811C4.98759 38.3249 4.79012 38.6162 4.65597 38.9378C4.52192 39.2591 4.45384 39.604 4.45578 39.9521ZM4.45578 39.9521C4.45578 39.9524 4.45578 39.9526 4.45578 39.9529L4.70578 39.9514H4.45578C4.45578 39.9516 4.45578 39.9519 4.45578 39.9521ZM9.53566 6.20699L9.16078 5.99082V6.42356V32.9028V33.164L9.42174 33.1526C14.0928 32.9475 18.6502 31.6483 22.726 29.3599C26.8017 27.0715 30.2816 23.8579 32.8846 19.9787L33.0337 19.7565L32.8019 19.6228L9.53566 6.20699ZM14.1473 25.2364C14.4931 25.0056 14.8996 24.8824 15.3155 24.8824C15.8733 24.8824 16.4081 25.1037 16.8023 25.4975C17.1966 25.8913 17.418 26.4252 17.418 26.982C17.418 27.3972 17.2948 27.803 17.0638 28.1483C16.8328 28.4936 16.5045 28.7627 16.1202 28.9217C15.736 29.0806 15.3132 29.1222 14.9053 29.0412C14.4974 28.9601 14.1228 28.7601 13.8287 28.4665C13.5347 28.1728 13.3345 27.7987 13.2534 27.3915C13.1723 26.9843 13.214 26.5622 13.373 26.1786C13.5321 25.795 13.8016 25.4671 14.1473 25.2364ZM14.1473 14.7105C14.4931 14.4797 14.8996 14.3565 15.3155 14.3565C15.8733 14.3565 16.4081 14.5778 16.8023 14.9716C17.1966 15.3654 17.418 15.8993 17.418 16.4561C17.418 16.8712 17.2948 17.2771 17.0638 17.6224C16.8328 17.9676 16.5045 18.2368 16.1202 18.3957C15.736 18.5547 15.3132 18.5963 14.9053 18.5152C14.4974 18.4342 14.1228 18.2342 13.8287 17.9406C13.5347 17.6469 13.3345 17.2728 13.2534 16.8656C13.1723 16.4584 13.214 16.0363 13.373 15.6527C13.5321 15.2691 13.8016 14.9412 14.1473 14.7105ZM22.039 19.6707C22.4332 19.2769 22.968 19.0556 23.5258 19.0556C24.0835 19.0556 24.6183 19.2769 25.0126 19.6707C25.4068 20.0644 25.6283 20.5984 25.6283 21.1551V23.5047C25.6283 24.0614 25.4068 24.5954 25.0126 24.9892C24.6183 25.3829 24.0835 25.6042 23.5258 25.6042C22.968 25.6042 22.4332 25.3829 22.039 24.9892C21.6447 24.5954 21.4233 24.0614 21.4233 23.5047V21.1551C21.4233 20.5984 21.6447 20.0644 22.039 19.6707Z"
                      fill="#091422"
                      stroke="#FDECD2"
                      stroke-width="0.5"
                    />
                  </svg> */}
                </div>
              </label>
              <label htmlFor="other">
                <input
                  id="other"
                  type="radio"
                  name="feedback"
                  onClick={(e) => {
                    setTypeFeedback('Overig');
                    setCurrentIndex(1);
                  }}
                />
                <p>Overig</p>
                <div>
                  {/* <svg
                    width="47"
                    height="47"
                    viewBox="0 0 47 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M43.4553 15.6958L43.3974 15.6625C42.6146 15.2127 41.75 14.9229 40.854 14.8101C39.9579 14.6972 39.0483 14.7636 38.1782 15.0053L38.1759 15.0059C37.2714 15.2479 36.4292 15.68 35.7056 16.2735L35.5718 16.3832L35.422 16.2966L8.13317 0.531352L43.4553 15.6958ZM43.4553 15.6958H43.4763M43.4553 15.6958H43.4763M43.4763 15.6958C44.9634 16.5978 46.049 18.0348 46.5086 19.7123C46.974 21.4111 46.7612 23.2239 45.915 24.769C42.1344 31.427 36.6574 36.9675 30.0398 40.828C23.4216 44.6889 15.8984 46.732 8.23394 46.75H6.87347C5.10076 46.7019 3.4168 45.9649 2.17994 44.6957C0.942321 43.4258 0.250151 41.7235 0.250812 39.9515L0.250754 39.9476C0.22952 38.5375 0.65721 37.1571 1.4722 36.0053C2.2872 34.8535 3.44741 33.99 4.78559 33.5391L4.95578 33.4818V33.3022L4.95578 2.3593C4.95578 2.35921 4.95578 2.35913 4.95578 2.35904C4.95647 1.98716 5.05606 1.62212 5.24438 1.30126C5.43276 0.980328 5.70316 0.715105 6.02794 0.532775L6.02794 0.532789L6.03044 0.531352C6.35007 0.347043 6.71268 0.25 7.0818 0.25C7.45086 0.25 7.8134 0.347007 8.13299 0.53125L43.4763 15.6958ZM4.45578 39.9521C4.45597 40.6414 4.73022 41.3024 5.21814 41.7897C5.70541 42.2763 6.36592 42.55 7.05478 42.5509C14.1717 42.7436 21.2071 40.9995 27.4077 37.5053C33.5671 34.0345 38.6724 28.9666 42.1851 22.8384H42.2175L42.2868 22.7008C42.5913 22.0957 42.6475 21.3959 42.4433 20.7501C42.2393 20.1049 41.7915 19.5646 41.1951 19.244C40.6018 18.9156 39.9035 18.8316 39.2491 19.0098C38.9299 19.0859 38.63 19.2276 38.3685 19.4257C38.1061 19.6245 37.888 19.8759 37.7284 20.1638C34.7799 25.3779 30.4981 29.7167 25.3204 32.7366C20.1425 35.7567 14.2544 37.3494 8.25805 37.3519C8.25802 37.3519 8.25798 37.3519 8.25795 37.3519L7.05978 37.3519C7.05956 37.3519 7.05934 37.3519 7.05913 37.3519C6.3804 37.348 5.72693 37.6091 5.23814 38.0796L5.23665 38.0811C4.98759 38.3249 4.79012 38.6162 4.65597 38.9378C4.52192 39.2591 4.45384 39.604 4.45578 39.9521ZM4.45578 39.9521C4.45578 39.9524 4.45578 39.9526 4.45578 39.9529L4.70578 39.9514H4.45578C4.45578 39.9516 4.45578 39.9519 4.45578 39.9521ZM9.53566 6.20699L9.16078 5.99082V6.42356V32.9028V33.164L9.42174 33.1526C14.0928 32.9475 18.6502 31.6483 22.726 29.3599C26.8017 27.0715 30.2816 23.8579 32.8846 19.9787L33.0337 19.7565L32.8019 19.6228L9.53566 6.20699ZM14.1473 25.2364C14.4931 25.0056 14.8996 24.8824 15.3155 24.8824C15.8733 24.8824 16.4081 25.1037 16.8023 25.4975C17.1966 25.8913 17.418 26.4252 17.418 26.982C17.418 27.3972 17.2948 27.803 17.0638 28.1483C16.8328 28.4936 16.5045 28.7627 16.1202 28.9217C15.736 29.0806 15.3132 29.1222 14.9053 29.0412C14.4974 28.9601 14.1228 28.7601 13.8287 28.4665C13.5347 28.1728 13.3345 27.7987 13.2534 27.3915C13.1723 26.9843 13.214 26.5622 13.373 26.1786C13.5321 25.795 13.8016 25.4671 14.1473 25.2364ZM14.1473 14.7105C14.4931 14.4797 14.8996 14.3565 15.3155 14.3565C15.8733 14.3565 16.4081 14.5778 16.8023 14.9716C17.1966 15.3654 17.418 15.8993 17.418 16.4561C17.418 16.8712 17.2948 17.2771 17.0638 17.6224C16.8328 17.9676 16.5045 18.2368 16.1202 18.3957C15.736 18.5547 15.3132 18.5963 14.9053 18.5152C14.4974 18.4342 14.1228 18.2342 13.8287 17.9406C13.5347 17.6469 13.3345 17.2728 13.2534 16.8656C13.1723 16.4584 13.214 16.0363 13.373 15.6527C13.5321 15.2691 13.8016 14.9412 14.1473 14.7105ZM22.039 19.6707C22.4332 19.2769 22.968 19.0556 23.5258 19.0556C24.0835 19.0556 24.6183 19.2769 25.0126 19.6707C25.4068 20.0644 25.6283 20.5984 25.6283 21.1551V23.5047C25.6283 24.0614 25.4068 24.5954 25.0126 24.9892C24.6183 25.3829 24.0835 25.6042 23.5258 25.6042C22.968 25.6042 22.4332 25.3829 22.039 24.9892C21.6447 24.5954 21.4233 24.0614 21.4233 23.5047V21.1551C21.4233 20.5984 21.6447 20.0644 22.039 19.6707Z"
                      fill="#091422"
                      stroke="#FDECD2"
                      stroke-width="0.5"
                    />
                  </svg> */}
                </div>
              </label>
            </>
          )}
          {currentIndex == 1 && (
            <>
              <button
                onClick={(e) => {
                  setCurrentIndex(0);
                }}
              >
                terug
              </button>
              <p>2. Hoe wil je het project helpen met jouw feedback?</p>
              <textarea
                rows="5"
                required
                min="10"
                max="500"
                value={motivation}
                placeholder="Misschien is het leuk om ..."
                onChange={(e) => setMotivation(e.currentTarget.value)}
              />
              <input type="submit" value="Verzend feedback" />
            </>
          )}
          {currentIndex == 2 && (
            <>
              <p>Uw feedback is in behandeling bij de projecteigenaar!</p>
              <button onClick={handleBack}>meer toevoegen</button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Creatie;
