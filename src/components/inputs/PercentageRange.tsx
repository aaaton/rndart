import React from "react";
type Props = {
  value: number;
  onInput: (value: number) => void;
  label?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  disabled?: boolean;
};
const PercentageRange = ({
  value,
  onInput,
  label,
  min,
  max,
  step,
  disabled,
}: Props) => {
  return (
    <div className="percentage">
      {label && <div style={{ color: disabled ? "#ccc" : "" }}>{label}</div>}
      <input
        disabled={disabled}
        className="percentage-input"
        type="range"
        min={min || "1"}
        max={max || "100"}
        onInput={(e) => {
          onInput((e.target as any).value / 100);
        }}
        step={step || "1"}
        value={Math.round(value * 100)}
      />
    </div>
  );
};
export default PercentageRange;
