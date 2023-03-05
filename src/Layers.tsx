import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { Drawable } from "./drawables/drawable";
type Props = {
  operations: Drawable[];
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
};
const Layers = ({ operations, remove, move }: Props) => {
  const [visible, setVisible] = useState(false);
  const [toggled, setToggled] = useState(-1);

  return (
    <div className={`layers ${visible ? "open" : ""}`}>
      <div className="button" onClick={() => setVisible(!visible)}>
        Layers
      </div>
      {visible && (
        <div className="layers-list">
          {operations.map((o, key) => {
            const open = toggled === key;
            return (
              <div
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("Text", JSON.stringify(key));
                }}
                onDragLeave={(e) => {
                  (e.target as any).style.paddingTop = "";
                }}
                onDrop={(e) => {
                  console.log("Dropping");
                  const from = JSON.parse(e.dataTransfer.getData("Text"));
                  (e.target as any).style.paddingTop = "";
                  move(from, key);
                }}
                onDragOver={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if ((e.target as any).className == "dragContainer") {
                    (e.target as any).style.paddingTop = "40px";
                  }
                }}
                className="dragContainer"
                style={{ padding: "4px 0" }}
                key={key}
              >
                <div
                  className={`layer ${open ? "open" : ""}`}
                  style={{ backgroundColor: o.color }}
                >
                  <div>
                    <span
                      className="layer-title"
                      onClick={() => (open ? setToggled(-1) : setToggled(key))}
                    >
                      {o.type}
                    </span>
                    <div
                      className="icon-button"
                      style={{ float: "right" }}
                      onClick={() => remove(key)}
                    >
                      <RxCrossCircled />
                    </div>
                  </div>
                  {open && (
                    <div className="layer-body">
                      {o.description} {o.ui()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Layers;
