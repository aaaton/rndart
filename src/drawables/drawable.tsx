import React from "react";
import { BsPalette2 } from "react-icons/bs";
import { BiHorizontalCenter } from "react-icons/bi";
import { RxReload } from "react-icons/rx";
import PercentageRange from "../components/inputs/PercentageRange";
import { color, erh, erw } from "../utils";
import ToolButton from "../components/ToolButton";
import { Loop } from "./Loop";
import { Rectangle } from "./Rectangle";
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
  specifics(rerender: () => void): JSX.Element;
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
  specifics(rerender: () => void): JSX.Element {
    return <span></span>;
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
    let specifics = this.specifics(rerender);
    return (
      <div className="ui">
        <span
          className="button centered"
          onClick={() => {
            this.setCenter(0.5, 0.5);

            rerender();
          }}
        >
          <BiHorizontalCenter />
          Center
        </span>
        <span className="button centered" onClick={setColor}>
          <BsPalette2 />
          Recolor
        </span>
        <span className="button centered" onClick={regen}>
          <RxReload />
          Regenerate
        </span>
        {/* <ToolButton
            className="centered"
            onclick={() => {}}
            onHover={
              <div className="dropdown" style={{ position: "absolute" }}>
                <ToolButton
                  onclick={() => {
                    // let loop = new Loop(new Rectangle());
                    // rerender();
                  }}
                >
                  Loop
                </ToolButton>
                <ToolButton onclick={() => "venn"}>Venn</ToolButton>
              </div>
            }
          >
            Wrap...
          </ToolButton> */}
        <PercentageRange
          label="Scale"
          value={this.scale}
          onInput={(v) => {
            this.setScale(v);
            rerender();
          }}
          max="300"
        />
        {specifics}
      </div>
    );
  }
}
// TODO: Rotated patterns/ Squares?
// TODO: squiggly lines?
// TODO: Organic Blobs
