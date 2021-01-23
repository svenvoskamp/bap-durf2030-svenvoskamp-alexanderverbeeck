import React from 'react';
import Router from 'next/router';
import style from "./logout.module.css";

const Logout = ({ logoutHandler }) => (


<button className={`${style.profile_button} ${style.scale}`} onClick={() => Router.push('/api/logout')}>
  <div className={style.nav_item}>
    <img
    className={`${style.nav_item__image} ${style.scale}`}
    src="./assets/images/logout_icon.svg"
    alt=""
    />
  </div>
  <p className={style.nav_item__small}>Uitloggen</p>
</button>
);

export default Logout;
