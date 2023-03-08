import { color, range } from "../utils";
import { Circle } from "./Circle";
import { BaseDrawable, Drawable } from "./drawable";

export class Loop extends BaseDrawable {
  type = "Loop";
  start: Drawable;
  // TODO: Make this travel and scale shift
  //   end: Drawable;
  shift: { x: number; y: number; scale: number };
  step = 1;
  constructor(shape: Drawable) {
    super();
    this.start = shape;
    (this.start as any).stroked = true;
    this.type = `Loop ${shape.type}`;
    this.shift = {
      x: range(-0.5, 0.5),
      y: range(-0.5, 0.5),
      scale: range(-0.5, 2.0),
    };

    this.x = shape.x;
    this.y = shape.y;
    this.color = this.start.color;
    this.step = Math.round(60 * Math.random());
  }
  recolor(): void {
    this.start.recolor();
    this.color = this.start.color;
  }
  random(): Drawable {
    return new Loop(this.start.random());
  }
  regenerate(): void {
    this.start.regenerate();
    super.regenerate();
  }

  setScale(scale: number): void {
    this.scale = scale;
    this.start.setScale(scale);
    // this.end.setScale(scale);
  }
  center(): { x: number; y: number } {
    return this.start.center();
  }
  setCenter(x: number, y: number): void {
    this.start.setCenter(x, y);
  }
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.visible) return;

    let tmp = this.start.random();
    Object.keys(this.start).forEach((k) => {
      (tmp as any)[k] = (this.start as any)[k];
    });
    for (let i = 0; i < this.step; i++) {
      tmp.draw(ctx);
      const part = i / this.step;
      tmp.x = this.start.x + part * this.scale * this.shift.x;
      tmp.y = this.start.y + part * this.scale * this.shift.y;
      tmp.scale =
        this.scale *
        ((1.0 * (this.step - i)) / this.step + part * this.shift.scale);
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
        Math.abs(this.start.x + this.shift.x),
        Math.abs(this.start.y + this.shift.y)
      ) +
      2 * this.start.size()
    );
  }
}
