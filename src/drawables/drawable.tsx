import React from "react";
import { BsEyeFill, BsEyeSlashFill, BsPalette2 } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import { color, erh, erw } from "../utils";
export const operationTypes = ["rectangle", "circle", "venn", "loop"];

export interface Drawable {
  color: string;
  type: string;
  description?: string;
  visible: boolean;
  x: number;
  y: number;
  scale: number;
  draw(ctx: CanvasRenderingContext2D): void;
  ui(rerender: () => void): JSX.Element;
  regenerate(): void;
  center(): { x: number; y: number };
  setCenter(x: number, y: number): void;
  setScale(scale: number): void;
  size(): number;
  recolor(): void;
  toggleVisible(): void;
  random(): Drawable;
}

export abstract class BaseDrawable implements Drawable {
  color = "";
  type = "base drawable";
  description?: string | undefined;
  visible = true;
  x = 0;
  y = 0;
  scale = 1.0;
  constructor() {
    this.color = color();
    this.x = erw();
    this.y = erh();
  }
  size(): number {
    throw new Error("Method not implemented.");
  }
  random(): Drawable {
    throw new Error("Not implemented on base");
  }
  setCenter(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  regenerate(): void {
    let random = this.random() as any;
    Object.keys(this)
      .filter(
        (v) =>
          v != "color" && v !== "description" && v !== "shape" && v !== "scale"
      )
      .forEach((k) => {
        (this as any)[k] = random[k];
      });
  }
  recolor() {
    this.color = color();
  }
  toggleVisible() {
    this.visible = !this.visible;
  }
  center() {
    return { x: this.x, y: this.y };
  }
  getSizes(ctx: CanvasRenderingContext2D) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const l = Math.min(w, h) * 0.25 * this.scale;
    return { w, h, l };
  }
  setScale(scale: number): void {
    this.scale = scale;
  }
  ui(rerender: () => void): JSX.Element {
    const setColor = () => {
      this.recolor();
      rerender();
    };
    const regen = () => {
      this.regenerate();
      rerender();
    };
    return (
      <div className="ui">
        <p>
          <input
            className="number-input"
            type="number"
            min="0"
            onInput={(e) => {
              this.setScale((e.target as any).value / 100);
              rerender();
            }}
            step="1"
            value={Math.round(this.scale * 100)}
          ></input>
          <span className="button" onClick={setColor}>
            Recolor
            <BsPalette2 color={this.color} />
          </span>
          <span className="button" onClick={regen}>
            Regenerate <RxReload />
          </span>
        </p>
      </div>
    );
  }
}
// TODO: Rotated patterns/ Squares?
// TODO: squiggly lines?
// TODO: Organic Blobs
