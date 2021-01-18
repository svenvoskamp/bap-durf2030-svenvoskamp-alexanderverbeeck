import React from 'react';
import Router from 'next/router';

const Logout = ({ logoutHandler }) => (

  

<button class="scale profile-button" onClick={() => Router.push('/api/logout')}>
  <div class="nav-item">
    <img
    class="scale nav-item--image"
    src="./assets/images/logout_icon.svg"
    alt=""
    />
  </div>
  <p class="nav-item--small">Uitloggen</p>
</button>
);

export default Logout;
