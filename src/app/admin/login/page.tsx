"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Mail, Lock, LogIn, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }
      router.push("/admin");
    } catch {
      setError("Connection failed. Check your network.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.04] -left-48 -top-48" />
      <div className="ambient-orb w-[400px] h-[400px] bg-gold/[0.02] -right-32 -bottom-32" />

      <Link href="/" className="flex items-center gap-3 mb-12">
        <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight">
            <span className="text-primary">Arjun</span>
            <span className="text-white/70"> Realty</span>
          </p>
          <p className="text-[10px] text-white/20 uppercase tracking-wider">Admin Panel</p>
        </div>
      </Link>

      <div className="w-full max-w-md glass-card-elevated rounded-2xl p-8 lg:p-10">
        <div className="text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-white/30 mt-1">Sign in to manage your real estate portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all"
                placeholder="admin@arjunrealty.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/10 transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/15 hover:text-white/40 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><LogIn className="h-4 w-4" /> Sign In</>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/20 hover:text-primary/60 transition-colors">
            <ArrowRight className="h-3 w-3 rotate-180" /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
