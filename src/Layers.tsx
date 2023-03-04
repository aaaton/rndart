import React, { useState } from "react";
import { Drawable } from "./drawables/drawable";
type Props = {
  operations: Drawable[];
};
const Layers = ({ operations }: Props) => {
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
                key={key}
                className={`layer ${open ? "open" : ""}`}
                style={{ backgroundColor: o.color }}
              >
                <span
                  className="layer-title"
                  onClick={() => (open ? setToggled(-1) : setToggled(key))}
                >
                  {o.type}
                </span>
                {open && (
                  <div className="layer-body">
                    {o.description} {o.ui()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Layers;
