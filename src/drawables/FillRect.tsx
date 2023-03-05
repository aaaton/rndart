import { color, erh, erw, rh, rw } from "../utils";
import { Drawable } from "./drawable";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { BsSquareFill } from "react-icons/bs";
// If FillRect is a component, can I just render the components as is?
// Do I not need
class FillRect implements Drawable {
  type = "Filled Rectangle";
  description?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  constructor(x: number, y: number, w: number, h: number, color: string) {
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
  ui() {
    return (
      <div>
        Color: <BsSquareFill color={this.color} />{" "}
        <SketchPicker onChangeComplete={(e) => console.log(e)} />
      </div>
    );
  }
}
export { FillRect };
