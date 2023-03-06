import { coinFlip, erh, range, rDash, rLineWidth } from "../utils";
import { BaseDrawable } from "./drawable";

// TODO: Should we make part-circles too?
// or is it enough that we have dashed mode?
class Circle extends BaseDrawable {
  type = "Circle";
  r: number;
  x: number;
  y: number;
  dash = [] as number[];
  lineWidth = 1;
  stroke = false;
  constructor() {
    super();
    this.r = range(0.01, 1.0);
    this.x = erh();
    this.y = erh();
    this.dash = rDash();
    this.lineWidth = rLineWidth();
    this.stroke = coinFlip();
  }
  draw(ctx: CanvasRenderingContext2D): void {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const l = Math.min(w, h) * 0.25;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(this.dash.map((v) => Math.max(1, v * l)) || []);
    ctx.beginPath();
    ctx.arc(this.x * w, this.y * h, this.r * h, 0, Math.PI * 2);
    if (this.stroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }

    ctx.closePath();
  }
  size(): number {
    return this.r;
  }
}

export { Circle };
