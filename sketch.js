const score = {
  life: 3,
  x: 30,
  y: 30,
  s: 15,

  draw: (self) => {
    for (let i = 0; i < self.life; i++) {
      square(self.x + i * 25, self.y, self.s);
    }
  },
  reduceLife: (self) => {
    self.life -= 1;
    if (self.life == 0){
      self.life = 3
    }
  },
};

const ball = {
  x: 50,
  y: 50,
  size: 25,
  xSpeed: 7,
  ySpeed: 5,
  draw: (self) => {
    circle(self.x, self.y, self.size);
  },
  resetPosition: (self) => {
    self.x = 50 
    self.y = 50
  },
  updateLocation: (self) => {
    // looking for out of bounds on either side
    if (self.x <= 0) {
      // makes it change direction
      self.xSpeed *= -1;
    }
    // same thing as x but on the y axis
    if (self.y >= height || self.y <= 0) {
      // makes it change direction
      self.ySpeed *= -1;
    }
    // moves the ball
    self.x += self.xSpeed;
    self.y += self.ySpeed;
  },
  wallCollisionDetection: (self) => {
    if (self.x >= width) {
      return true;
    }
  },
  paddleCollisionDetection: (self, paddle) => {
    // checking to see if the ball is moving past the paddle
    if (
      self.x <= paddle.x &&
      self.x + self.xSpeed >= paddle.x - 0.5 * self.size
    ) {
      // see if the ball is on the y axis
      if (self.y >= paddle.y && self.y <= paddle.y + paddle.h) {
        // trying to make it change direction
        self.xSpeed *= -1;
      }
    }
  },
};

const paddle = {
  x: 30,
  y: 20,
  w: 10,
  h: 75,
  s: 23,
  draw: (self) => {
    rect(self.x, self.y, self.w, self.h);
  },
  initRight: (self) => {
    self.x = width - paddle.x - paddle.w;
    self.y = 0.5 * height - 0.5 * paddle.h;
  },
  moveDown: (self) => {
    self.y = min(self.y + self.s, height - self.h);
  },
  moveUp: (self) => {
    self.y = max(self.y - self.s, 0);
  },
};

function setup() {
  createCanvas(1000, 600);
  paddle.initRight(paddle);
  frameRate(60);
}

function draw() {
  background(0);
  fill(243, 135, 153);

  ball.paddleCollisionDetection(ball, paddle);
  ball.updateLocation(ball);
  let collided = ball.wallCollisionDetection(ball);
  if (collided) { 
    score.reduceLife (score)
    ball.resetPosition (ball)
  }
  ball.draw(ball);
  paddle.draw(paddle);
  score.draw(score);
}

window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    paddle.moveUp(paddle);
  }
  if (event.key == "ArrowDown") {
    paddle.moveDown(paddle);
  }
});
