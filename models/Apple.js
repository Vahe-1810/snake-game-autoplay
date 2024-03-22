import { ctx } from "../canvas.js";
import { CONFIG } from "../constants.js";

class Apple {
  constructor() {
    const { x, y } = this.pickPosition();
    this.x = x;
    this.y = y;
    this.color = this.pickColor();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.fillRect(this.x, this.y, CONFIG.PIXEL, CONFIG.PIXEL);
  }

  pickPosition() {
    return {
      x:
        Math.floor((Math.random() * CONFIG.WIDTH) / CONFIG.PIXEL) *
        CONFIG.PIXEL,
      y:
        Math.floor((Math.random() * CONFIG.HEIGHT) / CONFIG.PIXEL) *
        CONFIG.PIXEL,
    };
  }

  pickColor() {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
  }

  destroy() {
    const { x, y } = this.pickPosition();
    this.x = x;
    this.y = y;
    this.color = this.pickColor();
  }
}

export default Apple;
