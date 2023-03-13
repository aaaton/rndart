import { coinFlip, color, erh, erw, rDash, rh, rLineWidth, rw } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";
import React from "react";
import PercentageRange from "../components/inputs/PercentageRange";
import ToggleSwitch from "../components/inputs/ToggleSwitch";

// Center placed rectangle
// TODO: Should we have a random angle?
class Rectangle extends BaseDrawable {
  type = "Rectangle";
  description?: string;
  w: number;
  h: number;
  isDashed: boolean;
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
    this.dash = [Math.random(), Math.random()];
    this.lineWidth = rLineWidth();
    this.stroked = coinFlip();
    this.isDashed = coinFlip();
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
    ctx.setLineDash(
      this.isDashed ? this.dash.map((v) => Math.max(1, v * l)) : []
    );
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
          <PercentageRange
            label="Width"
            value={this.w}
            onInput={(v) => {
              this.w = v;
              rerender();
            }}
            max="120"
          />
          <PercentageRange
            label="Height"
            value={this.h}
            onInput={(v) => {
              this.h = v;
              rerender();
            }}
            max="120"
          />
          <ToggleSwitch
            label="Stroked"
            value={this.stroked}
            onInput={(v) => {
              this.stroked = v;
              rerender();
            }}
          />
          <PercentageRange
            label="Line Width"
            value={this.lineWidth}
            max="200"
            onInput={(v) => {
              this.lineWidth = v;
              rerender();
            }}
            disabled={!this.stroked}
          />
          <ToggleSwitch
            label="Dashed"
            value={this.isDashed}
            onInput={(v) => {
              this.isDashed = v;
              rerender();
            }}
            disabled={!this.stroked}
          />
          <PercentageRange
            label="Fill"
            value={this.dash[0]}
            onInput={(v) => {
              this.dash[0] = v;
              rerender();
            }}
            disabled={!this.stroked}
          />
          <PercentageRange
            label="Hole"
            value={this.dash[1]}
            onInput={(v) => {
              this.dash[1] = v;
              rerender();
            }}
            disabled={!this.stroked}
          />
        </p>
      </div>
    );
  }
}
export { Rectangle };
