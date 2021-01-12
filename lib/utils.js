const imagesLoaded = require('imagesloaded');

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolatio

const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Preload images
const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

export { map, clamp, randomNumber, preloadImages };
