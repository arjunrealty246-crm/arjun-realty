"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, IndianRupee, Clock, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import siteConfig from "@/config/site";
import SectionLabel from "./SectionLabel";
import { calculator } from "@/data/content";

export default function InvestmentCalculator() {
  const [investment, setInvestment] = useState(50);
  const [years, setYears] = useState(5);
  const [appreciation, setAppreciation] = useState(18);

  const result = useMemo(() => {
    const investedAmount = investment * 100000;
    const futureValue = investedAmount * Math.pow(1 + appreciation / 100, years);
    const returns = futureValue - investedAmount;
    const cagr = ((futureValue / investedAmount) ** (1 / years) - 1) * 100;
    return { investedAmount, futureValue, returns, cagr };
  }, [investment, years, appreciation]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden bg-section-alt">
      <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.03] -left-48 top-1/3" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-14 lg:mb-20">
          <SectionLabel>{calculator.heading}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.1]">
            See Your <span className="text-gradient">Wealth Grow</span>
          </h2>
          <p className="mt-4 text-white/30 max-w-lg mx-auto text-[0.9rem] leading-relaxed">
            {calculator.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left: Controls */}
          <ScrollReveal>
            <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calculator className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="text-[15px] font-bold text-white tracking-[-0.01em]">Your Investment</h3>
              </div>

              {/* Investment Amount */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[12px] text-white/40 font-medium uppercase tracking-wider">Investment Amount</label>
                  <span className="text-[14px] font-bold text-gradient">{investment} Lakh</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="range-premium"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-white/20">10L</span>
                  <span className="text-[10px] text-white/20">500L</span>
                </div>
              </div>

              {/* Time Period */}
              <div className="mb-7">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[12px] text-white/40 font-medium uppercase tracking-wider">Time Horizon</label>
                  <span className="text-[14px] font-bold text-gradient">{years} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="range-premium"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-white/20">1 yr</span>
                  <span className="text-[10px] text-white/20">20 yrs</span>
                </div>
              </div>

              {/* Appreciation Rate */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[12px] text-white/40 font-medium uppercase tracking-wider">Expected Appreciation</label>
                  <span className="text-[14px] font-bold text-gradient">{appreciation}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={35}
                  step={1}
                  value={appreciation}
                  onChange={(e) => setAppreciation(Number(e.target.value))}
                  className="range-premium"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-white/20">8%</span>
                  <span className="text-[10px] text-white/20">35%</span>
                </div>
              </div>

              <p className="text-[10px] text-white/15 mt-4 text-center">
                Based on historical Hyderabad appreciation rates of 12–25% annually in prime corridors.
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Results */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-5 h-full">
              {/* Future Value */}
              <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10 relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
                <p className="text-[11px] text-white/35 uppercase tracking-[0.2em] font-medium mb-3">Projected Future Value</p>
                <div className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gradient tracking-tight leading-none mb-2">
                  {formatCurrency(result.futureValue)}
                </div>
                <p className="text-[12px] text-white/25">in {years} years at {appreciation}% p.a.</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-5 flex-1">
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                    <IndianRupee className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">You Invest</p>
                  <p className="text-lg font-bold text-white/80">{formatCurrency(result.investedAmount)}</p>
                </div>
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Returns</p>
                  <p className="text-lg font-bold text-gradient">+{formatCurrency(result.returns)}</p>
                </div>
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                    <Clock className="h-4 w-4 text-gold" />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Wealth Multiple</p>
                  <p className="text-lg font-bold text-white/80">{(result.futureValue / result.investedAmount).toFixed(1)}x</p>
                </div>
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Effective CAGR</p>
                  <p className="text-lg font-bold text-white/80">{result.cagr.toFixed(1)}%</p>
                </div>
              </div>

              {/* CTA */}
              <a
                href={`${siteConfig.links.wa}?text=Hi%20Arjun%20Realty%2C%20I%20used%20the%20investment%20calculator%20and%20would%20like%20to%20discuss%20my%20options`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white glow-primary-strong"
              >
                Get a Personalized Plan <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
