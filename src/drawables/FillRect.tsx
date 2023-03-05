import { color, erh, erw, rh, rw } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { BsPalette2, BsSquareFill } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
// If FillRect is a component, can I just render the components as is?
// Do I not need
class FillRect extends BaseDrawable {
  type = "Filled Rectangle";
  description?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(x: number, y: number, w: number, h: number, color: string) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  static random() {
    return new FillRect(erw(), erh(), rw(), rh(), color());
  }
  draw(ctx: CanvasRenderingContext2D) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * w, this.y * h, this.w * w, this.h * h);
  }
  regenerate(): void {
    let random = FillRect.random() as any;
    Object.keys(this)
      .filter((v) => v != "color" && v !== "description")
      .forEach((k) => {
        (this as any)[k] = random[k];
      });
  }
}
export { FillRect };
