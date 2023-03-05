import React from "react";
import { BsPalette2 } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import { color } from "../utils";
export interface Drawable {
  color: string;
  type: string;
  description?: string;
  draw(ctx: CanvasRenderingContext2D): void;
  ui(rerender: () => void): JSX.Element;
  regenerate(): void;
}

export abstract class BaseDrawable implements Drawable {
  color = "";
  type = "base drawable";
  description?: string | undefined;
  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
  regenerate(): void {
    console.log("base drawable");
  }
  ui(rerender: () => void): JSX.Element {
    const setColor = () => {
      this.color = color();
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
