import type { Metadata } from "next";
import "@zoja/ui/fonts.css";
import "@zoja/ui/tokens.css";
import "./globals.css";
import { ToolSidebar } from "@/components/tool-sidebar";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = {
  title: "ZOJA Studio",
  description: "Create AI personas and plan their campaigns.",
};

/** Studio shell: top bar, tool rail on the left, and the page (the canvas) filling the rest. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex h-dvh flex-col overflow-hidden bg-zinc-50 font-sans text-zinc-900">
        <TopBar />
        <div className="flex min-h-0 flex-1">
          <ToolSidebar />
          <main className="relative min-w-0 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
