import { coinFlip, color, erh, erw, ra, rDash, rh, rLineWidth } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";
import React from "react";
class LoopCircle extends BaseDrawable {
  description?: string | undefined;
  type = "Loop Circles";
  start = { x: 0, y: 0, r: 0, sa: 0, ea: 0 };
  end = { x: 0, y: 0, r: 0, sa: 0, ea: 0 };
  step = 1;
  dash = [] as number[];
  lineWidth = 1;
  stroke = false;
  static random() {
    const start = {
      x: erw(),
      y: erh(),
      r: rh(),
      sa: ra(),
      ea: ra(),
    };
    const end = {
      x: erw(),
      y: erh(),
      r: rh(),
      sa: ra(),
      ea: ra(),
    };

    const step = Math.round(100 * Math.random());
    const c = new LoopCircle();

    c.start = start;
    c.end = end;
    c.step = step;
    c.color = color();
    c.dash = rDash();
    c.lineWidth = rLineWidth();
    c.stroke = coinFlip();
    return c;
  }
  draw(ctx: CanvasRenderingContext2D) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const l = Math.min(w, h) * 0.25;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(this.dash.map((v) => Math.max(1, v * l)) || []);
    // ctx.filter = "blur(20px)";
    for (let i = 0; i < this.step; i++) {
      ctx.beginPath();
      ctx.arc(
        this.start.x * w + (i * (this.end.x - this.start.x) * w) / this.step,
        this.start.y * h + (i * (this.end.y - this.start.y) * h) / this.step,
        this.start.r * h + (i * (this.end.r - this.start.r) * h) / this.step,
        this.start.sa + (i * (this.end.sa - this.start.sa)) / this.step,
        this.start.ea + (i * (this.end.ea - this.start.ea)) / this.step
      );
      if (this.stroke) {
        ctx.stroke();
      } else {
        ctx.fill();
      }
      ctx.closePath();
    }
    // ctx.filter = "";
  }
  regenerate(): void {
    let random = LoopCircle.random() as any;
    Object.keys(this)
      .filter((v) => v != "color" && v !== "description")
      .forEach((k) => {
        (this as any)[k] = random[k];
      });
  }
}

export { LoopCircle };
