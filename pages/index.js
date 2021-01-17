import { preloadImages, map, clamp } from '../lib/utils';
import React, { useRef } from 'react';
import Tyle from '../components/Tyle';
import Mouse from '../components/Mouse';
import gsap from 'gsap';
import { withApollo } from '../lib/withApollo';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';

import { useStores } from '../hooks/index';
import { useRouter } from 'next/router';
import { useFetchUser } from '../lib/user';

// Initialize Locomotive Scroll (horizontal direction)

const Home = () => {
  const { user, loading } = useFetchUser();
  console.log(user);
  const router = useRouter();
  const { uiStore } = useStores();
  console.log(uiStore);
  const scrollRef = useRef(null);
  const navRef = useRef(null);

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

  import('locomotive-scroll').then((locomotiveModule) => {
    const lscroll = new locomotiveModule.default({
      el: scrollRef.current,
      smooth: true,
      direction: 'horizontal',
      smartphone: {
        smooth: true,
        horizontalGesture: true,
        direction: 'horizontal',
      },
    });

    lscroll.on('scroll', (obj) => {
      for (const key of Object.keys(obj.currentElements)) {
        if (obj.currentElements[key].el.classList.contains('card-layers')) {
          let progress = obj.currentElements[key].progress;
          const brightnessVal =
            progress < 0.5
              ? clamp(map(progress, 0, 0.5, 0, 1), 0.4, 1)
              : clamp(map(progress, 0.5, 1, 1, 0), 0.4, 1);
          obj.currentElements[
            key
          ].el.style.filter = `opacity(${brightnessVal})`;
        }
      }
    });
    lscroll.update();

    // Preload images and fonts
    Promise.all([preloadImages('.card-image')]).then(() => {
      // Remove loader (loading class)
      console.log('images zijn ingeladen');
      document.body.classList.remove('loading');
    });
  });

  return (
    <>
      <Mouse></Mouse>
      <body class="loading">
        <nav
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          class="navigation"
        >
          <div class="nav-logo">
            <img
              class="nav-logo--image"
              src="./assets/images/logo.svg"
              alt=""
            />
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
        <main ref={scrollRef} data-scroll-container>
          {/* <div class="content">
            <div class="gallery">
              <div class="text-large">
                <span
                  class="text-large--inner text-large--fill"
                  data-scroll
                  data-scroll-speed="3"
                  data-scroll-direction="vertical"
                >
                  ONTDEK.
                </span>
                <span
                  data-scroll
                  data-scroll-speed="-4"
                  data-scroll-direction="vertical"
                  class="text-large--inner"
                >
                  DURF 2030.
                </span>
              </div>

              <div class="cards">
                <Tyle color="red" direction="2" button="0.5"></Tyle>
                <Tyle color="yellow" direction="-2" button="-0.5"></Tyle>
                <Tyle color="green" direction="2" button="0.5"></Tyle>
                <Tyle color="red" direction="-2" button="-0.5"></Tyle>
                <Tyle color="yellow" direction="2" button="0.5"></Tyle>
              </div>
              <div class="text-large">
                <span
                  class="text-large--inner text-large--fill text-large--inner-2 "
                  data-scroll
                  data-scroll-speed="3"
                  data-scroll-direction="vertical"
                >
                  JOUW PROJECT.
                </span>
                <span
                  data-scroll
                  data-scroll-speed="-4"
                  data-scroll-direction="vertical"
                  class="text-large--inner text-large--inner-2"
                >
                  START NU.
                </span>
              </div>
            </div>
          </div> */}
        </main>
      </body>
    </>
  );
};

export default withApollo({ ssr: true })(Home);
