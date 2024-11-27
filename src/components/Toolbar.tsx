import React from "react";
import { BsCloudDownload, BsPalette2, BsPlusCircle } from "react-icons/bs";
import { RxReload, RxTrash } from "react-icons/rx";
import ToolButton from "./ToolButton";

type ToolbarProps = {
  blank: () => void;
  randomize: () => void;
  download: (multiplier: number) => void;
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
    <div
      style={{
        position: "absolute",
        backgroundColor: "rgba(255,255,255,0.2)",
        width: "160px",
        borderRadius: "10px",
      }}
    >
      <ToolButton onclick={() => addRandom("rectangle")}>Rectangle</ToolButton>
      <ToolButton onclick={() => addRandom("circle")}>Circle</ToolButton>
      <ToolButton onclick={() => addRandom("loop")}>Loop</ToolButton>
      <ToolButton onclick={() => addRandom("venn")}>Venn</ToolButton>
      <ToolButton onclick={() => addRandom("grid")}>Grid</ToolButton>
    </div>
  );

  const downloadList = (
    <div
      style={{
        position: "absolute",
        width: "240px",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "10px",
      }}
    >
      <ToolButton onclick={downloadSvg} disabled={!hasOperations}>
        SVG
      </ToolButton>
      <ToolButton onclick={() => download(1)} disabled={!hasOperations}>
        PNG ({window.innerWidth}x{window.innerHeight} px)
      </ToolButton>
      <ToolButton onclick={() => download(2)} disabled={!hasOperations}>
        PNG ({window.innerWidth * 2}x{window.innerHeight * 2} px)
      </ToolButton>
      <ToolButton onclick={() => download(4)} disabled={!hasOperations}>
        PNG ({window.innerWidth * 4}x{window.innerHeight * 4} px)
      </ToolButton>
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
