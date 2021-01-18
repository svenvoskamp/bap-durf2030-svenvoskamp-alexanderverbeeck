import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';

const Nav = ({ user }) => {
  const handleHover = (e) => {
    gsap.to('.navigation', {
      duration: 0.5,
      width: '19rem',
      ease: 'easeOut',
    });

    gsap.to('.nav-logo--image', {
      padding: '0 7.5rem',
      ease: 'easeOut',
    });
  };

  const handleLeave = (e) => {
    gsap.to('.navigation', {
      duration: 0.5,
      width: '6rem',
      ease: 'easeOut',
    });

    gsap.to('.nav-logo--image', {
      padding: '0 1.5rem',
      ease: 'easeOut',
    });
  };
  const navRef = useRef(null);
  return (
    <nav
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      class="navigation"
    >
      <div class="nav-logo">
        <img class="nav-logo--image" src="./assets/images/logo.svg" alt="" />
      </div>
      <div class="nav-items">
        <div class="scale item">
          <div class=" nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/verkennen.svg"
              alt=""
            />
          </div>
          <p ref={navRef} class=" nav-item--title">
            Ontdekken
          </p>
        </div>
        <div class="scale item">
          <div class=" nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/idee.svg"
              alt=""
            />
          </div>
          <p class=" nav-item--title">Co-creatie</p>
        </div>
        <div class="scale item">
          <div class="nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/crowdfunding.svg"
              alt=""
            />
          </div>
          <p class="  nav-item--title">crowdfunding</p>
        </div>
        <div class="scale item">
          <div class="nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/profiel.svg"
              alt=""
            />
          </div>
          <p class=" nav-item--title">Realisaties</p>
        </div>
      </div>
      {user && (
        <div class="nav-profile">
          <div class="nav-profile--image">
            <img class="" src={user.picture} alt={user.name} />
          </div>
        </div>
      )}
      {!user && (
        <>
          <Login></Login>
        </>
      )}

      {user && (
        <>
          <Logout></Logout>
        </>
      )}
    </nav>
  );
};

export default Nav;
