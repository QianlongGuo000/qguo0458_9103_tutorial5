let colorfulRings = []; // all colorfulrings

let backgroundDots = []; // background colorful dots represent aboriginal dot painting

let rotatingDots = []; // rotating dots in the front

let canvasSize = 1000; // set canvas size
let canvasScale = 1; // canvas scaling according to the canvas size
let ringNumbers = 100; // max number of randomly generated circles
let minRadius = canvasSize * 0.2; // min radius possible
let maxRadius = canvasSize * 0.8; // max radius possible
let maxAttempts = 100000; // maximum number of attempts to generate circles
let lineWeight = 4; // line weight
let numRotatingDots = 150; // numbers of rotating dots
let meteorX = [];
let meteorY = [];
let meteorSpeed = [];


function setup() {
  createCanvas(canvasSize, canvasSize, P2D);
  windowResized();
  generateRandomRings();
  generateBackgroundDots();// generate multiple colorful dots on the background that are translucent and make them scale
  generateRotatingDots();
  meteor();
}

function draw() {
  background(255);
  drawBackgroundDots(); // draw background function
  showAllRings(); // colorful rings function
  drawRotatingDots();
  drawMeteor();//draw meteors effect
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

// function generateRotatingDots() and function drawRotatingDots() are inspired by online example https://openprocessing.org/sketch/742312. 
// What this reference code shows is very similar to the effect I want which is generating dots around the center of the circle.
// It uses this.angle += this.speed; to make the dots rotate.


//generate colorful dots that rotate around the center
function generateRotatingDots() {
  //use for loop to generate multiple dots. numbers based on numRotatingDots
  for (let i = 0; i < numRotatingDots; i++) {
    //radius is the distance of dots from the center. generate random distance
    let radius = random(canvasSize * 0.1, canvasSize * 0.6);
    //generate an angle from 0 to 2π so dots will be on different positions
    let angle = random(TWO_PI);
    //set the speed of rotation
    let speed = 0.01;
    let col = color(random(100, 255), random(100, 255), random(100, 255), 255);
    rotatingDots.push({ radius, angle, speed, col });
  }
}

function drawRotatingDots() {
  push();
  translate(width / 2, height / 2);  //set the center of the rotating dots
  noStroke();
  for (let dot of rotatingDots) {
    dot.angle += dot.speed; //every frame the angle increases some degrees so the dots will rotate
    let x = dot.radius * cos(dot.angle);
    let y = dot.radius * sin(dot.angle);
    fill(dot.col);
    circle(x * canvasScale, y * canvasScale, 10 * canvasScale);
  }
  pop();
}

// function meteor() and function drawMeteor() are inspired by online example https://openprocessing.org/sketch/2479925.
// What this reference code shows is a diagonal meteor animation which is a good effect to make the project more vivid.
// It uses arrays to define the position and speed of meteors, and make them move diagonally from the top-right. When a meteor moves outof the screen, it resets to a new starting point.

//initialize position and speed of the meteor
function meteor(){
  for (let i = 0; i < 10; i++) {
  meteorX[i] = random(0, canvasSize);
  meteorY[i] = random(-100,0);
  meteorSpeed[i] = random(1,8); //a random falling speed of the meteor
}
}

//draw the meteors
function drawMeteor(){
  stroke(255,255,255,150);
  //three lines that make up the meteor
for (let i = 0; i < 10; i++) {
  strokeWeight(10);
  line(meteorX[i], meteorY[i], meteorX[i] + 5, meteorY[i] - 5);
  strokeWeight(5);
  line(meteorX[i] + 15, meteorY[i] - 15, meteorX[i] + 25, meteorY[i] - 25);
  strokeWeight(2);
  line(meteorX[i] + 35, meteorY[i] - 35, meteorX[i] + 85, meteorY[i] - 85);

  //move the meteors diagonally to the left(x pos) and downward(y pos)
  meteorX[i] -= 4;
  meteorY[i] += meteorSpeed[i];

  //if a meteor move off screen(either on the left or the bottom), reset the position and restart the movement
  if (meteorX[i] < 50 || meteorY[i] > canvasSize+50) {
    meteorX[i] = random(0, canvasSize);
    meteorY[i] = random(-100, 0);
  }
}
}