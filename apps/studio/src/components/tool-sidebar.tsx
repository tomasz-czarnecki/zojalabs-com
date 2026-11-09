"use client";

import { useState } from "react";
import {
  Box,
  ChevronRight,
  Cloud,
  FolderUp,
  Hand,
  Layers,
  PenTool,
  Plus,
  Sparkles,
  StickyNote,
  Type,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Tool = { name: string; icon: LucideIcon; more?: boolean };

/** Placeholder tools; none of them does anything yet apart from showing as selected. */
const tools: Tool[] = [
  { name: "Add", icon: Plus },
  { name: "Layers", icon: Layers },
  { name: "Hand", icon: Hand, more: true },
  { name: "AI", icon: Sparkles },
  { name: "Nodes", icon: Workflow },
  { name: "Text", icon: Type },
  { name: "Pen", icon: PenTool, more: true },
  { name: "Note", icon: StickyNote, more: true },
  { name: "Assets", icon: Cloud },
  { name: "Components", icon: Box },
  { name: "Upload", icon: FolderUp },
];

/** Left tool rail of the studio. */
export function ToolSidebar() {
  const [active, setActive] = useState("Nodes");

  return (
    <aside aria-label="Tools" className="flex w-14 shrink-0 flex-col items-center gap-1 overflow-y-auto border-r border-zinc-200 bg-white py-3">
      {tools.map(({ name, icon: Icon, more }) => (
        <button
          key={name}
          type="button"
          title={name}
          aria-label={name}
          aria-pressed={active === name}
          onClick={() => setActive(name)}
          className="relative grid size-10 shrink-0 place-items-center rounded-lg text-zinc-700 hover:bg-zinc-100 aria-pressed:bg-blue-50 aria-pressed:text-blue-600"
        >
          <Icon className="size-5" strokeWidth={1.75} />
          {more && <ChevronRight className="absolute right-0.5 size-3 text-zinc-400" />}
        </button>
      ))}
    </aside>
  );
}
