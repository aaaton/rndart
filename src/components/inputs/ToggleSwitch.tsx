import React from "react";
import { BsPower } from "react-icons/bs";
type Props = {
  value: boolean;
  onInput: (v: boolean) => void;
  label?: string;
  color?: string;
  disabled?: boolean;
};
const ToggleSwitch = ({ value, onInput, label, color, disabled }: Props) => {
  return (
    <div>
      <span
        className={`button centered ${value && "active"} ${disabled &&
          "disabled"}`}
        style={{ backgroundColor: color }}
        onClick={() => !disabled && onInput(!value)}
      >
        <BsPower
          color={(value && "rgb(15,102,15)") || "#ccc"}
          style={{ marginRight: "5px" }}
        />

        {label || "Button"}
      </span>
    </div>
  );
};
export default ToggleSwitch;
