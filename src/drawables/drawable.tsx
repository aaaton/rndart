import React from "react";
import { BsEyeFill, BsEyeSlashFill, BsPalette2 } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import { color, erh, erw } from "../utils";
export const operationTypes = ["rectangle", "circle", "venn"];

export interface Drawable {
  color: string;
  type: string;
  description?: string;
  visible: boolean;
  draw(ctx: CanvasRenderingContext2D): void;
  ui(rerender: () => void): JSX.Element;
  regenerate(): void;
  center(): { x: number; y: number };
  setCenter(x: number, y: number): void;
  size(): number;
  recolor(): void;
  toggleVisible(): void;
}

export abstract class BaseDrawable implements Drawable {
  color = "";
  type = "base drawable";
  description?: string | undefined;
  visible = true;
  x = 0;
  y = 0;
  constructor() {
    this.color = color();
    this.x = erw();
    this.y = erh();
  }
  size(): number {
    throw new Error("Method not implemented.");
  }
  setCenter(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  regenerate(): void {
    console.log("base drawable");
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
