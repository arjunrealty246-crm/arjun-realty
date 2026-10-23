import { deepMerge, resolveBundle } from "../src/i18n/content/merge";
import type { ContentBundle } from "../src/i18n/content/types";

const base = {
  a: "EN a",
  b: { c: "EN c", d: "EN d" },
  list: ["x", "y"],
  n: 1,
};

const override = {
  b: { c: "TE c" },
  list: ["X"],
};

const merged = deepMerge(base, override as never);
console.log("deepMerge result:", JSON.stringify(merged));
console.log("  nested override applied   :", merged.b.c === "TE c");
console.log("  missing key falls back    :", merged.b.d === "EN d");
console.log("  array replaced wholesale   :", JSON.stringify(merged.list) === JSON.stringify(["X"]));
console.log("  untouched primitive        :", merged.a === "EN a" && merged.n === 1);
console.log("  source object not mutated  :", base.b.c === "EN c" && base.list.length === 2);

const bundle: ContentBundle<typeof base> = {
  key: "t",
  path: "/t",
  en: base,
  overrides: { te: override as never, hi: {} as never },
  status: { te: "partial", hi: "english-only" },
};

const te = resolveBundle(bundle, "te");
const hi = resolveBundle(bundle, "hi");
const en = resolveBundle(bundle, "en");
console.log("\nresolveBundle:");
console.log("  en -> source object        :", en === base);
console.log("  te -> override merged      :", te.b.c === "TE c");
console.log("  hi -> english fallback     :", hi.b.c === "EN c" && hi.a === "EN a");
console.log("  hi status labelled         :", bundle.status.hi === "english-only");
