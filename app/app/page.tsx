"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FormaLogoStatic } from "@/components/FormaLogo";

type Project = { name: string; status: string; modules: number; owner: string };

const SEED: Project[] = [
  { name: "Atlas Expansion",  status: "Active", modules: 12, owner: "Strategy" },
  { name: "Northstar CRM",    status: "Design", modules: 8,  owner: "Product"  },
  { name: "Investor Room",    status: "Review", modules: 5,  owner: "Growth"   },
];

export default function AppPage() {
  const [projects, setProjects] = useState<Project[]>(SEED);
  const [name, setName]         = useState("");
  const [q, setQ]               = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("forma-projects");
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("forma-projects", JSON.stringify(projects));
  }, [projects]);

  const filtered = useMemo(
    () => projects.filter(p => p.name.toLowerCase().includes(q.toLowerCase())),
    [projects, q]
  );

  function add() {
    if (!name.trim()) return;
    setProjects([{ name, status: "Active", modules: 1, owner: "New" }, ...projects]);
    setName("");
  }

  function remove(i: number) {
    setProjects(projects.filter((_, idx) => idx !== i));
  }

  return (
    <div className="forma-app-shell">
      {/* Sidebar */}
      <aside className="forma-side">
        <FormaLogoStatic width={120} />
        <nav>
          <a className="active">Projects</a>
          <a>Structures</a>
          <a>Modules</a>
          <a>Data flows</a>
          <Link href="/">Landing</Link>
          <Link href="/brand">Brand kit</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="forma-main">
        <div className="forma-toolbar">
          <div>
            <p className="forma-eyebrow">Workspace</p>
            <h1>Operational dashboard</h1>
          </div>
          <span className="forma-tag">localStorage demo</span>
        </div>

        {/* Controls */}
        <div className="forma-grid3" style={{ gap: 12, marginBottom: 24 }}>
          <input
            className="forma-input"
            placeholder="Search projects"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <input
            className="forma-input"
            placeholder="New project name"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
          />
          <button className="forma-btn" onClick={add} style={{ width: "100%" }}>
            Create project
          </button>
        </div>

        {/* Project cards */}
        <section className="forma-project-grid">
          {filtered.map((p, i) => (
            <div className="forma-card" key={p.name + i}>
              <span className="forma-tag">{p.status}</span>
              <h3 style={{ marginTop: 12 }}>{p.name}</h3>
              <p style={{ color: "var(--muted)", margin: "4px 0 12px" }}>Owner: {p.owner}</p>
              <div className="forma-metric">
                <span>Modules</span><b>{p.modules}</b>
              </div>
              <button
                className="forma-btn forma-btn-ghost"
                onClick={() => remove(i)}
                style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
              >
                Archive
              </button>
            </div>
          ))}
        </section>

        {/* Kanban */}
        <section className="forma-kanban">
          <div className="forma-column">
            <b>Map</b>
            <div className="forma-mini">Define structure</div>
            <div className="forma-mini">Connect modules</div>
          </div>
          <div className="forma-column">
            <b>Build</b>
            <div className="forma-mini">Prototype interface</div>
            <div className="forma-mini">Review logic</div>
          </div>
          <div className="forma-column">
            <b>Scale</b>
            <div className="forma-mini">Prepare investor room</div>
            <div className="forma-mini">Publish system</div>
          </div>
        </section>
      </main>
    </div>
  );
}
