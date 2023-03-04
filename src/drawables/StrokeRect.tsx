import { color, erh, erw, rDash, rh, rLineWidth, rw } from "../utils";
import { Drawable } from "./drawable";
import { FillRect } from "./FillRect";
import React from "react";

class StrokeRect extends FillRect {
  type = "Stroked Rectangle";

  dash: number[];
  lineWidth: number;
  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    dash: number[],
    lineWidth: number
  ) {
    super(x, y, w, h, color);
    this.dash = dash;
    this.lineWidth = lineWidth;
  }
  static random() {
    const r = new StrokeRect(
      erw(),
      erh(),
      rw(),
      rh(),
      color(),
      rDash(),
      rLineWidth()
    );

    r.dash = rDash();
    r.lineWidth = rLineWidth();

    return r;
  }
  draw(ctx: CanvasRenderingContext2D) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const l = Math.min(w, h) * 0.25;
    ctx.strokeStyle = this.color;

    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(this.dash.map((v) => Math.max(1, v * l)) || []);
    ctx.strokeRect(this.x * w, this.y * h, this.w * w, this.h * h);
  }
  ui() {
    return <div>Stroooke</div>;
  }
}

export { StrokeRect };
