import React, { useRef, useState } from 'react';
import style from './realisation.module.css';

const Realisation = ({ props, user }) => {
  let email;

  if (props.projects[0].user.id.includes('goog')) {
    email = `${props.projects[0].user.nickname}@gmail.com`;
  } else {
    email = props.projects[0].user.name;
  }
  return (
    <>
      <div
        className={`${style.realisatie} realisation `}
        data-scroll
        data-scroll-repeat
      >
        {/* <div className="donations" data-scroll data-scroll-repeat> */}
        <div className={`${style.header}`}>
          <div className={style.part_title}>
            <p className={style.title}>
              {props.projects[0].title}.
              <span className={style.title_outline}>Dankwoord.</span>
            </p>
            <p className={style.title_description}>
              Het is gelukt! We zijn "{props.projects[0].title}" aan het
              realiseren!
            </p>
          </div>
        </div>
        <div className={style.donation}>
          <div className={style.donation_icon}>
            <div className={style.icon_circle}>
              <svg
                className={style.icon_circle__svg}
                width="25"
                height="23"
                viewBox="0 0 25 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7374 2.2886C21.4032 0.968175 19.641 0.168094 17.7688 0.0327242C15.8966 -0.102645 14.0376 0.435611 12.5274 1.55037C10.9354 0.366247 8.95382 -0.17069 6.98178 0.0476834C5.00975 0.266056 3.19369 1.22352 1.89933 2.72726C0.604973 4.231 -0.0715499 6.16933 0.00600018 8.1519C0.0835502 10.1345 0.909413 12.014 2.31728 13.4121L9.82469 20.982C10.5285 21.685 11.4826 22.0798 12.4773 22.0798C13.472 22.0798 14.4261 21.685 15.1299 20.982L22.6373 13.4121C23.3767 12.6897 23.9661 11.8283 24.3715 10.8774C24.7769 9.92646 24.9904 8.90482 24.9997 7.87114C25.009 6.83747 24.8139 5.81215 24.4257 4.8541C24.0374 3.89606 23.4637 3.02419 22.7374 2.2886V2.2886ZM20.9732 11.6228L13.4658 19.1302C13.3495 19.2475 13.2111 19.3406 13.0586 19.4041C12.9061 19.4676 12.7426 19.5003 12.5774 19.5003C12.4122 19.5003 12.2487 19.4676 12.0962 19.4041C11.9437 19.3406 11.8053 19.2475 11.689 19.1302L4.18162 11.6228C3.20035 10.6197 2.65087 9.27232 2.65087 7.8691C2.65087 6.46589 3.20035 5.11846 4.18162 4.1154C5.18155 3.12816 6.53015 2.57459 7.93532 2.57459C9.34049 2.57459 10.6891 3.12816 11.689 4.1154C11.8053 4.23268 11.9437 4.32576 12.0962 4.38928C12.2487 4.45281 12.4122 4.48551 12.5774 4.48551C12.7426 4.48551 12.9061 4.45281 13.0586 4.38928C13.2111 4.32576 13.3495 4.23268 13.4658 4.1154C14.4928 3.2982 15.7846 2.88759 17.0949 2.96188C18.4052 3.03616 19.6424 3.59015 20.5704 4.51817C21.4984 5.4462 22.0524 6.68335 22.1267 7.99368C22.201 9.30401 21.7904 10.5958 20.9732 11.6228V11.6228Z"
                  fill="#091422"
                />
              </svg>

              <svg
                className={style.icon_circle__svg__mobile}
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.1899 1.83088C17.1226 0.77454 15.7128 0.134475 14.215 0.0261794C12.7173 -0.0821164 11.2301 0.348489 10.0219 1.2403C8.74828 0.292998 7.16305 -0.136552 5.58543 0.0381467C4.0078 0.212845 2.55496 0.978815 1.51947 2.18181C0.483979 3.3848 -0.0572399 4.93546 0.00480014 6.52152C0.0668402 8.10758 0.72753 9.61122 1.85382 10.7297L7.85975 16.7856C8.42281 17.348 9.18606 17.6639 9.98184 17.6639C10.7776 17.6639 11.5409 17.348 12.1039 16.7856L18.1099 10.7297C18.7014 10.1517 19.1729 9.46261 19.4972 8.70189C19.8215 7.94117 19.9923 7.12385 19.9997 6.29691C20.0072 5.46997 19.8511 4.64972 19.5405 3.88328C19.23 3.11685 18.771 2.41935 18.1899 1.83088V1.83088ZM16.7786 9.29825L10.7726 15.3042C10.6796 15.398 10.5689 15.4725 10.4469 15.5233C10.3249 15.5741 10.1941 15.6003 10.0619 15.6003C9.92978 15.6003 9.79895 15.5741 9.67697 15.5233C9.55499 15.4725 9.44428 15.398 9.35122 15.3042L3.3453 9.29825C2.56028 8.4958 2.1207 7.41786 2.1207 6.29528C2.1207 5.17271 2.56028 4.09477 3.3453 3.29232C4.14524 2.50253 5.22412 2.05967 6.34826 2.05967C7.47239 2.05967 8.55128 2.50253 9.35122 3.29232C9.44428 3.38614 9.55499 3.46061 9.67697 3.51143C9.79895 3.56225 9.92978 3.58841 10.0619 3.58841C10.1941 3.58841 10.3249 3.56225 10.4469 3.51143C10.5689 3.46061 10.6796 3.38614 10.7726 3.29232C11.5942 2.63856 12.6277 2.31007 13.6759 2.3695C14.7242 2.42893 15.7139 2.87212 16.4563 3.61454C17.1988 4.35696 17.6419 5.34668 17.7014 6.39494C17.7608 7.44321 17.4323 8.47667 16.7786 9.29825V9.29825Z"
                  fill="#091422"
                />
              </svg>
            </div>
          </div>
          <li className={style.donation_content}>
            <div className={style.donation_info}>
              <p className={style.donation_type}>
                Dankwoord {props.projects[0].user.first_name}
              </p>
              <p className={style.donation_date}></p>
            </div>
            <div className={style.donation_card}>
              <p className={style.donation_text}>{props.projects[0].speech}</p>
            </div>
          </li>
        </div>
        {/* <div>
</p>
          {props.projects[0].user.phone_number && (
            <p>{props.projects[0].user.phone_number}</p>
          )}
        </div> */}

        <div className={style.contact}>
          <div>
            <p className={style.contact_title}>
              Contactgegevens {props.projects[0].user.first_name}{' '}
              {props.projects[0].user.last_name}{' '}
            </p>
          </div>
          <div>
            <div className={style.contact_info}>
              {' '}
              <div className={style.info_circle}></div>
              <a
                href={`mailto:${email}`}
                className={`${style.info_subtitle} scale `}
              >
                {email}
              </a>
            </div>
            {props.projects[0].user.phone_number && (
              <div className={style.contact_info}>
                {' '}
                <div className={style.info_circle}></div>
                <a
                  href={`tel:${props.projects[0].user.phone_number}`}
                  className={`${style.info_subtitle} scale `}
                >
                  {props.projects[0].user.phone_number}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Realisation;
