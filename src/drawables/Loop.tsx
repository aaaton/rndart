import { range } from "../utils";

import { BaseDrawable, Drawable } from "./drawable";
import React from "react";
import PercentageRange from "../components/inputs/PercentageRange";

export class Loop extends BaseDrawable {
  type = "Loop";
  shape: Drawable;
  // TODO: Make this travel and scale shift
  //   end: Drawable;
  shift: { x: number; y: number; scale: number };
  stops = 1;
  constructor(shape: Drawable) {
    super();
    this.shape = shape;
    (this.shape as any).stroked = true;
    this.type = `Loop ${shape.type}`;
    this.shift = {
      x: range(-0.5, 0.5),
      y: range(-0.5, 0.5),
      scale: range(0.1, 2.0),
    };

    this.x = shape.x;
    this.y = shape.y;
    this.color = this.shape.color;
    this.stops = Math.round(60 * Math.random());
  }
  recolor(): void {
    this.shape.recolor();
    this.color = this.shape.color;
  }
  random(): Drawable {
    return new Loop(this.shape.random());
  }
  regenerate(): void {
    this.shape.regenerate();
    super.regenerate();
  }

  setScale(scale: number): void {
    this.scale = scale;
    this.shape.setScale(scale);
    // this.end.setScale(scale);
  }
  center(): { x: number; y: number } {
    return this.shape.center();
  }
  setCenter(x: number, y: number): void {
    this.shape.setCenter(x, y);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;

    let tmp = this.shape.random();
    Object.keys(this.shape).forEach((k) => {
      (tmp as any)[k] = (this.shape as any)[k];
    });
    for (let i = 0; i < this.stops; i++) {
      tmp.draw(ctx);
      const part = i / this.stops;
      tmp.x = this.shape.x + part * this.scale * this.shift.x;
      tmp.y = this.shape.y + part * this.scale * this.shift.y;
      tmp.scale =
        this.scale *
        ((1.0 * (this.stops - i)) / this.stops + part * this.shift.scale);
      //   tmp.x =
      //     this.start.x +
      //     (i / this.step) * this.scale * (this.end.x - this.start.x);
      //   tmp.y =
      //     this.start.y +
      //     (i / this.step) * this.scale * (this.end.y - this.start.y);
      //   //   (tmp as Circle).r =
      //   //     (this.start as Circle).r +
      //   //     (i / this.step) * ((this.end as Circle).r - (this.start as Circle).r);
      //   tmp.scale =
      //     this.scale *
      //     ((1.0 * (this.step - i)) / this.step +
      //       ((this.end.size() / this.start.size()) * i) / this.step);
    }
  }
  size(): number {
    return (
      Math.max(
        Math.abs(this.shape.x + this.shift.x),
        Math.abs(this.shape.y + this.shift.y)
      ) +
      2 * this.shape.size()
    );
  }
  specifics(rerender: () => void): JSX.Element {
    const child = this.shape.specifics(rerender);
    return (
      <div>
        <h3>Travel</h3>
        <PercentageRange
          label="X"
          value={this.shift.x}
          min="-100"
          onInput={(v) => {
            this.shift.x = v;
            rerender();
          }}
        />
        <PercentageRange
          label="Y"
          value={this.shift.y}
          min="-100"
          onInput={(v) => {
            this.shift.y = v;
            rerender();
          }}
        />
        <PercentageRange
          label="Scale"
          value={this.shift.scale}
          min="1"
          max="400"
          onInput={(v) => {
            this.shift.scale = v;
            rerender();
          }}
        />
        <PercentageRange
          label="Stops"
          value={this.stops}
          min="3"
          max="100"
          noPercentage={true}
          onInput={(v) => {
            this.stops = v;
            rerender();
          }}
        />
        {child}
      </div>
    );
  }
}
