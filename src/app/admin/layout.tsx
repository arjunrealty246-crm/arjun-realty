"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FolderOpen, Building2, Image, FileText,
  MessageSquare, HelpCircle, PhoneCall, Search, LogOut,
  ChevronLeft, Menu, X, Home, Settings, Users,
} from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/builders", label: "Builders", icon: Building2 },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/brochures", label: "Brochures", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/contact", label: "Contact Settings", icon: PhoneCall },
  { href: "/admin/seo", label: "SEO Settings", icon: Search },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthenticated(false);
      return;
    }
    fetch("/api/auth/me")
      .then((r) => {
        if (r.ok) setAuthenticated(true);
        else { setAuthenticated(false); router.push("/admin/login"); }
      })
      .catch(() => { setAuthenticated(false); router.push("/admin/login"); });
  }, [isLoginPage, pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (isLoginPage) return <>{children}</>;

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-charcoal-dark flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-charcoal-dark flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0d0d1a] border-r border-white/[0.04] transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.04] shrink-0">
          {sidebarOpen && (
            <Link href="/admin" className="text-lg font-bold tracking-tight">
              <span className="text-primary">Arjun</span>
              <span className="text-white/70"> Admin</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-4 border-t border-white/[0.04] pt-3 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all"
          >
            <Home className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.06] transition-all"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
