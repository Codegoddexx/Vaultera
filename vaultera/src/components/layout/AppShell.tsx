"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(240);

  // Listen to sidebar collapse via CSS variable or just use fixed widths
  return (
    <div className="flex h-screen" style={{ background: "var(--bg-primary)" }}>
      <Sidebar />
      {/* Main content — offset by sidebar */}
      <div className="flex flex-col flex-1 min-w-0" style={{ marginLeft: 240, transition: "margin 0.3s ease" }}>
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6" style={{ background: "var(--bg-primary)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}