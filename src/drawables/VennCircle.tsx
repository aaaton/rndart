import { coinFlip, color, erh, erw, ra, rDash, rh, rLineWidth } from "../utils";
import { BaseDrawable } from "./drawable";
import React from "react";

class VennCircle extends BaseDrawable {
  description?: string | undefined;

  type = "Venn Circles";
  center = { x: 0, y: 0, r: 0, sa: 0, ea: 0 };
  color = "rgb(0,0,0)";
  count = 1;
  offset = 0;
  startAngle = 0;
  dash = [] as number[];
  lineWidth = 1;
  stroke = false;
  static random() {
    const center = {
      x: erw(),
      y: erh(),
      r: rh(),
      sa: ra(),
      ea: ra(),
    };
    let c = new VennCircle();
    c.color = color();
    c.center = center;
    c.count = Math.floor(Math.random() * 10);
    c.offset = Math.random() * center.r;
    c.startAngle = ra();
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
    for (let i = 0; i < this.count; i++) {
      const angle = this.startAngle + (i * 360) / this.count;

      ctx.beginPath();
      ctx.arc(
        this.center.x * w + this.offset * h * Math.sin((Math.PI * angle) / 180),
        this.center.y * h + this.offset * h * Math.cos((Math.PI * angle) / 180),
        this.center.r * h,
        this.center.sa + angle,
        this.center.ea + angle
      );
      if (this.stroke) {
        ctx.stroke();
      } else {
        ctx.fill();
      }
      ctx.closePath();
    }
  }

  regenerate(): void {
    let random = VennCircle.random() as any;
    Object.keys(this)
      .filter((v) => v != "color" && v !== "description")
      .forEach((k) => {
        (this as any)[k] = random[k];
      });
  }
}

export { VennCircle };
