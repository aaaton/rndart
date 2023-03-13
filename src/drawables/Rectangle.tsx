import { coinFlip, color, erh, erw, rDash, rh, rLineWidth, rw } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";
import React from "react";

// Center placed rectangle
// TODO: Should we have a random angle?
class Rectangle extends BaseDrawable {
  type = "Rectangle";
  description?: string;
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
  static background() {
    let r = new Rectangle();
    r.y = r.x = 0.5;
    r.w = r.h = 1.0;
    r.stroked = false;
    return r;
  }
  random(): Drawable {
    return new Rectangle();
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible) return;
    const { w, h, l } = this.getSizes(ctx);

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(this.dash.map((v) => Math.max(1, v * l)) || []);
    let x = this.x - (this.w * this.scale) / 2;
    let y = this.y - (this.h * this.scale) / 2;
    ctx.beginPath();
    if (this.stroked) {
      ctx.strokeRect(
        x * w,
        y * h,
        this.w * w * this.scale,
        this.h * h * this.scale
      );
    } else {
      ctx.fillRect(
        x * w,
        y * h,
        this.w * w * this.scale,
        this.h * h * this.scale
      );
    }
    ctx.closePath();
  }

  setCenter(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  size(): number {
    return Math.max(this.w, this.h);
  }

  ui(rerender: () => void): JSX.Element {
    let standard = super.ui(rerender);
    return (
      <div>
        {standard}
        <p>
          <input
            className="percentage-input"
            type="number"
            min="0"
            onInput={(e) => {
              this.w = (e.target as any).value / 100;
              rerender();
            }}
            step="1"
            value={Math.round(this.w * 100)}
          />
          <input
            className="percentage-input"
            type="number"
            min="0"
            onInput={(e) => {
              this.h = (e.target as any).value / 100;
              rerender();
            }}
            step="1"
            value={Math.round(this.h * 100)}
          />
        </p>
      </div>
    );
  }
}
export { Rectangle };
