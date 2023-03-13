const scale = 1;
// Try to get rid of all solid values, and only rely on percentages
function width() {
  return window.innerWidth * scale;
}
function height() {
  return window.innerHeight * scale;
}
function coinFlip() {
  const r = Math.random();
  return r >= 0.48;
}
function rw() {
  return Math.random();
  //   return Math.random() * width();
}
function rh() {
  return rw();
}
function erw() {
  return range(-0.1, 1.1);
  //   return Math.random() * width() * 1.5 - 0.5 * width();
}
function erh() {
  return erw();
  //   return Math.random() * height() * 1.5 - 0.5 * height();
}
function ra() {
  return Math.random() * 360;
}
function color() {
  return `rgba(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 100) /
    100})`;
}
function rDash() {
  return coinFlip() ? [] : [Math.random(), Math.random()];
}
function rLineWidth() {
  return range(-0.5, 1);
}

function range(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export {
  width,
  height,
  coinFlip,
  rw,
  rh,
  erw,
  erh,
  ra,
  color,
  rDash,
  rLineWidth,
  range,
};
