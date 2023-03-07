import React, { useEffect, useRef, useState } from "react";
import { Drawable } from "./drawables/drawable";

type Props = {
  operations: Drawable[];
  mouseDrag: (e: any) => void;
  mouseDown: (e: any) => void;
};
// TODO: have one canvas per operation instead
// If we can re-render the right thing that will make it faster
const Rendering = ({ operations, mouseDrag, mouseDown }: Props) => {
  const canvasRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mouse, setMouse] = useState(false);
  // Redraw seems to lag up a bit too much
  //   useEffect(() => {
  //     function handleResize() {
  //       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  //     }
  //     window.addEventListener("resize", handleResize);
  //   });
  useEffect(() => {
    const canvas = canvasRef.current;
    (canvas as any).width = windowSize.width;
    (canvas as any).height = windowSize.height;
    const ctx = (canvas as any).getContext("2d") as CanvasRenderingContext2D;
    for (let i = 0; i < operations.length; i++) {
      ctx.beginPath();
      const o = operations[i];
      o.draw(ctx);
      ctx.closePath();
    }
  }, [operations, windowSize]);

  return (
    <canvas
      ref={canvasRef}
      id="rendering"
      onMouseDown={(e) => {
        setMouse(true);
        mouseDown(e);
      }}
      onMouseUp={() => setMouse(false)}
      onMouseMove={(e) => mouse && mouseDrag({ x: e.clientX, y: e.clientY })}
    />
  );
};
export default Rendering;
