"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Search, HelpCircle } from "lucide-react";

interface Item { _id: string; q: string; a: string; category?: string; featured: boolean; }

export default function AdminFAQsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState({ q: "", a: "", category: "", featured: false });

  const fetchItems = async () => {
    const res = await fetch("/api/faqs");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing(null); setForm({ q: "", a: "", category: "", featured: false }); setShowForm(true); };
  const openEdit = (item: Item) => { setEditing(item); setForm({ q: item.q, a: item.a, category: item.category || "", featured: item.featured }); setShowForm(true); };

  const handleSave = async () => {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { _id: editing._id, ...form } : form;
    const res = await fetch("/api/faqs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setShowForm(false); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/faqs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) fetchItems();
  };

  const filtered = items.filter((i) => i.q?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-white tracking-tight">FAQs</h1><p className="text-sm text-white/30 mt-1">{items.length} questions</p></div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"><Plus className="h-4 w-4" /> Add FAQ</button>
      </div>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" />
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item._id} className="glass-card rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <HelpCircle className="h-3.5 w-3.5 text-primary/50 shrink-0" />
                  <span className="text-sm font-semibold text-white/70">{item.q}</span>
                </div>
                <p className="text-xs text-white/30 mt-1 line-clamp-1">{item.a}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(item)} className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 transition-all"><Edit3 className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(item._id)} className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="glass-card-elevated rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-5">{editing ? "Edit FAQ" : "New FAQ"}</h3>
            <div className="space-y-4">
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Question</label>
                <input type="text" value={form.q} onChange={(e) => setForm({ ...form, q: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Answer</label>
                <textarea value={form.a} onChange={(e) => setForm({ ...form, a: e.target.value })} rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Category</label>
                <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="General, Investment, NRI..." /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-white/[0.04] text-primary focus:ring-primary/30" />
                <span className="text-sm text-white/50">Featured</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-sm font-semibold text-white">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:text-white transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
