import React from "react";
import { BsCloudDownload, BsPalette2, BsPlusCircle } from "react-icons/bs";
import { RxReload, RxTrash } from "react-icons/rx";
import ToolButton from "./ToolButton";

type ToolbarProps = {
  blank: () => void;
  randomize: () => void;
  download: () => void;
  downloadSvg: () => void;
  recolor: () => void;
  addRandom: (op?: string) => void;
  hasOperations: boolean;
};
const Toolbar = ({
  blank,
  randomize,
  download,
  downloadSvg,
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
      <ToolButton onclick={() => addRandom("grid")}>Grid</ToolButton>
    </div>
  );

  const downloadList = (
    <div style={{ position: "absolute" }}>
      <ToolButton onclick={download}>PNG</ToolButton>
      <ToolButton onclick={downloadSvg}>SVG</ToolButton>
    </div>
  );
  return (
    <div id="toolbar" className="toolBar">
      <ToolButton onclick={randomize}>
        <RxReload />
        Randomize
      </ToolButton>
      <ToolButton onclick={blank}>
        <RxTrash />
        Blank
      </ToolButton>
      <ToolButton onclick={addRandom} onHover={addList}>
        <BsPlusCircle />
        Add
      </ToolButton>
      <ToolButton onclick={recolor} disabled={!hasOperations}>
        <BsPalette2 />
        Recolor
      </ToolButton>
      <ToolButton
        onclick={downloadSvg}
        onHover={downloadList}
        disabled={!hasOperations}
      >
        <BsCloudDownload />
        Download
      </ToolButton>
    </div>
  );
};
export default Toolbar;
