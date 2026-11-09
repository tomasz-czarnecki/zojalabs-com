import Image from "next/image";
import { ChevronDown, Menu, Monitor, Plus, Smartphone, Tablet } from "lucide-react";
import logo from "@zoja/ui/logo/zoja-ai.svg";

/** Top bar of the studio: menu, logo, project breadcrumb, create button and device preview toggles. */
export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-zinc-200 bg-white px-3">
      <button type="button" aria-label="Menu" className="grid size-9 place-items-center rounded-lg text-zinc-700 hover:bg-zinc-100">
        <Menu className="size-5" />
      </button>
      <Image src={logo} alt="zoja.ai" className="h-4 w-auto" priority />

      <nav aria-label="Project" className="hidden items-center gap-2 text-sm sm:flex">
        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-blue-600">Drafts</span>
        <span className="text-zinc-400">/</span>
        <button type="button" className="flex items-center gap-1 font-medium text-zinc-900">
          Untitled campaign
          <ChevronDown className="size-4 text-zinc-500" />
        </button>
      </nav>

      <button
        type="button"
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
      >
        <Plus className="size-4" />
        Create
      </button>

      <div className="hidden items-center gap-1 text-zinc-500 md:flex" aria-label="Preview size">
        <button type="button" aria-label="Desktop" aria-pressed="true" className="grid size-8 place-items-center rounded-md text-zinc-900">
          <Monitor className="size-5" />
        </button>
        <button type="button" aria-label="Tablet" aria-pressed="false" className="grid size-8 place-items-center rounded-md hover:text-zinc-900">
          <Tablet className="size-5" />
        </button>
        <button type="button" aria-label="Phone" aria-pressed="false" className="grid size-8 place-items-center rounded-md hover:text-zinc-900">
          <Smartphone className="size-5" />
        </button>
        <ChevronDown className="size-4" />
      </div>
    </header>
  );
}
