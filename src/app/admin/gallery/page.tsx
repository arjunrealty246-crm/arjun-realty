"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Search, Image as ImageIcon, Upload } from "lucide-react";
import { uploadWithProgress } from "@/lib/client-upload";

interface Item { _id: string; title: string; image: string; category: string; project?: string; }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState({ title: "", image: "", category: "general", project: "" });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const fetchItems = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing(null); setForm({ title: "", image: "", category: "general", project: "" }); setShowForm(true); };
  const openEdit = (item: Item) => { setEditing(item); setForm({ title: item.title, image: item.image, category: item.category, project: item.project || "" }); setShowForm(true); };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const url = await uploadWithProgress(file, "uploads/gallery", (ratio) =>
        setUploadProgress(Math.round(ratio * 100))
      );
      if (url) setForm({ ...form, image: url });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleSave = async () => {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { _id: editing._id, ...form } : form;
    const res = await fetch("/api/gallery", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setShowForm(false); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) fetchItems();
  };

  const filtered = items.filter((i) => i.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-white tracking-tight">Gallery</h1><p className="text-sm text-white/30 mt-1">{items.length} images</p></div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"><Plus className="h-4 w-4" /> Add Image</button>
      </div>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" />
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item._id} className="glass-card rounded-xl overflow-hidden group">
              <div className="aspect-[4/3] bg-white/[0.02] relative overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center"><ImageIcon className="h-8 w-8 text-white/10" /></div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => openEdit(item)} className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-primary/30 transition-all"><Edit3 className="h-3.5 w-3.5" /></button>
                  <button onClick={() => handleDelete(item._id)} className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-red-500/30 transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-white/70 truncate">{item.title}</p>
                <span className="text-[9px] text-white/20 uppercase tracking-wider">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="glass-card-elevated rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-5">{editing ? "Edit Image" : "Add Image"}</h3>
            <div className="space-y-4">
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
                <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project</label>
                  <input type="text" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              </div>
              <div>
                <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Image URL</label>
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white font-mono text-xs focus:outline-none focus:border-primary/30" />
                <label className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all">
                  {uploading ? (
                    <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )} Upload
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                </label>
                {uploadProgress !== null && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-white/40 mb-1.5">
                      <span className="font-semibold text-white/70">
                        {uploadProgress > 0 ? `Uploading… ${uploadProgress}%` : "Preparing file (compressing image)…"}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-[width] duration-200" style={{ width: `${Math.max(uploadProgress, 2)}%` }} />
                    </div>
                  </div>
                )}
              </div>
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
