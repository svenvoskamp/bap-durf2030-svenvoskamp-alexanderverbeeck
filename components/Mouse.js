import { preloadImages, map, clamp } from '../lib/utils';
import React, { useRef, useEffect } from 'react';
import Tyle from '../components/Tyle';
import gsap from 'gsap';
import TweenMax from 'gsap';
import Circle from '../lib/Circle';

const Mouse = () => {
  let lastFrame = 0;
  let mousePosition = { x: 0, y: 0 };
  let dots = [];
  let idle = false;
  const idleTimeout = 150;
  const amount = 20;
  const sineDots = Math.floor(amount * 0.3);
  const width = 26;
  let timeoutID;
  const mouseRef = useRef(null);
  class Dot {
    constructor(index = 0) {
      this.index = index;
      this.anglespeed = 0.05;
      this.x = 0;
      this.y = 0;
      this.scale = 1 - 0.05 * index;

      this.limit = width * 0.75 * this.scale;
      this.element = document.createElement('span');
      TweenMax.set(this.element, { scale: this.scale });
      mouseRef.current.appendChild(this.element);
    }

    lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }

    draw(delta) {
      if (!idle || this.index <= sineDots) {
        TweenMax.set(this.element, { x: this.x, y: this.y });
      } else {
        this.angleX += this.anglespeed;
        this.angleY += this.anglespeed;
        this.y = this.lockY + Math.sin(this.angleY) * this.range;
        this.x = this.lockX + Math.sin(this.angleX) * this.range;
        TweenMax.set(this.element, { x: this.x, y: this.y });
      }
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mousewheel', onMouseScroll);
    lastFrame += new Date();
    buildDots();
    render();
  });

  function startIdleTimer() {
    timeoutID = setTimeout(goInactive, idleTimeout);
    idle = false;
  }

  function goInactive() {
    idle = true;
    for (let dot of dots) {
      dot.lock();
    }
  }
  function resetIdleTimer() {
    clearTimeout(timeoutID);
    startIdleTimer();
  }

  function buildDots() {
    for (let i = 0; i < amount; i++) {
      let dot = new Dot(i);
      dots.push(dot);
    }
  }

  const onMouseMove = (event) => {
    mousePosition.x = event.clientX - width / 2;
    mousePosition.y = event.clientY - width / 2;
    resetIdleTimer();
  };

  const onMouseScroll = (event) => {
    if (document.body.doScroll) {
      mousePosition.x = event.clientX - width / 2;
      mousePosition.y = event.clientY - width / 2;
      resetIdleTimer();
    }
  };

  const onTouchMove = (event) => {
    mousePosition.x = event.touches[0].pageXOffset - width / 2;
    mousePosition.y = event.touches[0].pageYOffset - width / 2;
    resetIdleTimer();
  };

  const render = (timestamp) => {
    const delta = timestamp - lastFrame;
    positionCursor(delta);
    lastFrame = timestamp;
    requestAnimationFrame(render);
  };

  const positionCursor = (delta) => {
    let x = mousePosition.x;
    let y = mousePosition.y;
    dots.forEach((dot, index, dots) => {
      let nextDot = dots[index + 1] || dots[0];
      dot.x = x;
      dot.y = y;
      dot.draw(delta);
      if (!idle || index <= sineDots) {
        const dx = (nextDot.x - dot.x) * 0.35;
        const dy = (nextDot.y - dot.y) * 0.35;
        x += dx;
        y += dy;
      }
    });
  };

  return (
    <>
      <div ref={mouseRef} id="cursor" class="cursor"></div>
    </>
  );
};

export default Mouse;
