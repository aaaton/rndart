import { coinFlip, erh, range, rDash, rLineWidth } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";

// TODO: Should we make part-circles too?
// or is it enough that we have dashed mode?
class Circle extends BaseDrawable {
  type = "Circle";
  r: number;
  dash = [] as number[];
  lineWidth = 1;
  stroked = false;
  constructor() {
    super();
    this.r = range(0.01, 1.0);
    this.x = erh();
    this.y = erh();
    this.dash = rDash();
    this.lineWidth = rLineWidth();
    this.stroked = coinFlip();
  }
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;
    const { w, h, l } = this.getSizes(ctx);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(this.dash.map((v) => Math.max(1, v * l)) || []);
    ctx.beginPath();
    ctx.arc(this.x * w, this.y * h, this.r * h * this.scale, 0, Math.PI * 2);
    if (this.stroked) {
      ctx.stroke();
    } else {
      ctx.fill();
    }

    ctx.closePath();
  }
  size(): number {
    return this.r;
  }
  random(): Drawable {
    return new Circle();
  }
}

export { Circle };
