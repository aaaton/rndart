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
  // Setting redraw on a timer to not get too aggressive with the window changed events
  useEffect(() => {
    let windowResizeTimer: any = undefined;
    function handleResize() {
      clearTimeout(windowResizeTimer);
      windowResizeTimer = setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }, 100);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    (canvas as any).width = windowSize.width;
    (canvas as any).height = windowSize.height;
    const cloned = [...operations];
    const ctx = (canvas as any).getContext("2d") as CanvasRenderingContext2D;
    for (let i = 0; i < cloned.length; i++) {
      ctx.beginPath();
      cloned[i].draw(ctx);
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
