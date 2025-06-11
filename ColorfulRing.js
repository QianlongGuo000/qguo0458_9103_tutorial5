class ColorfulRing {
  constructor(x, y, size) {
    this.xpos = x; // x position
    this.ypos = y; // y position
    this.size = size; // soze

    // Randomize the order of ring types
    this.typeOrder = shuffle([1, 2, 3]);
    // color palette
    this.colorPatterns = shuffle([
      " #1d1f73",
      " #3e9189",
      " #57b652",
      " #7eafcb",
      " #d7442a",
      " #de76be",
      " #e78e43",
      " #e1c162",
      " #3e0707",
    ]);
  }

  show(rotation = 0, scaleFactor = 1) {
    push();
    translate(this.xpos * canvasScale, this.ypos * canvasScale);
    rotate(rotation);             // rotate
    scale(scaleFactor);          // scale

    for (let i = 0; i < this.typeOrder.length; i++) {
      let scaling = 1 - (i + 1) / this.typeOrder.length;
      let size = this.size * canvasScale * scaling;
      let type = this.typeOrder[i];
      if (type === 1) {
        this.drawType1Circle(size);
      } else if (type === 2) {
        this.drawType2Circle(size);
      } else if (type === 3) {
        this.drawType3Circle(size);
      }
    }
    pop();
  }

  // draw type 1 circle effects (spotted circles)
  drawType1Circle(s) {
    // draw circle background
    stroke(this.colorPatterns[1]);
    strokeWeight(lineWeight);
    fill(this.colorPatterns[0]);
    circle(0, 0, s);

    // Drawing spots from the inside out, circle by circle
    noStroke();
    fill(this.colorPatterns[1]);

    let r = s / 2;
    let sapcing = s * 0.04; // Interval of each circle
    if (sapcing <= 0) return;
    let circleNum = ceil(r / sapcing); // numbers of circles
    let spotNum = s * 0.2; // numbers of spots on each circle
    let spotDt = TWO_PI / spotNum; // angle between spots
    let offset = 0; // offset between spots
    let offsetDt = s * 0.1;

    // calculate the position of spots and draw
    for (let i = 0; i < circleNum - 1; i++) {
      offset += offsetDt;
      for (let j = 0; j < spotNum; j++) {
        let angle = j * spotDt + offset;
        let raduis = i * sapcing;

        let spotX = raduis * cos(angle);
        let spotY = raduis * sin(angle);
        circle(spotX, spotY, s * 0.03);
      }
    }
  }

  // draw type 2 circle effects (line circles)
  drawType2Circle(s) {
    // draw circle background
    stroke(this.colorPatterns[2]);
    strokeWeight(lineWeight);
    fill(this.colorPatterns[1]);
    circle(0, 0, s);

    // lines inside circles
    let lineNum = s * 0.3; // numbers of the lines
    let lineDt = TWO_PI / lineNum; // angle between lines
    let linePath = []; // line path
    let innerRadius = s * 0.25; // radius of the inner circle
    let outterRadius = s * 0.45; // radius of the outter circle

    for (let i = 0; i < lineNum; i++) {
      let angle = i * lineDt;

      let innerx = innerRadius * cos(angle);
      let innery = innerRadius * sin(angle);
      let outterx = outterRadius * cos(angle);
      let outtery = outterRadius * sin(angle);

      linePath.push({ x: innerx, y: innery });
      linePath.push({ x: outterx, y: outtery });
    }

    // draw lines inside circles
    stroke(this.colorPatterns[2]);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let pt of linePath) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
  }

  // draw type 3 circle effects (concentric circles)
  drawType3Circle(s) {
    // draw circle background
    stroke(this.colorPatterns[3]);
    strokeWeight(lineWeight);
    fill(this.colorPatterns[2]);
    circle(0, 0, s);

    // draw concentric circles
    let sapcing = s * 0.1; //  Interval of each circle
    if (sapcing <= 0) return;
    let circleNum = round(s / sapcing); // circles' number

    for (let i = circleNum - 1; i >= 0; i--) {
      let raduis = i * sapcing;
      let c = i % 2 === 0 ? this.colorPatterns[3] : this.colorPatterns[2];
      noStroke();
      fill(c);
      circle(0, 0, raduis);
    }
  }
}