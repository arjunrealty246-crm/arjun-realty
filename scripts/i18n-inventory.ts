import { getInventory, getInventorySummary } from "@/i18n/content";
import type { InventoryItem } from "@/i18n/content";

function pad(value: string | number, width: number): string {
  const s = String(value);
  return s.length >= width ? s : s + " ".repeat(width - s.length);
}

const priorityLabels: Record<number, string> = {
  0: "P0 (core)",
  1: "P1 (projects/NRI/contact)",
  2: "P2 (high-value)",
  3: "P3 (remaining)",
};

function main() {
  const items = getInventory();
  const summary = getInventorySummary(items);

  console.log("\n=== TRANSLATION INVENTORY ===\n");
  console.log(`Total content items:            ${summary.total}`);
  console.log(`With te/hi route available:     ${summary.localizedRouteCapable}`);
  console.log(`English-only routes (no te/hi): ${summary.englishOnlyRoutes}`);

  console.log("\n--- Status (counted per locale: te + hi = 2x items) ---");
  console.log(`Telugu  complete:     ${summary.teComplete}`);
  console.log(`Hindi   complete:     ${summary.hiComplete}`);
  console.log(`Partially translated: ${summary.partial}`);
  console.log(`Needs review:         ${summary.needsReview}`);
  console.log(`English-only (per locale): te=${summary.byStatus["english-only"] / 2}, hi=${summary.byStatus["english-only"] / 2}`);
  console.log(`Status bucket totals: ${JSON.stringify(summary.byStatus)}`);

  console.log("\n--- Pending translation by priority (any locale incomplete) ---");
  for (const p of [0, 1, 2, 3] as const) {
    console.log(`  ${pad(priorityLabels[p], 26)} ${summary.pendingByPriority[p]}`);
  }

  console.log("\n--- By family (total / pending) ---");
  for (const [family, v] of Object.entries(summary.byFamily)) {
    console.log(`  ${pad(family, 12)} ${pad(v.total, 4)} / ${v.pending}`);
  }

  console.log("\n--- P0 + P1 items ---");
  console.log(`${pad("PATH", 44)} ${pad("FAMILY", 9)} ${pad("te", 13)} ${pad("hi", 13)} ROUTE`);
  for (const item of items.filter((i: InventoryItem) => i.priority <= 1)) {
    console.log(
      `${pad(item.path, 44)} ${pad(item.family, 9)} ${pad(item.status.te ?? "-", 13)} ${pad(item.status.hi ?? "-", 13)} ${item.hasLocalizedRoute ? "yes" : "no"}`
    );
  }

  console.log(`\n=== END (${items.length} items) ===\n`);
}

main();
