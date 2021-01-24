import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

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
      <a href={'/'} class="nav-logo">
        <img class="nav-logo--image" src="./assets/images/logo.svg" alt="" />
      </a>
      <div class="nav-items">
        <a href={'/'} class="scale item">
          <div class=" nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/nav_ontdekken.svg"
              alt=""
            />
          </div>
          <p ref={navRef} class=" nav-item--title">
            Ontdekken
          </p>
        </a>
        <a href={'/project'}class="scale item">
          <div class=" nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/nav_projecten.svg"
              alt=""
            />
          </div>
          <p class=" nav-item--title">Projecten</p>
        </a>
        <a href={'/create-project'}class="scale item">
          <div class=" nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/nav_nieuwproject.svg"
              alt=""
            />
          </div>
          <p class=" nav-item--title">Nieuw project</p>
        </a>
        <a href={'/'} class="scale item">
          <div class="nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/nav_community.svg"
              alt=""
            />
          </div>
          <p class="  nav-item--title">Community</p>
        </a>
        <a href={'/'} class="scale item">
          <div class="nav-item">
            <img
              class="nav-item--image"
              src="./assets/images/nav_durf.svg"
              alt=""
            />
          </div>
          <p class=" nav-item--title">Durf 2030</p>
        </a>
      </div>
      <div class="nav-profile">
      {user && (
          <a href={'/'} class="scale profile">
            <div class="nav-item nav-profile--image">
              <img class="" src={user.picture} alt={user.name} />
            </div>
            <p class="nav-item--title">Mijn profiel</p>
          </a>
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
      </div>
    </nav>
  );
};

export default Nav;
