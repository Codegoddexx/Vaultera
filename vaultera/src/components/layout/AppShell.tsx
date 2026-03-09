"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return ( 
    <div className="flex h-screen bg-[var(--bg-primary)]">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[240px]">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0 md:ml-[240px]">

        {/* Pass toggle to TopBar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{ background: "var(--bg-primary)" }}
        >
          {children}
        </main>

      </div>
    </div>
  );
}

 