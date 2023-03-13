import React, { ReactNode, useState } from "react";

type ToolButtonProps = {
  children?: ReactNode;
  onclick: () => void;
  disabled?: boolean;
  onHover?: JSX.Element;
  className?: string;
};
// TODO: Make this look cool
const ToolButton = ({
  children,
  onclick,
  disabled,
  onHover,
  className,
}: ToolButtonProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{ position: "relative" }}
    >
      <div
        onClick={() => (!disabled ? onclick() : () => {})}
        className={`button ${disabled ? "disabled" : ""} ${className}`}
      >
        {children}
      </div>
      {mouseOver && onHover}
    </div>
  );
};

export default ToolButton;
