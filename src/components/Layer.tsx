import React from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { Drawable } from "../drawables/drawable";
type Props = {
  index: number;
  op: Drawable;
  open: boolean;
  rerender: () => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  select: (key: number) => void;
};
const Layer = ({ index, op, rerender, remove, move, open, select }: Props) => {
  return (
    <div
      draggable={!open}
      onDragStart={(e) => {
        e.dataTransfer.setData("Text", JSON.stringify(index));
      }}
      onDragLeave={(e) => {
        (e.target as any).style.paddingTop = "";
      }}
      onDrop={(e) => {
        const from = JSON.parse(e.dataTransfer.getData("Text"));
        (e.target as any).style.paddingTop = "";
        move(from, index);
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
      key={index}
    >
      <div
        className={`layer ${open ? "open" : ""} ${
          op.visible ? "" : "disabled"
        }`}
        style={{ backgroundColor: op.visible ? op.color : "white" }}
      >
        <div>
          <span
            className="layer-title"
            onClick={() => (open ? select(-1) : select(index))}
          >
            {op.type}
          </span>
          <div
            className="icon-button top-right"
            style={{ right: "30px" }}
            onClick={() => {
              op.toggleVisible();
              rerender();
            }}
          >
            {(op.visible && <BsEyeFill />) || <BsEyeSlashFill />}
          </div>
          <div className="icon-button top-right" onClick={() => remove(index)}>
            <RxCrossCircled />
          </div>
        </div>
        {open && (
          <div className="layer-body">
            {op.description} {op.ui(rerender)}
          </div>
        )}
      </div>
    </div>
  );
};
export default Layer;
