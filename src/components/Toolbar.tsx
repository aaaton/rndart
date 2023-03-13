import React, { ReactNode, useState } from "react";
import { BsCloudDownload, BsPalette2, BsPlusCircle } from "react-icons/bs";
import { RxReload } from "react-icons/rx";

// TODO: Make this look cool
const ToolButton = ({
  children,
  onclick,
  disabled,
  onHover,
}: {
  children?: ReactNode;
  onclick: () => void;
  disabled?: boolean;
  onHover?: JSX.Element;
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{ position: "relative" }}
    >
      <div
        onClick={() => (!disabled ? onclick() : () => {})}
        className={`button ${disabled ? "disabled" : ""}`}
      >
        {children}
      </div>
      {mouseOver && onHover}
    </div>
  );
};
type ToolbarProps = {
  randomize: () => void;
  download: () => void;
  recolor: () => void;
  addRandom: (op?: string) => void;
  hasOperations: boolean;
};
const Toolbar = ({
  randomize,
  download,
  recolor,
  addRandom,
  hasOperations,
}: ToolbarProps) => {
  const addList = (
    <div style={{ position: "absolute" }}>
      <ToolButton onclick={() => addRandom("rectangle")}>Rectangle</ToolButton>
      <ToolButton onclick={() => addRandom("circle")}>Circle</ToolButton>
      <ToolButton onclick={() => addRandom("loop")}>Loop</ToolButton>
      <ToolButton onclick={() => addRandom("venn")}>Venn</ToolButton>
    </div>
  );
  return (
    <div id="toolbar" className="toolBar">
      <ToolButton onclick={randomize}>
        Randomize <RxReload />{" "}
      </ToolButton>
      <ToolButton onclick={addRandom} onHover={addList}>
        Add <BsPlusCircle />
      </ToolButton>
      <ToolButton onclick={recolor} disabled={!hasOperations}>
        Recolor <BsPalette2 />
      </ToolButton>
      <ToolButton onclick={download} disabled={!hasOperations}>
        Download <BsCloudDownload />
      </ToolButton>
    </div>
  );
};
export default Toolbar;
