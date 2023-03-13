import { coinFlip, erh, range, rDash, rLineWidth } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";
import React from "react";
import PercentageRange from "../components/inputs/PercentageRange";
import ToggleSwitch from "../components/inputs/ToggleSwitch";

// TODO: Should we make part-circles too?
// or is it enough that we have dashed mode?
class Circle extends BaseDrawable {
  type = "Circle";
  r: number;
  isDashed = false;
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
    this.isDashed = coinFlip();
  }
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;
    const { w, h, l } = this.getSizes(ctx);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.max(1, this.lineWidth * l) || 1;
    ctx.setLineDash(
      this.isDashed ? this.dash.map((v) => Math.max(1, v * l)) : []
    );
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
  specifics(rerender: () => void): JSX.Element {
    return (
      <div>
        <h3>Circle</h3>
        <PercentageRange
          label="Radius"
          value={this.r}
          onInput={(v) => {
            this.r = v;
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
          disabled={!this.stroked || !this.isDashed}
        />
        <PercentageRange
          label="Hole"
          value={this.dash[1]}
          onInput={(v) => {
            this.dash[1] = v;
            rerender();
          }}
          disabled={!this.stroked || !this.isDashed}
        />
      </div>
    );
  }
}

export { Circle };
