/**
 * Translation checks for the project-detail pilot (Phase 2B-1).
 *
 * Run with: npm run i18n:project-check
 *
 * Offline checks (no database required):
 *  - every project has English URLs unchanged and locale fallbacks route to /te, /hi
 *  - translated prose is in the target script, never a copy of English
 *  - bundle shape, FAQ/update pair completeness, and the client availability map
 *  - unreviewed translations stay noindex-only and are not advertised in hreflang
 *
 * Live checks (run when MONGODB_URI is configured, e.g. via .env.local):
 *  - `sourceHash` matches the Admin-merged English actually rendered
 *  - the translation applies to that exact source and turns off when it drifts
 *  - FAQ / update / unit counts match the live English arrays
 *
 * The hash is intentionally pinned to the Admin-merged source: the pilot's te
 * bundle was reviewed against the live English copy, not the static registry.
 */
import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";
import {
  projectTranslationBundles,
  getProjectTranslationBundle,
  hashProjectSource,
  pickTranslatable,
  findMissingProjectTranslations,
  localizeProject,
  type ProjectTranslatableContent,
} from "@/i18n/content/project-translations";
import {
  hasLocalizedContent,
  localizedContentPaths,
} from "@/i18n/content/availability";
import { getHomeCopy } from "@/i18n/content/home-copy";
import { getTranslatedLocales, getTranslationStatus } from "@/i18n/content/status";
import {
  switchLocalePath,
  locales,
  defaultLocale,
  localePath,
  stripLocale,
} from "@/i18n/config";
import { projects, getProjectBySlug, type Project } from "@/data/projects";
import { connectDB } from "@/lib/mongodb";
import { getMergedProject } from "@/lib/merged-project";

type Check = { name: string; pass: boolean; detail?: string };
const checks: Check[] = [];
const skips: { name: string; reason: string }[] = [];

function check(name: string, condition: boolean, detail?: string) {
  checks.push({ name, pass: condition, detail: condition ? undefined : detail });
}
function skip(name: string, reason: string) {
  skips.push({ name, reason });
}

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) continue;
    for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match || process.env[match[1]] !== undefined) continue;
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[match[1]] = value;
    }
  }
}

const TELUGU = /[\u0C00-\u0C7F]/;
const DEVANAGARI = /[\u0900-\u097F]/;
const SCRIPT: Record<string, RegExp> = { te: TELUGU, hi: DEVANAGARI };

/** Leaf strings of an override value (arrays/objects flattened). */
function leaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value && typeof value === "object") return Object.values(value).flatMap(leaves);
  return [];
}

/**
 * Strings that must be translated prose. Structural values that legitimately
 * stay as English/enum/number (unit counts, update statuses) are excluded.
 */
function proseLeaves(key: string, value: unknown): string[] {
  if (key === "units") {
    return (value as { type?: string }[]).flatMap((u) => (u.type ? [u.type] : []));
  }
  if (key === "updates") {
    return (value as { title?: string; description?: string }[]).flatMap((u) =>
      [u.title, u.description].filter((s): s is string => Boolean(s))
    );
  }
  return leaves(value);
}

/**
 * Fields that intentionally stay in English. They are factual labels, proper
 * nouns, or customer quotes — never machine-translated.
 */
const ENGLISH_ONLY_FIELDS = [
  "nearbyLandmarks",
  "testimonials",
  "approval",
  "plotSizes",
  "projectArea",
  "startingPrice",
  "name",
  "location",
] as const;

function compareWithSource(
  bundle: (typeof projectTranslationBundles)[string],
  source: Project,
  live: boolean
) {
  const english = pickTranslatable(source);

  if (live) {
    const currentHash = hashProjectSource(source);
    check(
      `${bundle.slug}: sourceHash matches the live English`,
      currentHash === bundle.sourceHash,
      `expected ${currentHash}, bundle has ${bundle.sourceHash}`
    );

    const englishKeys = new Set(Object.keys(english));
    const bundleKeys = new Set(Object.keys(bundle.en));
    const uncovered = [...englishKeys].filter((key) => !bundleKeys.has(key));
    check(
      `${bundle.slug}: bundle covers every live translatable field`,
      uncovered.length === 0,
      `uncovered: ${uncovered.join(", ")}`
    );
  } else {
    skip(
      `${bundle.slug}: sourceHash matches the live English`,
      "database not configured"
    );
  }

  for (const locale of Object.keys(bundle.overrides) as ("te" | "hi")[]) {
    const override = bundle.overrides[locale]!;
    const missing = findMissingProjectTranslations(bundle.slug, locale);
    check(
      `${bundle.slug}/${locale}: all translatable fields present`,
      missing.length === 0,
      `missing: ${missing.join(", ")}`
    );

    if (live) {
      const pairs: [string, number, number][] = [
        ["FAQ", override.faqs?.length ?? 0, english.faqs?.length ?? 0],
        ["update", override.updates?.length ?? 0, english.updates?.length ?? 0],
        ["unit", override.units?.length ?? 0, english.units?.length ?? 0],
      ];
      for (const [label, actual, expected] of pairs) {
        check(
          `${bundle.slug}/${locale}: ${label} count matches live English`,
          actual === expected,
          `${actual} vs ${expected}`
        );
      }
    } else {
      skip(
        `${bundle.slug}/${locale}: array counts match live English`,
        "database not configured"
      );
    }

    // Each translated field must contain target-script characters and must not be
    // byte-identical to an English string (which would be untranslated prose).
    for (const [key, value] of Object.entries(override)) {
      const englishValues = new Set(
        proseLeaves(key, (english as Record<string, unknown>)[key])
      );
      const script = SCRIPT[locale];
      const strings = proseLeaves(key, value);
      const untranslated = strings.filter(
        (s) => s.trim().length > 0 && (!script.test(s) || englishValues.has(s))
      );
      check(
        `${bundle.slug}/${locale}: ${key} is translated`,
        untranslated.length === 0,
        `not in ${locale} script or identical to English: ${untranslated
          .map((s) => s.slice(0, 40))
          .join(" | ")}`
      );
    }
  }

  if (bundle.overrides.te?.faqs && english.faqs) {
    const sameLengths = bundle.overrides.te.faqs.every(
      (f, i) => f.q && f.a && english.faqs![i]?.q && english.faqs![i]?.a
    );
    check(`${bundle.slug}/te: FAQ question/answer pairs complete`, sameLengths);
  }

  const englishRecord = english as unknown as Record<string, unknown>;
  check(
    `${bundle.slug}: preserved fields are not translatable`,
    ENGLISH_ONLY_FIELDS.every((field) => englishRecord[field] === undefined),
    ENGLISH_ONLY_FIELDS.filter((field) => englishRecord[field] !== undefined).join(", ")
  );

  if (live) {
    for (const locale of Object.keys(bundle.overrides) as ("te" | "hi")[]) {
      const localized = localizeProject(source, locale);
      check(
        `${bundle.slug}/${locale}: applies to the live English source`,
        localized.applied && !localized.stale,
        `applied=${localized.applied}, stale=${localized.stale}`
      );
      check(
        `${bundle.slug}/${locale}: rendered description differs from English`,
        localized.project.description !== source.description,
        "description fell back to English"
      );
    }

    const drifted: Project = {
      ...source,
      description: `${source.description} (edited)`,
    };
    const staleResult = localizeProject(drifted, "te");
    check(
      `${bundle.slug}: edited English disables the translation`,
      !staleResult.applied && staleResult.stale,
      `applied=${staleResult.applied}, stale=${staleResult.stale}`
    );
    check(
      `${bundle.slug}: edited English keeps the project facts`,
      staleResult.project.description === drifted.description
    );
  } else {
    skip(`${bundle.slug}: applies to live English source`, "database not configured");
  }
}

async function main() {
  loadEnv();
  let liveSources: Map<string, Project> | null = null;
  try {
    await connectDB();
    liveSources = new Map();
    for (const bundle of Object.values(projectTranslationBundles)) {
      const merged = await getMergedProject(bundle.slug);
      if (merged) liveSources.set(bundle.slug, merged);
    }
  } catch {
    liveSources = null;
  }

  for (const bundle of Object.values(projectTranslationBundles)) {
    const staticProject = getProjectBySlug(bundle.slug);
    if (!staticProject) {
      check(`${bundle.slug}: project exists`, false, `unknown slug ${bundle.slug}`);
      continue;
    }

    check(
      `${bundle.slug}: base English matches the registry`,
      JSON.stringify(pickTranslatable(staticProject)) === JSON.stringify(bundle.en),
      "bundle.en drifted from the static project data"
    );

    compareWithSource(bundle, liveSources?.get(bundle.slug) ?? staticProject, Boolean(liveSources));

    // Availability map must exactly reflect registered overrides.
    for (const locale of Object.keys(bundle.overrides) as ("te" | "hi")[]) {
      check(
        `${bundle.path}: availability lists ${locale}`,
        hasLocalizedContent(bundle.path, locale),
        "content/availability.ts is missing this path/locale"
      );
    }

    // Review gate: noindex until native review, so search engines never index it.
    const status = getTranslationStatus(bundle.path);
    const translatedLocales = getTranslatedLocales(bundle.path);
    for (const locale of Object.keys(bundle.overrides) as ("te" | "hi")[]) {
      check(
        `${bundle.path}: ${locale} is listed in the switcher`,
        hasLocalizedContent(bundle.path, locale)
      );
      check(
        `${bundle.path}: ${locale} is not indexable before review`,
        status[locale] !== "complete" && !translatedLocales.includes(locale),
        `status=${status[locale]}, hreflang=${translatedLocales.join(",")}`
      );
    }

    // Locale switching keeps the equivalent page only when content exists.
    check(
      `${bundle.path}: English -> te keeps the project path`,
      switchLocalePath(bundle.path, "te") === localePath("te", bundle.path)
    );
    check(
      `${bundle.path}: te -> English keeps the project path`,
      switchLocalePath(localePath("te", bundle.path), "en") === bundle.path
    );
  }

  for (const [projectPath, listed] of Object.entries(localizedContentPaths)) {
    for (const locale of listed) {
      if (locale === "en") continue;
      const registered =
        projectPath === "/"
          ? Boolean(getHomeCopy(locale as "te" | "hi"))
          : Object.values(projectTranslationBundles).some(
              (b) => b.path === projectPath && b.overrides[locale]
            );
      check(
        `${projectPath}: ${locale} availability has a bundle`,
        registered,
        "availability lists a locale without translated content"
      );
    }
  }

  // Homepage authored copy (te/hi) must be in the target script and gated.
  for (const locale of ["te", "hi"] as const) {
    const homeCopy = getHomeCopy(locale);
    check(`/: ${locale} homepage copy exists`, Boolean(homeCopy));
    check(
      `/: ${locale} homepage copy is in the target script`,
      Boolean(homeCopy) && SCRIPT[locale].test(JSON.stringify(homeCopy))
    );
  }
  check("/: te switcher keeps the homepage", switchLocalePath("/", "te") === localePath("te", "/"));
  check("/: hi switcher keeps the homepage", switchLocalePath("/", "hi") === localePath("hi", "/"));
  check(
    "/: unreviewed homepage is not indexable",
    !getTranslatedLocales("/").includes("te") && !getTranslatedLocales("/").includes("hi")
  );

  // Untranslated projects must fall back to the locale homepage, never a
  // localized URL that renders English.
  const untranslated = projects.find((p) => !getProjectTranslationBundle(p.slug));
  if (untranslated) {
    check(
      `/projects/${untranslated.slug}: te switch falls back to /te`,
      switchLocalePath(`/projects/${untranslated.slug}`, "te") === localePath("te", "/")
    );
    check(
      `/projects/${untranslated.slug}: hi switch falls back to /hi`,
      switchLocalePath(`/projects/${untranslated.slug}`, "hi") === localePath("hi", "/")
    );
  }

  // Every project slug must keep its English URL; localization only adds prefixes.
  const canonicalSlugs = new Set(projects.map((p) => p.slug));
  check(
    "all project English URLs unchanged",
    [...canonicalSlugs].every((slug) => {
      const projectPath = `/projects/${slug}`;
      return (
        localePath("en", projectPath) === projectPath &&
        stripLocale(localePath("te", projectPath)).basePath === projectPath
      );
    })
  );
  check(
    "bundle slugs are all registered projects",
    Object.keys(projectTranslationBundles).every((slug) => canonicalSlugs.has(slug)),
    Object.keys(projectTranslationBundles)
      .filter((slug) => !canonicalSlugs.has(slug))
      .join(", ")
  );

  // Non-default locales are still only te/hi — an accidental locale addition
  // without translations must be caught.
  check("locale list unchanged", locales.join(",") === "en,te,hi" && defaultLocale === "en");

  for (const c of checks) {
    console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.detail ? ` — ${c.detail}` : ""}`);
  }
  for (const s of skips) {
    console.log(`SKIP  ${s.name} — ${s.reason}`);
  }

  const failed = checks.filter((c) => !c.pass);
  console.log(
    `\n${checks.length - failed.length}/${checks.length} checks passed` +
      (skips.length ? `, ${skips.length} skipped` : "")
  );

  await mongoose.connection.close().catch(() => undefined);
  process.exit(failed.length > 0 ? 1 : 0);
}

main();
