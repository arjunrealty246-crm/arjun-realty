import type { LeadInput, LeadSource } from "./leads";

export type { LeadSource };

export interface SubmitLeadResult {
  ok: boolean;
  deduplicated?: boolean;
  id?: string;
  error?: string;
}

const inFlight = new Set<string>();
const IN_FLIGHT_MS = 8000;

function key(source: string, mobile: string): string {
  return `${source}|${mobile}`;
}

export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  const mobile = typeof input.mobile === "string" ? input.mobile.replace(/\D/g, "") : "";
  const source = typeof input.source === "string" ? input.source : "";
  const k = key(source, mobile);

  if (inFlight.has(k)) {
    return { ok: true, deduplicated: true };
  }
  inFlight.add(k);
  setTimeout(() => inFlight.delete(k), IN_FLIGHT_MS);

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, error: data?.error || `Request failed (${res.status})` };
    }
    const data = (await res.json().catch(() => ({ ok: true }))) as {
      ok?: boolean;
      deduplicated?: boolean;
      id?: string;
    };
    return { ok: true, deduplicated: !!data.deduplicated, id: data.id };
  } catch {
    return { ok: false, error: "Network error" };
  }
}
