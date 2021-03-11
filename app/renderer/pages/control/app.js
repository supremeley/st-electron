const peer = require('./peer-control');

peer.on('add-stream', (stream) => {
  play(stream);
});

const video = document.getElementById('screen-video');

function play(stream) {

  video.srcObject = stream;

  video.onloadedmetadata = function () {
    video.play();
  };
}

window.onkeydown = function (e) {
  // console.log(e);
  let data = {};

  data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    control: e.ctrlKey,
    alt: e.altKey,
  };

  // peer.emit('robot', 'key', data);

  handleKey(data)
};

window.onmouseup = function (e) {
  // console.log(e);
  let data = {};

  data.clientX = e.clientX;
  data.clientY = e.clientY;
  data.video = {
    width: video.getBoundingClientRect().width,
    height: video.getBoundingClientRect().height,
  };

  handleMouse(data)

  // peer.emit('robot', 'mouse', data);
};


const robot = require('robotjs');
const vkey = require('vkey');

function handleMouse(data) {
  let { clientX, clientY, screen, video } = data;
  // data {clientX, clientY, screen: {width, height}, video: {width, height}}
  let x = (clientX * screen.width) / video.width;
  let y = (clientY * screen.height) / video.height;
  console.log(x, y);
  robot.moveMouse(x, y);
  robot.mouseClick();
}

function handleKey(data) {
  const modifiers = [];
  if (data.meta) modifiers.push('meta');
  if (data.shift) modifiers.push('shift');
  if (data.alt) modifiers.push('alt');
  if (data.ctrl) modifiers.push('ctrl');
  console.log(data)
  let key = vkey[data.keyCode].toLowerCase();
  console.log(key)

  if (key[0] !== '<') {
    //<shift>
    robot.keyTap(key, modifiers);
  }
}