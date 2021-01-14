import React, { useRef, useEffect } from 'react';

import TweenMax from 'gsap';

const Mouse = () => {
  let bigBall;
  let smallBall;
  let targets;

  useEffect(() => {
    console.log('hallo');
    bigBall = document.querySelector('.cursor__ball--big');
    targets = document.querySelectorAll(`.scale`);
    for (let i = 0; i < targets.length; i++) {
      targets[i].addEventListener('mouseenter', onMouseHover);
      targets[i].addEventListener('mouseleave', onMouseHoverOut);
    }
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('wheel', onMouseMove);
  });

  function onMouseMove(e) {
    console.log(e);
    TweenMax.to(bigBall, {
      duration: 0,
      x: e.clientX - 15,
      y: e.clientY - 15,
    });
  }
  function onMouseHover() {
    TweenMax.to(bigBall, {
      duration: 0.3,
      scale: 2,
    });
  }
  function onMouseHoverOut() {
    TweenMax.to(bigBall, {
      duration: 0.3,
      scale: 1,
    });
  }

  return (
    <>
      <div class="cursor">
        <div class="cursor__ball cursor__ball--big ">
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Mouse;
