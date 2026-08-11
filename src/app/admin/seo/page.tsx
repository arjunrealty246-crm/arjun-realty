"use client";

import { useState, useEffect } from "react";
import { Save, Search, Edit3 } from "lucide-react";

interface SEOItem {
  _id?: string;
  page: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

const defaultPages = ["home", "about", "projects", "contact", "nri-investment", "why-hyderabad", "testimonials"];

export default function AdminSEOPage() {
  const [items, setItems] = useState<SEOItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SEOItem | null>(null);
  const [form, setForm] = useState({ page: "", title: "", description: "", keywords: "", ogImage: "" });

  const fetchItems = async () => {
    const res = await fetch("/api/seo");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const openEdit = (item: SEOItem) => {
    setEditing(item);
    setForm({ page: item.page, title: item.title, description: item.description, keywords: (item.keywords || []).join(", "), ogImage: item.ogImage || "" });
  };

  const openNew = (page: string) => {
    setEditing(null);
    setForm({ page, title: "", description: "", keywords: "", ogImage: "" });
  };

  const handleSave = async () => {
    const body = { ...(editing?._id ? { _id: editing._id } : {}), page: form.page, title: form.title, description: form.description, keywords: form.keywords.split(",").map((s) => s.trim()).filter(Boolean), ogImage: form.ogImage };
    const res = await fetch("/api/seo", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setEditing(null); fetchItems(); }
  };

  const getItem = (page: string) => items.find((i) => i.page === page);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">SEO Settings</h1>
        <p className="text-sm text-white/30 mt-1">Manage meta titles, descriptions, and keywords for each page</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass-card-elevated rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">Page</th>
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden md:table-cell">Title</th>
                  <th className="px-5 py-4 text-left text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold hidden lg:table-cell">Description</th>
                  <th className="px-5 py-4 text-right text-[10px] text-white/25 uppercase tracking-[0.15em] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {defaultPages.map((page) => {
                  const item = getItem(page);
                  return (
                    <tr key={page} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors">
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-white/70 capitalize">{page.replace(/-/g, " ")}</span>
                        {!item && <span className="ml-2 text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold">Not set</span>}
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-xs text-white/40 line-clamp-1">{item?.title || "-"}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-xs text-white/30 line-clamp-1">{item?.description || "-"}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => item ? openEdit(item) : openNew(page)}
                          className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 transition-all">
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="glass-card-elevated rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-5 capitalize">Edit SEO — {form.page.replace(/-/g, " ")}</h3>
            <div className="space-y-4">
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Meta Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" />
                <p className="text-[10px] text-white/20 mt-1">{form.title.length} characters</p>
              </div>
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Meta Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" />
              </div>
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Keywords (comma separated)</label>
                <input type="text" value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">OG Image URL</label>
                <input type="text" value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30 font-mono text-xs" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-sm font-semibold text-white"><Save className="h-3.5 w-3.5 inline mr-1.5" /> Save</button>
              <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:text-white transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
