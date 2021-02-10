import React, { useState } from "react";
import style from "./feedback.module.css";

const Feedback = ({ feedback }) => {
  const date = new Date(feedback.updated_at.replace(" ", "T"));

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  return (
    <div className={style.feedback}>
      <div className={style.feedback_icon}>
        <div
          className={`${
            style.icon_circle
          } icon-circle--${feedback.type.toLowerCase()} `}
        >
          <picture>
            <source
              media="(max-width: 550px)"
              srcset={`../../../../assets/creatie/creatie_${feedback.type.toLowerCase()}_mobile.svg`}
            />
            <img
              src={`../../../../assets/creatie/creatie_${feedback.type.toLowerCase()}.svg`}
            />
          </picture>
        </div>
      </div>
      <li className={style.feedback_content}>
        <div className={style.feedback_card}>
          <a
            href={`../user/${feedback.otheruser.id}`}
            className={`${style.feedback_card__profile} scale`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C6.44543 0.00295108 4.92527 0.457522 3.62467 1.30834C2.32408 2.15916 1.29919 3.36951 0.67484 4.79197C0.0504899 6.21442 -0.146372 7.78758 0.108231 9.31984C0.362835 10.8521 1.05792 12.2773 2.10881 13.4219C2.85937 14.2348 3.77032 14.8835 4.78424 15.3272C5.79816 15.7709 6.89308 16 8 16C9.10692 16 10.2018 15.7709 11.2158 15.3272C12.2297 14.8835 13.1406 14.2348 13.8912 13.4219C14.9421 12.2773 15.6372 10.8521 15.8918 9.31984C16.1464 7.78758 15.9495 6.21442 15.3252 4.79197C14.7008 3.36951 13.6759 2.15916 12.3753 1.30834C11.0747 0.457522 9.55457 0.00295108 8 0V0ZM8 14.4149C6.33962 14.4124 4.74495 13.7665 3.55155 12.613C3.91387 11.7318 4.53024 10.978 5.32232 10.4475C6.1144 9.91703 7.04644 9.6338 8 9.6338C8.95356 9.6338 9.8856 9.91703 10.6777 10.4475C11.4698 10.978 12.0861 11.7318 12.4484 12.613C11.2551 13.7665 9.66038 14.4124 8 14.4149ZM6.39696 6.40662C6.39696 6.08984 6.49097 5.78018 6.66712 5.51679C6.84326 5.2534 7.09362 5.04811 7.38654 4.92689C7.67946 4.80566 8.00178 4.77394 8.31274 4.83574C8.6237 4.89754 8.90933 5.05009 9.13352 5.27408C9.35771 5.49808 9.51039 5.78346 9.57224 6.09415C9.6341 6.40485 9.60235 6.72688 9.48102 7.01955C9.35969 7.31221 9.15422 7.56236 8.8906 7.73835C8.62698 7.91434 8.31705 8.00828 8 8.00828C7.57485 8.00828 7.16711 7.83953 6.86648 7.53916C6.56585 7.23879 6.39696 6.83141 6.39696 6.40662ZM13.5385 11.2116C12.8224 9.98773 11.7202 9.03576 10.4046 8.50479C10.8127 8.04244 11.0786 7.47225 11.1704 6.86264C11.2622 6.25304 11.176 5.62991 10.9222 5.06804C10.6683 4.50616 10.2576 4.02941 9.73923 3.69499C9.2209 3.36057 8.617 3.18269 8 3.18269C7.383 3.18269 6.7791 3.36057 6.26077 3.69499C5.74244 4.02941 5.33171 4.50616 5.07785 5.06804C4.82399 5.62991 4.73779 6.25304 4.8296 6.86264C4.92141 7.47225 5.18732 8.04244 5.59543 8.50479C4.27981 9.03576 3.17762 9.98773 2.46148 11.2116C1.89075 10.2403 1.5892 9.13461 1.58782 8.00828C1.58782 6.30914 2.26339 4.67959 3.4659 3.47811C4.66842 2.27664 6.29938 1.60166 8 1.60166C9.70062 1.60166 11.3316 2.27664 12.5341 3.47811C13.7366 4.67959 14.4122 6.30914 14.4122 8.00828C14.4108 9.13461 14.1092 10.2403 13.5385 11.2116V11.2116Z"
                fill="#091422"
              />
            </svg>

            <p className={style.feedback_name}>
              {feedback.otheruser.first_name}:
            </p>
          </a>
          <p className={style.feedback_text}>"{feedback.motivation}"</p>
        </div>
        <div className={style.feedback_info}>
          <p className={style.feedback_type}>
            {feedback.type} {feedback.otheruser.first_name}
          </p>
          <p className={style.feedback_date}>Toegevoegd op {finalDate}</p>
        </div>
      </li>
    </div>
  );
};

export default Feedback;
