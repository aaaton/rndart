import React, { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import { Drawable } from "./drawables/drawable";
import { color, height, range, width } from "./utils";
import Rendering from "./Rendering";
import Toolbar from "./Toolbar";
import Layers from "./Layers";
import { FillRect } from "./drawables/FillRect";
import { StrokeRect } from "./drawables/StrokeRect";
import { LoopCircle } from "./drawables/LoopCircle";
import { VennCircle } from "./drawables/VennCircle";

function App() {
  const [operations, setOperations] = useState([] as Drawable[]);
  // TODO: blur effects?
  // TODO: Redraw on window resize

  function rndOperations() {
    const ops = [];

    // Add rnd color background
    const bg = new FillRect(0, 0, 1, 1, color());
    bg.description = "Background color";
    ops.push(bg);
    // // Add random operations
    for (let i = 0; i < 50 * Math.random(); i++) {
      ops.push(rndOperation());
    }

    // Debug VennCircles
    // let v = VennCircle.random();
    // v.center.x = 0.5;
    // v.center.y = 0.5;
    // v.center.r = 0.1;

    // ops.push(v);

    setOperations(ops);
  }

  function rndOperation() {
    const selector = Math.random();
    if (selector < 0.25) {
      return FillRect.random();
    } else if (selector < 0.5) {
      return StrokeRect.random();
    } else if (selector < 0.75) {
      return LoopCircle.random();
    } else {
      return VennCircle.random();
    }
  }
  function recolor() {
    setOperations(
      operations.map((o) => {
        o.color = color();
        return o;
      })
    );
  }

  function download() {
    // Scale it up and redraw for export
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    const ctx = canvas.getContext("2d") as any;
    const bg = new FillRect(0, 0, 1, 1, "rgb(255,255,255)");
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

  function remove(index: number) {
    setOperations([
      ...operations.slice(0, index),
      ...operations.slice(index + 1),
    ]);
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
  }

  function rerender() {
    setOperations([...operations]);
  }

  // rndOperations();
  return (
    <div className="App">
      <Toolbar
        randomize={rndOperations}
        download={download}
        recolor={recolor}
        addRandom={() => {
          let o = rndOperation();
          setOperations([...operations, o]);
        }}
        hasOperations={operations.length > 0}
      />
      <Layers
        operations={operations}
        remove={remove}
        move={move}
        rerender={rerender}
      />
      <Rendering operations={operations} />
    </div>
  );
}

export default App;
