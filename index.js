import { ctx } from "./canvas.js";
import { CONFIG } from "./constants.js";
import Apple from "./models/Apple.js";
import Snake from "./models/Snake.js";

//====================

class Main {
  constructor() {
    this.snake = new Snake();
    this.apple = new Apple();
    this.autoPlayBtn = document.getElementById("autoplay");
    this.isAutoPlay = false;
  }

  start() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();

    this.autoPlayBtn.addEventListener("click", () => (this.isAutoPlay = true));
  }

  draw() {
    ctx.clearRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);
    this.apple.draw();
    this.snake.draw();
  }

  update() {
    this.isAutoPlay && this.snake.handleAutoPlay(this.apple);
    this.snake.update();
    this.onCollition();
  }

  onCollition() {
    if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
      this.snake.onEat();
      this.apple.destroy();
    }
  }
}

const game = new Main();

game.start();
