"use client";

import { Background, BackgroundVariant, MarkerType, ReactFlow, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./canvas.css";
import { StepNodeView, type StepNode } from "./step-node";
import { ZoomBar } from "./zoom-bar";

const nodeTypes = { step: StepNodeView };

const nodes: StepNode[] = [
  {
    id: "persona",
    type: "step",
    position: { x: 0, y: 0 },
    data: { title: "Persona", label: "Persona bible", rows: ["Face", "Voice", "Wardrobe", "Hard rules"], action: "Edit bible" },
  },
  {
    id: "shot",
    type: "step",
    position: { x: 420, y: 60 },
    data: { title: "Shot", label: "Shot spec", rows: ["Location", "Lens", "Light"], action: "Generate" },
  },
];

const edges: Edge[] = [
  { id: "persona-shot", source: "persona", target: "shot", markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" } },
];

/** The studio canvas: drag the background to pan, scroll or pinch to zoom, drag nodes to move them.
 *  Panning stops at a large but finite area, so the canvas is semi-infinite. */
export function StudioCanvas() {
  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.5, maxZoom: 1 }}
      minZoom={0.25}
      maxZoom={2}
      translateExtent={[
        [-3000, -2000],
        [4000, 3000],
      ]}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1.5} />
      <ZoomBar />
    </ReactFlow>
  );
}
