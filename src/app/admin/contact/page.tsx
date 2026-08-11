"use client";

import { useState, useEffect } from "react";
import { Save, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

interface ContactForm {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  workingHours: string;
  mapUrl: string;
}

const emptyForm: ContactForm = { phone: "", email: "", address: "", whatsapp: "", workingHours: "", mapUrl: "" };

export default function AdminContactPage() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => {
        if (data && data._id) {
          const { _id, createdAt, updatedAt, __v, ...rest } = data;
          setForm(rest);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Contact Settings</h1>
        <p className="text-sm text-white/30 mt-1">Manage contact information displayed across the website</p>
      </div>

      <div className="glass-card-elevated rounded-2xl p-6 lg:p-8 max-w-2xl">
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium"><Phone className="h-3.5 w-3.5" /> Phone Number</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="+91 96423 33246" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium"><Mail className="h-3.5 w-3.5" /> Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="arjunrealty246@gmail.com" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium"><MapPin className="h-3.5 w-3.5" /> Address</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp Number</label>
              <input type="text" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="+919642333246" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Working Hours</label>
              <input type="text" value={form.workingHours} onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="Mon-Sat: 10 AM - 7 PM" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Google Maps URL</label>
            <input type="text" value={form.mapUrl} onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30 font-mono text-xs" />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button onClick={handleSave} disabled={saving}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-8 py-3 rounded-full text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-50">
            {saving ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="h-4 w-4" /> Save Settings</>}
          </button>
          {saved && <span className="text-sm text-emerald-400">Saved successfully!</span>}
        </div>
      </div>
    </div>
  );
}
