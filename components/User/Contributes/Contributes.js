import React from 'react';
import styles from '../../../css/profile.module.css';
import style from '../../Profile/Contributes/contributes.module.css';

const Contributes = ({ needs, user, feedbacks }) => {
  let acceptedRequest = [];
  let acceptedFeedback = [];
  let realizedProjects = [];
  let donatedMoney = 0;

  needs.map((need) => {
    if (need.other_user_id == user.id) {
      if (need.provided == true && need.pending == false) {
        acceptedRequest.push(need);
      }
    }
  });

  feedbacks.map((feedback) => {
    if (feedback.accepted == true && feedback.pending == false) {
      acceptedFeedback.push(feedback);
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

  return (
    <>
      <div className={style.grid}>
        <div>
          <div
            className={`${styles.subdivision} ${styles.subdivision_progress} `}
          >
            <p className={styles.subtitle}>Afgeronde projecten</p>
            <div className={style.grid_info}>
              <div className={style.info_image}>
                <div className={style.image}>
                  <svg
                    className={style.icon}
                    width="38"
                    height="41"
                    viewBox="0 0 38 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.6988 31.5708L31.983 21.7207C33.1526 19.5771 33.762 17.1738 33.7547 14.733C33.7547 10.8256 32.1992 7.07819 29.4304 4.31521C26.6616 1.55223 22.9063 0 18.9907 0C15.075 0 11.3197 1.55223 8.55096 4.31521C5.78217 7.07819 4.22668 10.8256 4.22668 14.733C4.21942 17.1738 4.82874 19.5771 5.99836 21.7207L0.282582 31.5708C0.0971061 31.8914 -0.000365441 32.2551 1.02958e-06 32.6253C0.0003675 32.9954 0.0985586 33.359 0.284669 33.6792C0.470779 33.9994 0.738224 34.2649 1.06002 34.4491C1.38182 34.6332 1.74659 34.7294 2.11754 34.7279H8.17078L11.2501 39.9055C11.3539 40.0771 11.4818 40.233 11.6298 40.3686C12.0208 40.7446 12.542 40.9557 13.0851 40.9579H13.3804C13.6988 40.9144 14.003 40.7989 14.2699 40.6201C14.5367 40.4414 14.7591 40.2042 14.92 39.9266L18.9907 32.9389L23.0613 39.9897C23.2246 40.2634 23.4481 40.4965 23.7148 40.6715C23.9815 40.8465 24.2845 40.9588 24.601 41H24.8963C25.4466 41.0033 25.9765 40.7918 26.3727 40.4106C26.5145 40.2828 26.6355 40.1337 26.7312 39.9687L29.8106 34.791H35.8638C36.2355 34.7925 36.6009 34.696 36.9232 34.5112C37.2454 34.3264 37.513 34.0599 37.6988 33.7387C37.8959 33.4113 38 33.0366 38 32.6547C38 32.2729 37.8959 31.8982 37.6988 31.5708V31.5708ZM13.064 34.791L11.1869 31.655C11.002 31.3439 10.7399 31.0855 10.4259 30.9049C10.1119 30.7242 9.75653 30.6274 9.39408 30.6237H5.74526L8.76134 25.404C10.8383 27.4011 13.4559 28.7474 16.291 29.2767L13.064 34.791ZM18.9907 25.2567C16.9049 25.2567 14.866 24.6395 13.1318 23.4831C11.3976 22.3268 10.0459 20.6832 9.24771 18.7603C8.44953 16.8373 8.24069 14.7214 8.6476 12.68C9.05451 10.6386 10.0589 8.76349 11.5337 7.29173C13.0086 5.81998 14.8877 4.81771 16.9333 4.41165C18.979 4.00559 21.0994 4.214 23.0264 5.0105C24.9533 5.80701 26.6004 7.15585 27.7591 8.88645C28.9179 10.617 29.5364 12.6517 29.5364 14.733C29.5364 17.5241 28.4253 20.2008 26.4476 22.1744C24.4699 24.1479 21.7876 25.2567 18.9907 25.2567V25.2567ZM28.5873 30.6237C28.2248 30.6274 27.8695 30.7242 27.5555 30.9049C27.2414 31.0855 26.9794 31.3439 26.7945 31.655L24.9174 34.791L21.7115 29.2135C24.5366 28.6735 27.1446 27.3284 29.22 25.3408L32.2361 30.5606L28.5873 30.6237Z"
                      fill="black"
                    />
                  </svg>
                </div>
                {realizedProjects.length >= 5 && (
                  <div className={style.need_button}>
                    <a className={style.button}>
                      <div
                        className={`${style.circle_button} ${style.circle_button_provided}`}
                      >
                        <img src="../../../../assets/needs/needs_provided.svg" />
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <div className={style.info_text}>
                <h1 className={style.level_text}>
                  Level 1{' '}
                  <span className={style.level_text__outline}>"Doener"</span>
                </h1>
                <div className={style.progress}>
                  <progress
                    className={style.progressbar}
                    value={realizedProjects.length}
                    max="5"
                  ></progress>
                  <p className={style.progress_text}>
                    {realizedProjects.length}/5 Projecten
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.subdivision} ${styles.subdivision_progress}`}>
          <p className={styles.subtitle}>Ondersteunende feedback</p>
          <div className={style.grid_info}>
            <div className={style.info_image}>
              <div className={style.image}>
                <svg
                  className={style.icon}
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6439 7.15226C17.4832 7.3121 17.3556 7.50226 17.2685 7.71178C17.1815 7.92131 17.1367 8.14604 17.1367 8.37302C17.1367 8.59999 17.1815 8.82473 17.2685 9.03425C17.3556 9.24377 17.4832 9.43393 17.6439 9.59377L20.936 12.895C21.0954 13.0561 21.2851 13.184 21.494 13.2713C21.703 13.3586 21.9271 13.4036 22.1534 13.4036C22.3798 13.4036 22.6039 13.3586 22.8128 13.2713C23.0218 13.184 23.2114 13.0561 23.3708 12.895L30.3666 5.87992C30.5541 5.72715 30.7073 5.53637 30.8162 5.32009C30.925 5.10381 30.987 4.86691 30.9982 4.62491C31.0093 4.38292 30.9694 4.14129 30.8809 3.91586C30.7924 3.69044 30.6574 3.48631 30.4848 3.31685C30.3121 3.14739 30.1057 3.01642 29.8791 2.93253C29.6524 2.84865 29.4107 2.81373 29.1696 2.83008C28.9286 2.84643 28.6937 2.91367 28.4804 3.02739C28.2671 3.14112 28.0801 3.29876 27.9318 3.48999L22.1534 9.2499L20.0787 7.15226C19.9193 6.99111 19.7296 6.86319 19.5207 6.7759C19.3117 6.68861 19.0876 6.64367 18.8613 6.64367C18.6349 6.64367 18.4108 6.68861 18.2019 6.7759C17.9929 6.86319 17.8033 6.99111 17.6439 7.15226V7.15226ZM28.9949 13.1873C28.5427 13.2266 28.1245 13.4442 27.832 13.7923C27.5395 14.1404 27.3966 14.5906 27.4346 15.0442C27.4431 15.2046 27.4431 15.3653 27.4346 15.5256C27.4346 18.7177 26.17 21.779 23.9191 24.0361C21.6682 26.2932 18.6152 27.5612 15.432 27.5612H5.847L6.94438 26.478C7.26374 26.1559 7.44299 25.7201 7.44299 25.2659C7.44299 24.8116 7.26374 24.3759 6.94438 24.0537C5.41089 22.5243 4.318 20.6079 3.78128 18.5069C3.24456 16.406 3.28394 14.1987 3.89526 12.1183C4.50659 10.038 5.66713 8.16192 7.25421 6.68851C8.84128 5.21511 10.7959 4.19909 12.9114 3.7479C14.4961 3.43016 16.1278 3.43016 17.7125 3.7479C17.9376 3.79305 18.1695 3.7933 18.3947 3.74861C18.62 3.70393 18.8343 3.61519 19.0253 3.48746C19.2164 3.35973 19.3805 3.19552 19.5083 3.0042C19.6361 2.81287 19.725 2.59819 19.77 2.3724C19.8151 2.1466 19.8153 1.91413 19.7708 1.68824C19.7262 1.46236 19.6377 1.24749 19.5103 1.05589C19.3829 0.864304 19.2192 0.699747 19.0284 0.57162C18.8376 0.443492 18.6235 0.354303 18.3983 0.309145C16.3555 -0.103048 14.2512 -0.103048 12.2084 0.309145C8.74682 1.06682 5.64805 2.98952 3.42711 5.75769C1.20617 8.52586 -0.0031998 11.9728 6.35852e-06 15.5256C0.0144104 19.0438 1.22399 22.4521 3.42933 25.1885L0.497258 28.0599C0.259336 28.3017 0.098164 28.6087 0.03408 28.9422C-0.0300039 29.2758 0.00587135 29.6209 0.137179 29.934C0.265813 30.248 0.484257 30.5168 0.764982 30.7065C1.04571 30.8962 1.37615 30.9983 1.71467 31H15.432C19.5248 31 23.4499 29.3697 26.344 26.4677C29.238 23.5656 30.8639 19.6297 30.8639 15.5256V14.7691C30.8467 14.5415 30.7844 14.3195 30.6807 14.1163C30.5771 13.9131 30.4341 13.7325 30.2601 13.5853C30.0861 13.438 29.8847 13.327 29.6674 13.2587C29.4502 13.1903 29.2216 13.1661 28.9949 13.1873Z"
                    fill="#091422"
                  />
                </svg>
              </div>
              {acceptedFeedback.length >= 10 && (
                <div className={style.need_button}>
                  <a className={style.button}>
                    <div
                      className={`${style.circle_button} ${style.circle_button_provided}`}
                    >
                      <img src="../../../../assets/needs/needs_provided.svg" />
                    </div>
                  </a>
                </div>
              )}
            </div>
            <div className={style.info_text}>
              <h1 className={style.level_text}>
                Level 1{' '}
                <span className={style.level_text__outline}>
                  "Ondersteuner"
                </span>
              </h1>
              <div className={style.progress}>
                <progress
                  className={style.progressbar}
                  value={acceptedFeedback.length}
                  max="10"
                ></progress>
                <p className={style.progress_text}>
                  {acceptedFeedback.length}/10 Feedback
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.subdivision} ${styles.subdivision_progress}`}>
          <p className={styles.subtitle}>Geholpen benodigdheden</p>
          <div className={style.grid_info}>
            <div className={style.info_image}>
              <div className={style.image}>
                <svg
                  className={style.icon}
                  width="38"
                  height="45"
                  viewBox="0 0 38 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.2134 11.412L37.2747 11.451H37.3474H37.3645L37.4941 11.5667C37.4944 11.567 37.4947 11.5673 37.495 11.5676C37.5512 11.6189 37.6001 11.6778 37.6404 11.7426L37.75 12.0181V12.1511C37.7404 12.2106 37.7392 12.2712 37.7466 12.331C37.7377 12.3969 37.7384 12.4639 37.7489 12.5297C37.7467 12.5495 37.7416 12.5804 37.7334 12.6175C37.7286 12.6393 37.7237 12.6589 37.72 12.673L37.7158 12.6891L37.7147 12.693L37.7145 12.6936L37.7145 12.6936L37.7145 12.6937L37.7145 12.6937L37.7145 12.6938L37.705 12.7271V12.762V32.5117V32.5122C37.7057 32.8544 37.6196 33.1911 37.455 33.4904C37.2904 33.7896 37.0529 34.0415 36.7649 34.2226C36.7648 34.2227 36.7646 34.2228 36.7644 34.2229L20.0427 44.5493L19.7699 44.659H19.6383H19.5994L19.5623 44.6708C19.231 44.7764 18.8754 44.7764 18.5441 44.6708L18.507 44.659H18.4681H18.3365L18.0641 44.5494L1.207 34.0646C1.20685 34.0645 1.20669 34.0644 1.20654 34.0643C0.918523 33.8832 0.680979 33.6312 0.516434 33.3321C0.351796 33.0327 0.265711 32.696 0.266392 32.3538V32.3533V12.6036V12.5855L0.263781 12.5675C0.245406 12.4414 0.245406 12.3133 0.263781 12.1872L0.266392 12.1693V12.1511V11.8597L0.369091 11.6016L0.435092 11.522L0.632818 11.3828L0.644695 11.3744L0.655524 11.3648L0.851924 11.1893L1.03768 11.044L17.8331 0.532946C18.0326 0.415009 18.2486 0.328169 18.4738 0.275313H18.6707H18.6915L18.712 0.271866C18.8858 0.242711 19.0631 0.242711 19.2368 0.271866L19.2574 0.275313H19.2782H19.421C19.6146 0.336589 19.7956 0.43307 19.9549 0.560112L19.9664 0.569245L19.9788 0.576979L28.3475 5.77891L28.3496 5.78022L37.2134 11.412ZM19.0276 4.72211L18.8957 4.64015L18.7638 4.7221L6.16257 12.5496L5.81977 12.7625L6.16309 12.9746L10.191 15.4631L10.3228 15.5446L10.4545 15.4627L23.0331 7.63523L23.3745 7.4228L23.033 7.21062L19.0276 4.72211ZM16.5146 39.0817L16.8955 39.3156V38.8687V24.5032V24.3642L16.7774 24.2909L4.40126 16.5991L4.0193 16.3617V16.8114V31.2674V31.4072L4.13846 31.4804L16.5146 39.0817ZM18.7662 20.7354L18.8968 20.8145L19.0268 20.7345L31.628 12.9748L31.9716 12.7632L31.6291 12.5498L27.3087 9.85766L27.1764 9.77521L27.0441 9.85775L14.4654 17.7079L14.1204 17.9232L14.4683 18.1338L18.7662 20.7354ZM33.6546 31.4115L33.7721 31.3381V31.1995V16.8114V16.3617L33.3901 16.5991L21.0139 24.2909L20.8959 24.3642V24.5032V38.9365V39.3877L21.2784 39.1485L33.6546 31.4115Z"
                    fill="#091422"
                    stroke="#FDECD2"
                    stroke-width="0.5"
                  />
                </svg>
              </div>
              {acceptedRequest.length >= 10 && (
                <div className={style.need_button}>
                  <a className={style.button}>
                    <div
                      className={`${style.circle_button} ${style.circle_button_provided}`}
                    >
                      <img src="../../../../assets/needs/needs_provided.svg" />
                    </div>
                  </a>
                </div>
              )}
            </div>
            <div className={style.info_text}>
              <h1 className={style.level_text}>
                Level 1{' '}
                <span className={style.level_text__outline}> "Helper"</span>
              </h1>
              <div className={style.progress}>
                <progress
                  className={style.progressbar}
                  value={acceptedRequest.length}
                  max="10"
                ></progress>
                <p className={style.progress_text}>
                  {acceptedRequest.length}/10 Benodigdheden
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.subdivision} ${styles.subdivision_progress}`}>
          <p className={styles.subtitle}>Gegeven donaties</p>
          <div className={style.grid_info}>
            <div className={style.info_image}>
              <div className={style.image}>
                <svg
                  className={style.icon}
                  width="41"
                  height="25"
                  viewBox="0 0 41 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.31818 10.7143C8.94959 10.7143 8.58927 10.819 8.2828 11.0152C7.97633 11.2114 7.73746 11.4903 7.59641 11.8166C7.45535 12.1429 7.41845 12.502 7.49035 12.8484C7.56226 13.1948 7.73976 13.513 8.00039 13.7627C8.26103 14.0124 8.59309 14.1825 8.9546 14.2514C9.31611 14.3203 9.69083 14.2849 10.0314 14.1498C10.3719 14.0146 10.663 13.7857 10.8677 13.4921C11.0725 13.1984 11.1818 12.8532 11.1818 12.5C11.1818 12.0264 10.9855 11.5722 10.636 11.2373C10.2865 10.9024 9.81245 10.7143 9.31818 10.7143ZM31.6818 10.7143C31.3132 10.7143 30.9529 10.819 30.6464 11.0152C30.34 11.2114 30.1011 11.4903 29.96 11.8166C29.819 12.1429 29.7821 12.502 29.854 12.8484C29.9259 13.1948 30.1034 13.513 30.364 13.7627C30.6247 14.0124 30.9567 14.1825 31.3182 14.2514C31.6797 14.3203 32.0545 14.2849 32.395 14.1498C32.7355 14.0146 33.0266 13.7857 33.2314 13.4921C33.4362 13.1984 33.5455 12.8532 33.5455 12.5C33.5455 12.0264 33.3491 11.5722 32.9996 11.2373C32.6501 10.9024 32.1761 10.7143 31.6818 10.7143ZM35.4091 0H5.59091C4.10811 0 2.68604 0.564412 1.63754 1.56907C0.58904 2.57373 0 3.93634 0 5.35714V19.6429C0 21.0637 0.58904 22.4263 1.63754 23.4309C2.68604 24.4356 4.10811 25 5.59091 25H35.4091C36.8919 25 38.314 24.4356 39.3625 23.4309C40.411 22.4263 41 21.0637 41 19.6429V5.35714C41 3.93634 40.411 2.57373 39.3625 1.56907C38.314 0.564412 36.8919 0 35.4091 0ZM37.2727 19.6429C37.2727 20.1165 37.0764 20.5707 36.7269 20.9055C36.3774 21.2404 35.9034 21.4286 35.4091 21.4286H5.59091C5.09664 21.4286 4.62262 21.2404 4.27312 20.9055C3.92362 20.5707 3.72727 20.1165 3.72727 19.6429V5.35714C3.72727 4.88354 3.92362 4.42934 4.27312 4.09445C4.62262 3.75957 5.09664 3.57143 5.59091 3.57143H35.4091C35.9034 3.57143 36.3774 3.75957 36.7269 4.09445C37.0764 4.42934 37.2727 4.88354 37.2727 5.35714V19.6429ZM20.5 7.14286C19.3942 7.14286 18.3133 7.45705 17.3939 8.0457C16.4744 8.63435 15.7578 9.47102 15.3347 10.4499C14.9115 11.4288 14.8008 12.5059 15.0165 13.5451C15.2322 14.5843 15.7647 15.5389 16.5466 16.2881C17.3285 17.0373 18.3247 17.5475 19.4093 17.7542C20.4938 17.9609 21.6179 17.8548 22.6395 17.4494C23.6612 17.0439 24.5343 16.3572 25.1487 15.4763C25.763 14.5953 26.0909 13.5595 26.0909 12.5C26.0909 11.0792 25.5019 9.71659 24.4534 8.71193C23.4049 7.70727 21.9828 7.14286 20.5 7.14286ZM20.5 14.2857C20.1314 14.2857 19.7711 14.181 19.4646 13.9848C19.1581 13.7886 18.9193 13.5097 18.7782 13.1834C18.6372 12.8571 18.6003 12.498 18.6722 12.1516C18.7441 11.8052 18.9216 11.487 19.1822 11.2373C19.4428 10.9876 19.7749 10.8175 20.1364 10.7486C20.4979 10.6797 20.8726 10.7151 21.2132 10.8502C21.5537 10.9854 21.8448 11.2143 22.0496 11.5079C22.2543 11.8016 22.3636 12.1468 22.3636 12.5C22.3636 12.9736 22.1673 13.4278 21.8178 13.7627C21.4683 14.0976 20.9943 14.2857 20.5 14.2857Z"
                    fill="#091422"
                  />
                </svg>
              </div>
              {donatedMoney >= 100 && (
                <div className={style.need_button}>
                  <a className={style.button}>
                    <div
                      className={`${style.circle_button} ${style.circle_button_provided}`}
                    >
                      <img src="../../../../assets/needs/needs_provided.svg" />
                    </div>
                  </a>
                </div>
              )}
            </div>
            <div className={style.info_text}>
              <h1 className={style.level_text}>
                Level 1{' '}
                <span className={style.level_text__outline}>"Gever"</span>
              </h1>
              <div className={style.progress}>
                <progress
                  className={style.progressbar}
                  value={donatedMoney}
                  max="100"
                ></progress>
                <p className={style.progress_text}>€{donatedMoney}/€100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contributes;
