import React from "react";
import { BsPalette2 } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import { color, erh, erw } from "../utils";
export interface Drawable {
  color: string;
  type: string;
  description?: string;
  draw(ctx: CanvasRenderingContext2D): void;
  ui(rerender: () => void): JSX.Element;
  regenerate(): void;
  setCenter(x: number, y: number): void;
  size(): number;
  recolor(): void;
}

export abstract class BaseDrawable implements Drawable {
  color = "";
  type = "base drawable";
  description?: string | undefined;
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
        </p>
        <p>
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
