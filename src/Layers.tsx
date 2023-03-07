import React, { useState } from "react";
import { BsLayers } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { Drawable } from "./drawables/drawable";
import Layer from "./Layer";
type Props = {
  operations: Drawable[];
  rerender: () => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  select: (index: number) => void;
  selected: number;
};
const Layers = (props: Props) => {
  const [visible, setVisible] = useState(false);
  let { operations } = props;
  return (
    <div className={`layers ${visible ? "open" : ""}`}>
      <div className="button" onClick={() => setVisible(!visible)}>
        Layers <BsLayers />
      </div>
      {visible && (
        <div className="layers-list">
          {operations.map((o, key) => {
            return (
              <Layer
                index={key}
                open={props.selected == key}
                op={o}
                key={key}
                {...props}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Layers;
