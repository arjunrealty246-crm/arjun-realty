"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X, Building2, MapPin, Shield, Banknote, Home } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { builders } from "@/data/builders";
import { propertySearch } from "@/data/content";

interface Filters {
  builder: string;
  location: string;
  approval: string;
  budget: string;
  projectType: string;
}

interface PropertySearchProps {
  onFilteredProjects: (filtered: Project[]) => void;
}

const budgets = [
  { label: "Under ₹35 Lakh", value: "0-3500000" },
  { label: "₹35 Lakh – ₹50 Lakh", value: "3500000-5000000" },
  { label: "₹50 Lakh – ₹75 Lakh", value: "5000000-7500000" },
  { label: "₹75 Lakh – ₹1 Cr", value: "7500000-10000000" },
  { label: "Above ₹1 Cr", value: "10000000+" },
];

const approvals = ["HMDA", "DTCP", "RERA", "FCDA"];

const projectTypes = propertySearch.projectTypes.slice(1);

const uniqueLocations = [...new Set(projects.map((p) => p.location.split(",")[0].trim()))].sort();

function parsePrice(price: string): number {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  if (price.includes("Cr")) return num * 10000000;
  if (price.includes("Lakh")) return num * 100000;
  return num;
}

function matchesBudget(project: Project, budgetRange: string): boolean {
  const price = parsePrice(project.startingPrice);
  if (budgetRange === "10000000+") return price >= 10000000;
  const [min, max] = budgetRange.split("-").map(Number);
  return price >= min && price <= max;
}

export default function PropertySearch({ onFilteredProjects }: PropertySearchProps) {
  const [filters, setFilters] = useState<Filters>({
    builder: "",
    location: "",
    approval: "",
    budget: "",
    projectType: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filters.builder && p.builder !== filters.builder) return false;
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.approval && !p.approval.toLowerCase().includes(filters.approval.toLowerCase())) return false;
      if (filters.budget && !matchesBudget(p, filters.budget)) return false;
      if (filters.projectType && !p.projectType.toLowerCase().includes(filters.projectType.toLowerCase())) return false;
      return true;
    });
  }, [filters, searchQuery]);

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchQuery;

  useEffect(() => {
    onFilteredProjects(filtered);
  }, [filtered, onFilteredProjects]);

  const clearAll = () => {
    setFilters({ builder: "", location: "", approval: "", budget: "", projectType: "" });
    setSearchQuery("");
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    const next = { ...filters, [key]: filters[key] === value ? "" : value };
    setFilters(next);
  };

  const filterChips = [
    { key: "builder" as const, value: filters.builder, label: builders.find((b) => b.id === filters.builder)?.name },
    { key: "location" as const, value: filters.location, label: filters.location },
    { key: "approval" as const, value: filters.approval, label: filters.approval },
    { key: "budget" as const, value: filters.budget, label: budgets.find((b) => b.value === filters.budget)?.label },
    { key: "projectType" as const, value: filters.projectType, label: filters.projectType },
  ].filter((c) => c.value);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={propertySearch.placeholder}
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.05] transition-all duration-300"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border transition-all duration-300 text-sm font-medium ${
            showFilters || hasActiveFilters
              ? "bg-primary/10 border-primary/25 text-primary"
              : "bg-white/[0.03] border-white/[0.06] text-white/50 hover:text-white/70 hover:border-white/10"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">{propertySearch.filterButton}</span>
        </button>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-[12px] text-white/30 hover:text-primary/70 transition-colors whitespace-nowrap">
            {propertySearch.clearButton}
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {filterChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filterChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.12] text-[11px] text-primary/70 font-medium"
            >
              {chip.label}
              <button onClick={() => updateFilter(chip.key, chip.value)} className="hover:text-primary transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <span className="text-[11px] text-white/25 py-1.5">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* Expanded filter panel */}
      {showFilters && (
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Builder */}
            <div>
              <label className="block text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-primary/50" /> Builder
              </label>
              <div className="flex flex-wrap gap-1.5">
                {builders.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updateFilter("builder", b.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-300 ${
                      filters.builder === b.id
                        ? "bg-primary/10 border-primary/25 text-primary"
                        : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/10"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-primary/50" /> Location
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
                {uniqueLocations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => updateFilter("location", loc)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-300 ${
                      filters.location === loc
                        ? "bg-primary/10 border-primary/25 text-primary"
                        : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/10"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Approval */}
            <div>
              <label className="block text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-primary/50" /> Approval
              </label>
              <div className="flex flex-wrap gap-1.5">
                {approvals.map((a) => (
                  <button
                    key={a}
                    onClick={() => updateFilter("approval", a)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-300 ${
                      filters.approval === a
                        ? "bg-primary/10 border-primary/25 text-primary"
                        : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/10"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Banknote className="h-3 w-3 text-primary/50" /> Budget
              </label>
              <div className="flex flex-wrap gap-1.5">
                {budgets.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => updateFilter("budget", b.value)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-300 ${
                      filters.budget === b.value
                        ? "bg-primary/10 border-primary/25 text-primary"
                        : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/10"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Home className="h-3 w-3 text-primary/50" /> Property Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {projectTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => updateFilter("projectType", t)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-300 ${
                      filters.projectType === t
                        ? "bg-primary/10 border-primary/25 text-primary"
                        : "bg-white/[0.02] border-white/[0.04] text-white/40 hover:text-white/60 hover:border-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
