import { ctx } from "../canvas.js";
import { CONFIG, MOVE_TO, TO_LEFT, TO_RIGHT } from "../constants.js";

class Snake {
  constructor() {
    this.x = 420;
    this.y = 420;
    this.color = "green";
    this.way = MOVE_TO.RIGHT;
    this.to = "RIGHT";
    this.lastWay = null;
    this.speed = 1;
    this.shouldUpdate = true;
    this.isAutoPlay = true;

    this.tail = [
      {
        x: 390,
        y: 420,
      },
    ];

    this.setup();
  }

  setup() {
    this.handleChangeWay();
  }

  handleChangeWay() {
    window.addEventListener("keydown", (event) => {
      const code = event.code.replace("Arrow", "");

      this.switchWay(code);

      this.speed = 4;
    });

    window.addEventListener("keyup", () => (this.speed = 1));
  }

  switchWay(code) {
    switch (code) {
      case "Right": {
        if (this.way[0] === -1) return;
        this.lastWay = this.to === "DOWN" ? "TO_LEFT" : "TO_RIGHT";
        this.way = MOVE_TO.RIGHT;
        this.to = "RIGHT";
        break;
      }
      case "Left": {
        if (this.way[0] === 1) return;
        this.lastWay = this.to === "DOWN" ? "TO_RIGHT" : "TO_LEFT";
        this.way = MOVE_TO.LEFT;
        this.to = "LEFT";
        break;
      }
      case "Up": {
        if (this.way[1] === 1) return;
        this.lastWay = this.to === "RIGHT" ? "TO_LEFT" : "TO_RIGHT";
        this.way = MOVE_TO.UP;
        this.to = "UP";
        break;
      }
      case "Down": {
        if (this.way[1] === -1) return;
        this.lastWay = this.to === "LEFT" ? "TO_LEFT" : "TO_RIGHT";
        this.way = MOVE_TO.DOWN;
        this.to = "DOWN";
        break;
      }
      case "TO_RIGHT": {
        this.way = MOVE_TO[TO_RIGHT[this.to]];
        this.to = TO_RIGHT[this.to];
        break;
      }
      case "TO_LEFT": {
        this.way = MOVE_TO[TO_LEFT[this.to]];
        this.to = TO_RIGHT[this.to];
        break;
      }
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    this.tail.forEach(({ x, y }) => {
      ctx.fillRect(x, y, CONFIG.PIXEL, CONFIG.PIXEL);
    });

    ctx.fillRect(this.x, this.y, CONFIG.PIXEL, CONFIG.PIXEL);

    if (this.collition(this.x, this.y)) this.destroy();
  }

  update() {
    if (!this.shouldUpdate) return;
    this.shouldUpdate = false;

    setTimeout(() => {
      this.tail.forEach((eachTail, i, tail) => {
        if (i === this.tail.length - 1) {
          eachTail.x = this.x;
          eachTail.y = this.y;
        } else {
          eachTail.x = tail[i + 1].x;
          eachTail.y = tail[i + 1].y;
        }
      });
      this.x += this.way[0] * CONFIG.PIXEL;
      this.y += this.way[1] * CONFIG.PIXEL;

      if (this.x === CONFIG.WIDTH) this.x = 0;
      else if (this.y === CONFIG.HEIGHT) this.y = 0;
      else if (this.x === 0 - CONFIG.PIXEL) this.x = CONFIG.WIDTH;
      else if (this.y === 0 - CONFIG.PIXEL) this.y = CONFIG.HEIGHT;
      this.shouldUpdate = true;
    }, 200 / this.speed);
  }

  onEat() {
    const newTailX = this.tail[0].x - this.way[0] * CONFIG.PIXEL;
    const newTailY = this.tail[0].y - this.way[1] * CONFIG.PIXEL;

    this.tail.unshift({
      x: newTailX,
      y: newTailY,
    });
  }

  collition(headX, headY) {
    return this.tail.some(({ x, y }) => {
      if (headX === x && headY === y) return true;
      else return false;
    });
  }

  handleAutoPlay(apple) {
    const xDistance = apple.x - this.x;
    const yDistance = apple.y - this.y;

    if (this.changeWayOnCollition()) return;

    if (yDistance === 0) {
      if (xDistance < 0 && this.checkCanSwitch("LEFT")) {
        this.switchWay("Left");
      } else if (xDistance > 0 && this.checkCanSwitch("RIGHT")) {
        this.switchWay("Right");
      }
      return;
    }

    if (yDistance < 0 && this.checkCanSwitch("UP")) {
      this.switchWay("Up");
      return;
    }
    if (yDistance > 0 && this.checkCanSwitch("DOWN")) {
      this.switchWay("Down");
    }
  }

  changeWayOnCollition() {
    const xPoint = this.way[0] * CONFIG.PIXEL;
    const yPoint = this.way[1] * CONFIG.PIXEL;

    if (this.collition(this.x + xPoint, this.y + yPoint)) {
      if (this.lastWay === "TO_RIGHT") {
        this.switchWay("TO_LEFT");
      } else this.switchWay("TO_RIGHT");
      return true;
    }
    return false;
  }

  checkCanSwitch(way) {
    const xPoint = MOVE_TO[way][0] * CONFIG.PIXEL;
    const yPoint = MOVE_TO[way][1] * CONFIG.PIXEL;

    if (
      this.tail.some(
        ({ x, y }) => this.x + xPoint === x && this.y + yPoint === y
      )
    ) {
      return false;
    }
    return true;
  }

  destroy() {
    console.log("collition");
  }
}

export default Snake;
