import { color, ra, range, rh, rw } from "../utils";
import { BaseDrawable, Drawable } from "./drawable";

// Will make a Venn-diagram out of any drawable
class Venn extends BaseDrawable {
  type: string;
  shape: Drawable;
  count = 1;
  offset = 0;
  startAngle = 0;
  constructor(shape: Drawable) {
    super();
    this.type = `Venn ${shape.type}`;
    this.shape = shape;
    this.shape.setCenter(0, 0);
    this.count = Math.floor(range(2, 10));
    this.offset = range(0.1, 1.5) * shape.size();
    this.startAngle = ra();
    this.color = shape.color;
    this.x = rw();
    this.y = rh();
  }
  setScale(scale: number) {
    this.scale = scale;
    this.shape.setScale(scale);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.visible) return;
    const { w, h } = this.getSizes(ctx);
    for (let i = 0; i < this.count; i++) {
      const angle = this.startAngle + (i * 360) / this.count;
      const x =
        this.x * w +
        this.offset * h * this.scale * Math.sin((Math.PI * angle) / 180);
      const y =
        this.y * h +
        this.offset * h * this.scale * Math.cos((Math.PI * angle) / 180);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      // TODO: rotate the pieces as well
      // Do we need to address the position of this.shape?
      this.shape.draw(ctx);
      ctx.restore();
    }
  }
  regenerate(): void {
    this.shape.regenerate();
    super.regenerate();
  }
  setCenter(x: number, y: number): void {
    this.x = x;
    this.y = y;
    // this.shape.setCenter(x, y);
  }
  random(): Drawable {
    return new Venn(this.shape.random());
  }
  recolor() {
    this.shape.recolor();
    this.color = this.shape.color;
  }
  size() {
    return this.shape.size() + this.offset;
  }
}
export { Venn };
