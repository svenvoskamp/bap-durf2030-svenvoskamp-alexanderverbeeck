import React, { useRef, useEffect } from "react";

import TweenMax from "gsap";

const Mouse = () => {
  let bigBall;
  let smallBall;
  let targets;

  useEffect(() => {
    bigBall = document.querySelector(".cursor__ball--big");
    targets = document.querySelectorAll(`.scale`);
    for (let i = 0; i < targets.length; i++) {
      targets[i].addEventListener("mouseenter", onMouseHover);
      targets[i].addEventListener("mouseleave", onMouseHoverOut);
      targets[i].addEventListener("click", onMouseClick);
    }
    document.body.addEventListener("mousemove", onMouseMove);
  });

  function onMouseMove(e) {
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
  function onMouseClick() {
    TweenMax.to(bigBall, {
      duration: 0.3,
      scale: 1,
    });
  }

  return (
    <>
      <div className="cursor">
        <div className="cursor__ball cursor__ball--big">
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Mouse;
