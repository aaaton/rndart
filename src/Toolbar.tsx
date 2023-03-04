import React, { ReactNode } from "react";
import { BsCloudDownload, BsPalette2, BsPlusCircle } from "react-icons/bs";
import { RxReload, RxShuffle } from "react-icons/rx";

// TODO: Make this look cool
const ToolButton = ({
  children,
  onclick,
  disabled,
}: {
  children?: ReactNode;
  onclick: () => void;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={() => (!disabled ? onclick() : () => {})}
      className={`button ${disabled ? "disabled" : ""}`}
    >
      {children}
    </div>
  );
};
type ToolbarProps = {
  randomize: () => void;
  download: () => void;
  recolor: () => void;
  addRandom: () => void;
  hasOperations: boolean;
};
const Toolbar = ({
  randomize,
  download,
  recolor,
  addRandom,
  hasOperations,
}: ToolbarProps) => {
  return (
    <div id="toolbar" className="toolBar">
      <ToolButton onclick={randomize}>
        Randomize <RxReload />{" "}
      </ToolButton>
      <ToolButton onclick={addRandom}>
        Add <BsPlusCircle />{" "}
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
