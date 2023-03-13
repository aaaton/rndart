import React, { ReactNode, useState } from "react";
import { BsCloudDownload, BsPalette2, BsPlusCircle } from "react-icons/bs";
import { RxReload } from "react-icons/rx";
import ToolButton from "./ToolButton";

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
        <RxReload />
        Randomize
      </ToolButton>
      <ToolButton onclick={addRandom} onHover={addList}>
        <BsPlusCircle />
        Add
      </ToolButton>
      <ToolButton onclick={recolor} disabled={!hasOperations}>
        <BsPalette2 />
        Recolor
      </ToolButton>
      <ToolButton onclick={download} disabled={!hasOperations}>
        <BsCloudDownload />
        Download
      </ToolButton>
    </div>
  );
};
export default Toolbar;
