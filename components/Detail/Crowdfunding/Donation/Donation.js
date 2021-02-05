import React, { useState } from "react";
import style from "./donation.module.css";

const Donation = ({ donation }) => {
  console.log(donation);
  const date = new Date(donation.created_at.replace(" ", "T"));

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const finalDate = `${day}/${month}/${year}`;

  return (
    <>
      <div className={style.donation}>
        <div className={style.donation_icon}>
          <div className={style.icon_circle}>
            <picture>
              <source
                media="(max-width: 550px)"
                srcset={`../../../../assets/crowdfunding/crowdfunding_donatie_mobile.svg`}
              />
              <img
                src={`../../../../assets/crowdfunding/crowdfunding_donatie.svg`}
              />
            </picture>
          </div>
        </div>
        <li className={style.donation_content}>
          <div className={style.donation_info}>
            <p className={style.donation_type}>
              Donatie {donation.user.first_name} {donation.user.last_name}
            </p>
            <p className={style.donation_date}>Gedoneerd op {finalDate}</p>
          </div>
          <div className={style.donation_card}>
            <p className={style.donation_text}>€{donation.amount},</p>
          </div>
        </li>
      </div>
    </>
  );
};

export default Donation;
