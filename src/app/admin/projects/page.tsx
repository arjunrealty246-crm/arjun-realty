"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, ExternalLink, Search, MapPin, Shield } from "lucide-react";

interface ProjectItem {
  _id: string;
  slug: string;
  name: string;
  projectType: string;
  location: string;
  approval: string;
  status: string;
  badge: string;
  startingPrice: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects(projects.filter((p) => p._id !== id));
      setDeleteId(null);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-sm text-white/30 mt-1">{projects.length} total projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
        >
          <Plus className="h-4 w-4" /> Add Project
        </Link>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 transition-all"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <p className="text-white/30 text-sm">No projects found.</p>
        </div>
      ) : (
        <div className="glass-card-elevated rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">Name</th>
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden md:table-cell">Type</th>
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden lg:table-cell">Location</th>
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden sm:table-cell">Status</th>
                  <th className="px-5 py-4 text-right text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-white/80">{p.name}</p>
                      <p className="text-[11px] text-white/25 mt-0.5">{p.startingPrice}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-white/40">{p.projectType?.slice(0, 40)}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="flex items-center gap-1.5 text-xs text-white/40">
                        <MapPin className="h-3 w-3 text-primary/50" /> {p.location}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        p.status === "Live" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${p.status === "Live" ? "bg-emerald-400" : "bg-amber-400"}`} />
                        {p.badge || p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${p.slug}/edit?id=${p._id}`}
                          className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(p._id)}
                          className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="glass-card-elevated rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-sm text-white/40 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:text-white transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/25 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
