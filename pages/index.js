import { preloadImages, map, clamp } from '../lib/utils';
import React, { useRef, useEffect } from 'react';
import Tyle from '../components/Tyle';

// Initialize Locomotive Scroll (horizontal direction)

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    import('locomotive-scroll').then((locomotiveModule) => {
      const lscroll = new locomotiveModule.default({
        el: scrollRef.current,
        smooth: true,
        direction: 'horizontal',
        smartphone: {
          smooth: true,
          horizontalGesture: true,
        },
      });

      lscroll.on('scroll', (obj) => {
        for (const key of Object.keys(obj.currentElements)) {
          console.log(obj.currentElements[key].el.classList);
          if (obj.currentElements[key].el.classList.contains('card-layers')) {
            let progress = obj.currentElements[key].progress;
            const saturateVal =
              progress < 0.5
                ? clamp(map(progress, 0, 0.5, 0, 1), 0.4, 1)
                : clamp(map(progress, 0.5, 1, 1, 0), 0.4, 1);
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
  }, []);

  return (
    <>
      <body class="loading">
        <nav class="navigation">
          <div class="nav-logo">
            <img class="nav-logo" src="./assets/images/logo.svg" alt="" />
          </div>
          <div class="nav-items">
            <img class="nav-item" src="./assets/images/verkennen.svg" alt="" />
            <img class="nav-item" src="./assets/images/idee.svg" alt="" />
            <img
              class="nav-item"
              src="./assets/images/crowdfunding.svg"
              alt=""
            />
            <img class="nav-item" src="./assets/images/profiel.svg" alt="" />
          </div>
          <div class="nav-profile">
            <div class="nav-logo">
              <img class="" src="./assets/images/profile_icon.png" alt="" />
            </div>
          </div>
        </nav>
        <main ref={scrollRef} data-scroll-container>
          <div class="content">
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
                  class="text-large--inner text-large--fill"
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
                  class="text-large--inner"
                >
                  START NU.
                </span>
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
};

export default Home;
