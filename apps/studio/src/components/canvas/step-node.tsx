import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type StepNodeData = { title: string; label: string; rows: string[]; action: string };
export type StepNode = Node<StepNodeData, "step">;

/** A canvas node: a title card with a panel of fields under it. Input on the left, output on the right. */
export function StepNodeView({ data, selected }: NodeProps<StepNode>) {
  return (
    <div className="w-60">
      <Handle type="target" position={Position.Left} />
      <div
        className={`rounded-xl border bg-white px-4 py-3 text-sm font-medium shadow-sm ${selected ? "border-blue-500" : "border-zinc-200"}`}
      >
        {data.title}
      </div>
      <div className="mt-1 rounded-xl border border-zinc-200 bg-zinc-100 p-3">
        <p className="px-1 text-xs text-zinc-500">{data.label}</p>
        <ul className="mt-2 space-y-1.5 text-sm">
          {data.rows.map((row) => (
            <li key={row} className="rounded-lg bg-white px-3 py-2">
              {row}
            </li>
          ))}
          <li className="rounded-lg bg-white px-3 py-2 text-blue-600">{data.action}</li>
        </ul>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
