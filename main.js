let colorfulRings = []; // all colorfulrings

let backgroundDots = []; // background colorful dots represent aboriginal dot painting

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
  generateBackgroundDots();// generate multiple colorful dots on the background that are translucent and make them scale
}

function draw() {
  background(20);
  drawBackgroundDots(); // draw background function
  showAllRings(); // colorful rings function
}

//resize the canvas as the window changes so that the canvas is always 1:1
function windowResized() {
  let minWinSize = min(windowWidth, windowHeight);
  resizeCanvas(minWinSize, minWinSize);
  canvasScale = minWinSize / canvasSize;
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
    let rot = sin(frameCount * 0.01 + i) * 0.5;
    let scaleFactor = 0.9 + 0.1 * sin(frameCount * 0.02 + i * 2);
    ring.show(rot, scaleFactor);
  }
}

// generate multiple colorful dots on the background that are translucent and make them scale
function generateBackgroundDots() {
  backgroundDots = [];

  let spacing = 20; //the spacing of dots on the background is 20

// double loop, from (10, 10) to (canvassize, canvassize), generate dots based on spacing
  for (let x = 10; x < canvasSize; x += spacing) {
    for (let y = 10; y < canvasSize; y += spacing) {

      let baseRadius = random(10, 25);

      let col = color(random(100, 255), random(100, 255), random(100, 255), 180); //translucent and random colors

      //store attributes of dots
      backgroundDots.push({
        x: x,
        y: y,
        baseRadius: baseRadius,
        r: baseRadius,
        col: col,
        angle: random(0, TWO_PI),    // angle from 0 to 2π so the scaling animations of dots will start at a differnt time
        speed: random(0.01, 0.05) // random speed of the scaling animation
      }
    );
    }
  }
}

// draw the dots on the background
function drawBackgroundDots() {
  noStroke();
  //loop through the backgrounddots array
  for (let dot of backgroundDots) {
    //calculate the animated radius
    //dot.baseRadius: basic size of the dot; 0.5+0.5*sin(): change sin() from [-1,1] to [0,1] so the radius is in [0, baseradius]; 
    //frameCount * dot.speed: controls how fast each dot scales; +dot.angle: control what time will the dots start to scale
    dot.r = dot.baseRadius * (0.5 + 0.5 * sin(frameCount * dot.speed + dot.angle));
    fill(dot.col);
    //draw the dots
    circle(dot.x * canvasScale, dot.y * canvasScale, dot.r * 2 * canvasScale);
  }
}
