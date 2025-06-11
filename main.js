let colorfulRings = []; // all colorfulrings

let canvasSize = 1000; // set canvas size
let canvasScale = 1; // canvas scaling according to the canvas size
let ringNumbers = 100; // max number of randomly generated circles
let minRadius = canvasSize * 0.2; // min radius possible
let maxRadius = canvasSize * 0.8; // max radius possible
let maxAttempts = 100000; // maximum number of attempts to generate circles
let lineWeight = 4; // line weight
let c1, c2; //2 different colors for background gradient

function setup() {
  createCanvas(canvasSize, canvasSize, P2D);
  windowResized();
  generateRandomRings();
  c1 = color(183,96,178); // blue
  c2 = color(37,88,109); // purple
}

function draw() {
  //slowly shifting background gradient over time
  let amt = map(sin(frameCount * 0.01), -1, 1, 0, 1);
  let bg = lerpColor(c1, c2, amt);
  background(bg);
  // Aboriginal dot Painting background
  drawDotBackground();
  showAllRings();
}

// draw multiple dots with random colors behind the rings
function drawDotBackground() {
  let radius = 5;
  let diameter = radius * 2;
  noStroke();
  for (let y = radius; y < height; y += diameter) {
    for (let x = radius; x < width; x += diameter) {
      // radom color of the small dots
      fill(random(255), random(255), random(255), 180);
      circle(x, y, diameter);
    }
  }
}

//resize the canvas as the window changes so that the canvas is always 1:1
function windowResized() {
  let minWinSize = min(windowWidth, windowHeight);
  resizeCanvas(minWinSize, minWinSize);
  canvasScale = minWinSize / canvasSize;
}

function updateCanvasScale() {
  //canvas scaling based on the ratio of the smaller side of the window to the size of the artwork
  let minWinSize = min(windowWidth, windowHeight);
  canvasScale = minWinSize / baseCanvasSize;
}

//randomly generate non-overlapping rings of different positions and sizes
function generateRandomRings() {
  let attempts = 0;
  //when the number of generated rings or the number of attempts reaches the upper limit, it will stop generating
  while (colorfulRings.length < ringNumbers && attempts < maxAttempts) {
    // random radius and position
    let x = random(canvasSize);
    let y = random(canvasSize);
    let size = random(minRadius, maxRadius);

    let overlapping = false;
    // detect overlapping
    for (let other of colorfulRings) {
      let d = dist(x, y, other.xpos, other.ypos);
      if (d < size * 0.25 + other.size * 0.25) {
        overlapping = true;
        break;
      }
    }

    // if it's not overlapping, add it into the array
    if (!overlapping) {
      colorfulRings.push(new ColorfulRing(x, y, size));
    } else {
      attempts++;
    }
  }
}

// show all the rings
function showAllRings() {
  for (let i = 0; i < colorfulRings.length; i++) {
    let ring = colorfulRings[i];
    
    // rotate and scale
    let rot = sin(frameCount * 0.01 + i) * 0.5;
    let scaleFactor = 0.9 + 0.1 * sin(frameCount * 0.02 + i * 2);
    
    ring.show(rot, scaleFactor);
}}
