import { coinFlip, color, erh, erw, rDash, rh, rLineWidth, rw } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";

// Center placed rectangle
class Rectangle extends BaseDrawable {
  type = "Rectangle";
  description?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dash: number[];
  lineWidth: number;
  stroked: boolean;
  constructor() {
    super();
    this.x = rw();
    this.y = rh();
    this.w = rw();
    this.h = rh();
    this.color = color();
    this.dash = rDash();
    this.lineWidth = rLineWidth();
    this.stroked = coinFlip();
  }
  draw(ctx: CanvasRenderingContext2D) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const l = Math.min(w, h) * 0.25;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(this.dash.map((v) => Math.max(1, v * l)) || []);
    let x = this.x - this.w / 2;
    let y = this.y - this.h / 2;
    ctx.beginPath();
    if (this.stroked) {
      ctx.strokeRect(x * w, y * h, this.w * w, this.h * h);
    } else {
      ctx.fillRect(x * w, y * h, this.w * w, this.h * h);
    }
    ctx.closePath();
  }
  regenerate(): void {
    let random = new Rectangle() as any;
    Object.keys(this)
      .filter((v) => v != "color" && v !== "description")
      .forEach((k) => {
        (this as any)[k] = random[k];
      });
  }
  setCenter(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  size(): number {
    return Math.max(this.w, this.h);
  }
}
export { Rectangle };
