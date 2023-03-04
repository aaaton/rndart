import React from "react";
export interface Drawable {
  color: string;
  type: string;
  description?: string;
  draw(ctx: CanvasRenderingContext2D): void;
  ui(): JSX.Element;
}
// TODO: Rotated patterns/ Squares?
// TODO: squiggly lines?
// TODO: Organic Blobs
