"use client";

import { Panel, useReactFlow, useViewport } from "@xyflow/react";
import { Maximize, Minus, Plus } from "lucide-react";

const buttonClass = "grid size-8 place-items-center rounded-lg text-zinc-700 hover:bg-zinc-100";

/** Bottom zoom control: zoom out, current zoom, zoom in, and fit everything in view. */
export function ZoomBar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();

  return (
    <Panel position="bottom-center" className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-sm">
      <button type="button" aria-label="Zoom out" className={buttonClass} onClick={() => zoomOut({ duration: 200 })}>
        <Minus className="size-4" />
      </button>
      <span className="w-12 text-center text-sm tabular-nums">{Math.round(zoom * 100)}%</span>
      <button type="button" aria-label="Zoom in" className={buttonClass} onClick={() => zoomIn({ duration: 200 })}>
        <Plus className="size-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-zinc-200" />
      <button type="button" aria-label="Fit to view" className={buttonClass} onClick={() => fitView({ padding: 0.5, maxZoom: 1, duration: 300 })}>
        <Maximize className="size-4" />
      </button>
    </Panel>
  );
}
