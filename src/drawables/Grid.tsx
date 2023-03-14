import { coinFlip, range } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";
import React from "react";
import PercentageRange from "../components/inputs/PercentageRange";
import ToggleSwitch from "../components/inputs/ToggleSwitch";

export class Grid extends BaseDrawable {
  shape: Drawable;
  w: number;
  h: number;
  square: number;
  margin: number;
  alternateFlip: boolean;
  alternateOffset: boolean;
  tilted: boolean;
  angle: number;

  constructor(shape: Drawable) {
    super();
    this.shape = shape;
    this.type = "Grid " + shape.type;
    this.w = 1.0;
    this.h = 1.0;
    this.x = 0.5;
    this.y = 0.5;
    this.color = this.shape.color;
    this.shape.setCenter(0, 0);
    this.margin = range(-0.2, 0.2);
    this.square = range(0.05, 0.7);
    this.alternateFlip = coinFlip();
    this.alternateOffset = coinFlip();
    this.angle = range(-80, 0);
    this.tilted = coinFlip();
  }
  regenerate(): void {
    this.shape.regenerate();
    super.regenerate();
  }
  recolor(): void {
    this.shape.recolor();
    this.color = this.shape.color;
  }
  size(): number {
    return this.shape.size();
  }
  random(): Drawable {
    return new Grid(this.shape.random());
  }
  draw(ctx: CanvasRenderingContext2D): void {
    // TODO: Scale?
    if (!this.visible) return;
    this.shape.setScale(this.square / this.shape.size());
    const { w, h } = this.getSizes(ctx);
    ctx.restore();
    let count = 0;
    let height = this.w;
    let width = this.w;
    if (this.tilted) {
      let r = (parseFloat(String(this.angle)) * Math.PI) / 180;
      ctx.save();
      ctx.rotate(r);
      width = width / Math.cos(r);
      height = height / Math.cos(r);
      //   height = Math.abs(height / Math.cos(Math.PI / 2 - r));
      console.log(height);
    }
    let dx = this.x - 0.5 * width;
    while (dx < this.x + 0.5 * width) {
      let dy =
        this.y -
        0.5 * height -
        (this.alternateOffset && count % 2 === 0
          ? (this.square + this.margin) / 2
          : 0);
      while (dy < this.y + 0.5 * height) {
        ctx.save();
        ctx.translate(dx * w, dy * w);
        if (this.alternateFlip && count % 2 == 1) {
          ctx.rotate(Math.PI);
        }

        this.shape.draw(ctx);
        ctx.restore();
        dy += this.square + this.margin;
      }
      dx += this.square + this.margin;

      count++;
    }
    if (this.tilted) {
      ctx.restore();
    }
  }
  specifics(rerender: () => void): JSX.Element {
    let child = this.shape.specifics(rerender);
    return (
      <div>
        <PercentageRange
          label="Square Size"
          value={this.square}
          onInput={(v) => {
            this.square = v;
            rerender();
          }}
        />
        <PercentageRange
          label="Margin"
          value={this.margin}
          min="-50"
          max="100"
          onInput={(v) => {
            this.margin = v;
            rerender();
          }}
        />

        <ToggleSwitch
          label="Alternate Flip"
          value={this.alternateFlip}
          onInput={(v: boolean) => {
            this.alternateFlip = v;
            rerender();
          }}
        />
        <ToggleSwitch
          label="Alternate Offset"
          value={this.alternateOffset}
          onInput={(v: boolean) => {
            this.alternateOffset = v;
            rerender();
          }}
        />
        <ToggleSwitch
          label="Tilted"
          value={this.tilted}
          onInput={(v: boolean) => {
            this.tilted = v;
            rerender();
          }}
        />
        {this.angle}
        <PercentageRange
          label="Angle"
          noPercentage
          value={this.angle}
          disabled={!this.tilted}
          min="-80"
          max="0"
          onInput={(v) => {
            this.angle = v;
            rerender();
          }}
        />
        {child}
      </div>
    );
  }
}
