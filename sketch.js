const ball = {
  x: 50,
  y: 50,
  size: 25,
  xSpeed: 6,
  ySpeed: 6,
  draw: (self) => {
    circle(self.x, self.y, self.size);
  },
  updateLocation: (self) => {
    if (self.x >= width || self.x <= 0) {
      self.xSpeed *= -1;
    }
    if (self.y >= height || self.y <= 0) {
      self.ySpeed *= -1;
    }

    self.x += self.xSpeed;
    self.y += self.ySpeed;
  },
};

const paddle = {
  x: 30,
  y: 20,
  w: 10,
  h: 75,
  draw: (self) => {
    rect(self.x, self.y, self.w, self.h);
  },
  initRight: (self) => {
    self.x = width - paddle.x - paddle.w;
    self.y = 0.5*height - 0.5* paddle.h
  },
};

function setup() {
  createCanvas(1000, 600);
  paddle.initRight(paddle)
  frameRate(60);
}

function draw() {
  background(0);
  fill(243, 135, 153);
  ball.updateLocation(ball);
  ball.draw(ball);
  paddle.draw(paddle);
}
