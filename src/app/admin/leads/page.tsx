"use client";

import { useState, useEffect } from "react";
import { Search, Inbox, Phone, User, CalendarDays } from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  project?: string;
  source: string;
  leadType?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  country?: string;
  investmentBudget?: string;
  createdAt: string;
}

const SOURCE_FILTERS = ["All", "Contact Form", "Callback", "Project Enquiry", "Site Visit", "WhatsApp Enquiry"];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");

  useEffect(() => {
    let active = true;
    fetch("/api/leads")
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 401 ? "Unauthorized" : "Failed to load leads");
        const data = await r.json();
        if (active) setLeads(Array.isArray(data) ? data : []);
      })
      .catch((e: unknown) => {
        if (active) setError(e instanceof Error ? e.message : "Failed to load leads");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      l.name?.toLowerCase().includes(q) ||
      l.mobile?.includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.project?.toLowerCase().includes(q) ||
      l.message?.toLowerCase().includes(q);
    const matchSource = source === "All" || l.source === source;
    return matchQ && matchSource;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Leads</h1>
          <p className="text-sm text-white/30 mt-1">{leads.length} leads captured</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email, project..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {SOURCE_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setSource(s)}
              className={`px-3 py-2 rounded-full text-[11px] font-semibold transition-all ${
                source === s
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/[0.03] text-white/40 border border-white/[0.06] hover:text-white/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 mb-6">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-16 text-center">
          <div className="h-14 w-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
            <Inbox className="h-6 w-6 text-white/20" />
          </div>
          <p className="text-white/40 text-sm">No leads found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <div key={lead._id} className="glass-card rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{lead.name}</p>
                    <p className="text-[11px] text-white/30 flex items-center gap-1.5"><Phone className="h-3 w-3" />{lead.mobile}{lead.whatsapp && lead.whatsapp !== lead.mobile ? ` · WA ${lead.whatsapp}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wider">{lead.source}</span>
                  {lead.leadType && <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/40 font-semibold uppercase tracking-wider">{lead.leadType}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] text-white/30">
                {lead.project && <div><span className="text-white/20 uppercase tracking-wider">Project</span><p className="text-white/50 font-medium mt-0.5">{lead.project}</p></div>}
                {lead.email && <div><span className="text-white/20 uppercase tracking-wider">Email</span><p className="text-white/50 font-medium mt-0.5 truncate">{lead.email}</p></div>}
                {lead.country && <div><span className="text-white/20 uppercase tracking-wider">Country</span><p className="text-white/50 font-medium mt-0.5">{lead.country}</p></div>}
                {lead.investmentBudget && <div><span className="text-white/20 uppercase tracking-wider">Budget</span><p className="text-white/50 font-medium mt-0.5">{lead.investmentBudget}</p></div>}
                {lead.preferredDate && <div><span className="text-white/20 uppercase tracking-wider">Preferred Date</span><p className="text-white/50 font-medium mt-0.5">{lead.preferredDate}{lead.preferredTime ? ` · ${lead.preferredTime}` : ""}</p></div>}
                {lead.message && <div className="sm:col-span-2 lg:col-span-4"><span className="text-white/20 uppercase tracking-wider">Message</span><p className="text-white/45 font-medium mt-0.5">{lead.message}</p></div>}
              </div>

              <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[10px] text-white/20">
                <CalendarDays className="h-3 w-3" /> {formatDate(lead.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
