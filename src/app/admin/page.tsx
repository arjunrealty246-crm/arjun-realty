"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderOpen, Building2, MessageSquare, HelpCircle,
  Image, FileText, ArrowRight, TrendingUp, Star,
  Database, RefreshCw, CheckCircle, AlertCircle,
} from "lucide-react";

interface DashboardStats {
  projects: number;
  builders: number;
  testimonials: number;
  faqs: number;
  gallery: number;
  brochures: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string[] | null>(null);
  const [seedError, setSeedError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [p, b, t, f, g, br] = await Promise.all([
        fetch("/api/projects").then(r => r.json()),
        fetch("/api/builders").then(r => r.json()),
        fetch("/api/testimonials").then(r => r.json()),
        fetch("/api/faqs").then(r => r.json()),
        fetch("/api/gallery").then(r => r.json()),
        fetch("/api/brochures").then(r => r.json()),
      ]);
      const s = {
        projects: Array.isArray(p) ? p.length : 0,
        builders: Array.isArray(b) ? b.length : 0,
        testimonials: Array.isArray(t) ? t.length : 0,
        faqs: Array.isArray(f) ? f.length : 0,
        gallery: Array.isArray(g) ? g.length : 0,
        brochures: Array.isArray(br) ? br.length : 0,
      };
      setStats(s);
      setLoading(false);
      // Auto-seed if database is empty
      if (s.projects === 0 && s.builders === 0) {
        handleSeed();
      }
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedError("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSeedResult(data.results || []);
        fetchStats();
      } else {
        setSeedError(data.error || "Seed failed");
      }
    } catch {
      setSeedError("Seed request failed");
    }
    setSeeding(false);
  };

  const totalRecords = stats ? Object.values(stats).reduce((a, b) => a + b, 0) : 0;

  const cards = [
    { label: "Projects", value: stats?.projects ?? 0, icon: FolderOpen, href: "/admin/projects", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Builders", value: stats?.builders ?? 0, icon: Building2, href: "/admin/builders", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Testimonials", value: stats?.testimonials ?? 0, icon: MessageSquare, href: "/admin/testimonials", color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "FAQs", value: stats?.faqs ?? 0, icon: HelpCircle, href: "/admin/faqs", color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Gallery", value: stats?.gallery ?? 0, icon: Image, href: "/admin/gallery", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Brochures", value: stats?.brochures ?? 0, icon: FileText, href: "/admin/brochures", color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-white/30 mt-1">
            {totalRecords > 0
              ? `${totalRecords} total records across all collections`
              : "Overview of your real estate portfolio"}
          </p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[13px] text-white/50 hover:text-white hover:border-primary/30 transition-all disabled:opacity-50"
        >
          {seeding ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          {seeding ? "Seeding..." : "Seed Data"}
        </button>
      </div>

      {seedResult && (
        <div className="mb-6 px-5 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold mb-2">
            <CheckCircle className="h-4 w-4" /> Data Seeded Successfully
          </div>
          <ul className="space-y-0.5">
            {seedResult.map((r, i) => (
              <li key={i} className="text-xs text-emerald-400/70">{r}</li>
            ))}
          </ul>
        </div>
      )}

      {seedError && (
        <div className="mb-6 px-5 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-2 text-sm text-red-400 font-semibold">
            <AlertCircle className="h-4 w-4" /> {seedError}
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.label} href={card.href}>
                  <div className="glass-card rounded-2xl p-6 group hover:border-primary/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${card.color}`} />
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/10 group-hover:text-primary/50 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                    <p className="text-sm text-white/30">{card.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="glass-card-elevated rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/admin/projects/new"
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-primary/10 border border-primary/20 text-sm font-semibold text-primary hover:bg-primary/15 transition-all">
                <Star className="h-4 w-4" /> Add New Project
              </Link>
              <Link href="/admin/projects"
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-white/60 hover:bg-white/[0.07] transition-all">
                <FolderOpen className="h-4 w-4" /> Manage Projects
              </Link>
              <Link href="/admin/builders"
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-white/60 hover:bg-white/[0.07] transition-all">
                <Building2 className="h-4 w-4" /> Manage Builders
              </Link>
              <Link href="/admin/contact"
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-semibold text-white/60 hover:bg-white/[0.07] transition-all">
                <TrendingUp className="h-4 w-4" /> Contact Settings
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
