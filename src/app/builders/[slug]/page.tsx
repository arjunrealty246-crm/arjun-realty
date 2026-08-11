import { notFound } from "next/navigation";
import Link from "next/link";
import { Building2, Calendar, Shield, ArrowRight, CheckCircle, MapPin, Ruler, Banknote } from "lucide-react";
import { builders, getBuilderBySlug } from "@/data/builders";
import { projects } from "@/data/projects";
import siteConfig from "@/config/site";

export function generateStaticParams() {
  return builders.map((b) => ({ slug: b.slug }));
}

export default async function BuilderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const builder = getBuilderBySlug(slug);
  if (!builder) notFound();

  const builderProjects = projects.filter((p) => p.builder === builder.id);

  return (
    <>
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-xs">
            <Link href="/" className="flex items-center gap-1 text-white/25 hover:text-primary/60 transition-colors duration-300">
              <Building2 className="h-3 w-3" /> Home
            </Link>
            <span className="text-white/10">/</span>
            <Link href="/builders" className="text-white/25 hover:text-primary/60 transition-colors duration-300">
              Builders
            </Link>
            <span className="text-white/10">/</span>
            <span className="text-white/50 truncate max-w-[200px]">{builder.name}</span>
          </nav>

          <div className="flex items-start gap-6 mb-8">
            <div className="h-20 w-20 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <Building2 className="h-9 w-9 text-primary" />
            </div>
            <div>
              <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-2">
                {builder.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {builder.established && (
                  <span className="flex items-center gap-1.5 text-white/40">
                    <Calendar className="h-3.5 w-3.5 text-primary/60" />
                    Est. {builder.established}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-white/40">
                  <Building2 className="h-3.5 w-3.5 text-primary/60" />
                  {builder.projectCount} Project{builder.projectCount !== 1 ? "s" : ""}
                </span>
                {builder.projectTypes && (
                  <span className="flex items-center gap-1.5 text-white/40">
                    <MapPin className="h-3.5 w-3.5 text-primary/60" />
                    {builder.projectTypes}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-3xl mb-10">
            {builder.description}
          </p>

          {builder.highlights && (
            <div className="flex flex-wrap gap-3 mb-12">
              {builder.highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/[0.06] border border-primary/[0.1] text-[11px] text-primary/60 font-medium">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
            Projects by {builder.name}
          </h2>

          {builderProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builderProjects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <div className="glass-card rounded-[1.25rem] p-6 group hover:bg-white/[0.02] transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-wider">
                        {p.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass text-[10px] font-medium text-white/60">
                        <Shield className="h-2.5 w-2.5 text-emerald-400" />
                        {p.approval.split("·")[0].trim()}
                      </span>
                    </div>
                    <h3 className="text-[16px] font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight mb-2">
                      {p.name}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-white/35 mb-3">
                      <MapPin className="h-3 w-3 text-primary/60" /> {p.location}
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.04]">
                      <span className="flex items-center gap-1 text-[11px] text-white/40">
                        <Ruler className="h-3 w-3 text-primary/50" />
                        {p.plotSizes}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/40">
                        <Banknote className="h-3 w-3 text-primary/50" />
                        {p.startingPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-10 text-center">
              <p className="text-white/40">No projects listed yet. Contact us for more information.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <a
              href={`${siteConfig.links.wa}?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(builder.name)}%20projects`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
            >
              Enquire About {builder.name} Projects <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
