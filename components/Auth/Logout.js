import React from 'react';
import Router from 'next/router';

const Logout = ({ logoutHandler }) => (


<button class="profile_button scale" onClick={() => Router.push('/api/logout')}>
  <div class="nav-item">
    <img
    class="nav-item--image scale"
    src="./assets/images/logout_icon.svg"
    alt=""
    />
  </div>
  <p class="nav-item--small">Uitloggen</p>
</button>
);

export default Logout;
