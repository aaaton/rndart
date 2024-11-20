import React, { useEffect, useState } from "react";

import "./App.css";
import { Drawable, operationTypes } from "./drawables/drawable";
import { range } from "./utils";
import Rendering from "./components/Rendering";
import Toolbar from "./components/Toolbar";
import Layers from "./components/Layers";
import canvasToSvg from "canvas-to-svg";

// import { VennCircle } from "./drawables/VennCircle";
import { Venn } from "./drawables/Venn";
import { Circle } from "./drawables/Circle";
import { Rectangle } from "./drawables/Rectangle";
import { Loop } from "./drawables/Loop";
import { Grid } from "./drawables/Grid";

type Position = { x: number; y: number };
function App() {
  const [operations, setOperations] = useState([] as Drawable[]);
  const [selected, setSelected] = useState(-1);
  const [start, setStart] = useState<
    { mouse: Position; op?: Position } | undefined
  >(undefined);
  // TODO: blur effects?
  // TODO: Redraw on window resize

  function rndOperations() {
    const ops = [];

    // Add rnd color background
    const bg = Rectangle.background();
    bg.description = "Background color";
    ops.push(bg);
    // Add random operations
    for (let i = 0; i < 50 * Math.random(); i++) {
      ops.push(rndOperation());
    }

    // Debug VennCircles

    // const c = new Rectangle();
    // c.w = 0.1;
    // c.h = 0.2;
    // let v = new Venn(c);
    // v.x = 0.5;
    // v.y = 0.5;

    // ops.push(v);
    // ops.push(new Circle());
    setOperations(ops);
    setSelected(-1);
  }

  function reset() {
    setOperations([]);
    setSelected(-1);
  }

  function rndOperation(op?: string, operations?: string[]): Drawable {
    const index = Math.floor(range(0, (operations || operationTypes).length));
    switch (op || (operations || operationTypes)[index]) {
      case "rectangle":
        return new Rectangle();
      case "circle":
        return new Circle();
      case "venn":
        return new Venn(
          rndOperation(undefined, ["rectangle", "circle", "venn"]),
        );
      case "loop":
        return new Loop(
          rndOperation(undefined, ["circle", "rectangle", "venn"]),
        );
      case "grid":
        return new Grid(
          rndOperation(undefined, ["circle", "rectangle", "venn", "loop"]),
        );
      default:
        console.log("How did we get here?", index);
        return new Rectangle();
    }
  }
  function recolor() {
    setOperations(
      operations.map((o) => {
        o.recolor();
        return o;
      }),
    );
  }
  function select(index: number) {
    setSelected(index);
    // Show what is selected by hiding everything else for a few seconds
    // if (index >= 0) {
    // const s = operations[index];
    // const backup = [...operations];
    // setOperations([s]);
    // setTimeout(() => {
    //   setOperations(backup);
    // }, 300);
    // }
  }

  function download() {
    // Scale it up and redraw for export
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    const ctx = canvas.getContext("2d") as any;
    const bg = Rectangle.background();
    bg.color = "rgb(255,255,255)";
    bg.draw(ctx);
    for (let i = 0; i < operations.length; i++) {
      operations[i].draw(ctx);
    }
    // TODO: generate the data here as an SVG or high-resolution canvas
    const link = document.createElement("a");
    link.download = "rndart.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  function downloadSvg() {
    const ctx = new canvasToSvg(window.innerWidth, window.innerHeight);
    const bg = Rectangle.background();
    bg.color = "rgb(255,255,255)";
    bg.draw(ctx);
    for (let i = 0; i < operations.length; i++) {
      operations[i].draw(ctx);
    }
    // TODO: generate the data here as an SVG or high-resolution canvas
    const link = document.createElement("a");
    link.download = "rndart.svg";
    const svg = ctx.getSerializedSvg();
    link.href = `data:image/svg;charset=utf-8, ${svg}`;
    link.click();
  }

  function remove(index: number) {
    setOperations([
      ...operations.slice(0, index),
      ...operations.slice(index + 1),
    ]);
    setSelected(-1);
  }
  function move(from: number, to: number) {
    let without = [...operations.slice(0, from), ...operations.slice(from + 1)];
    let to2 = to;
    if (from < to) {
      to2 -= 1;
    }
    setOperations([
      ...without.slice(0, to2),
      operations[from],
      ...without.slice(to2),
    ]);
    setSelected(-1);
  }

  function rerender() {
    setOperations([...operations]);
  }
  function mouseDown(e: any) {
    setStart({
      mouse: {
        x: e.clientX,
        y: e.clientY,
      },
      op: selected >= 0 ? operations[selected].center() : undefined,
    });
  }
  function mouseDrag(e: Position) {
    if (selected >= 0 && start && start.op) {
      operations[selected].setCenter(
        start.op.x + (e.x - start.mouse.x) / window.innerWidth,
        start.op.y + (e.y - start.mouse.y) / window.innerHeight,
      );
      rerender();
    }
    // operations[selected].setCenter()
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("new")) {
      rndOperations();
    }
  }, []);

  // rndOperations();
  return (
    <div className="App">
      <Toolbar
        blank={reset}
        randomize={rndOperations}
        download={download}
        downloadSvg={downloadSvg}
        recolor={recolor}
        addRandom={(op?: string) => {
          let o = rndOperation(op);
          select(operations.length);
          setOperations([...operations, o]);
        }}
        hasOperations={operations.length > 0}
      />
      <Layers
        operations={operations}
        remove={remove}
        move={move}
        rerender={rerender}
        select={select}
        selected={selected}
      />
      <Rendering
        operations={operations}
        mouseDrag={mouseDrag}
        mouseDown={mouseDown}
      />
    </div>
  );
}

export default App;
