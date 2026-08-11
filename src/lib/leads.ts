import { connectDB } from "./mongodb";
import LeadModel from "./models/Lead";

const BUSINESS_PHONE = "919642333246";

export const LEAD_SOURCES = [
  "Contact Form",
  "Callback",
  "Project Enquiry",
  "Site Visit",
  "WhatsApp Enquiry",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export interface LeadInput {
  name?: string;
  mobile?: string;
  whatsapp?: string;
  email?: string;
  project?: string;
  source?: LeadSource;
  leadType?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  country?: string;
  investmentBudget?: string;
}

const MAX_LEN: Record<string, number> = {
  name: 120,
  project: 200,
  source: 60,
  leadType: 60,
  message: 3000,
  preferredDate: 40,
  preferredTime: 40,
  country: 60,
  investmentBudget: 120,
  email: 254,
};

const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

function cleanString(value: unknown, field: string): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!trimmed) return undefined;
  const max = MAX_LEN[field] ?? 200;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export function normalizePhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const digits = value.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ValidatedLead extends LeadInput {
  name: string;
  mobile: string;
  source: LeadSource;
}

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

export function validateLeadInput(
  raw: unknown
): { ok: true; data: ValidatedLead } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, error: "Invalid payload" };
  }
  const body = raw as Record<string, unknown>;

  const name = cleanString(body.name, "name");
  const mobile = normalizePhone(body.mobile);
  const whatsapp = normalizePhone(body.whatsapp);
  const email = cleanString(body.email, "email");
  const source = cleanString(body.source, "source");

  if (!name) return { ok: false, error: "Name is required" };
  if (!mobile) return { ok: false, error: "A valid phone number is required" };
  if (mobile === BUSINESS_PHONE) {
    return { ok: false, error: "Invalid phone number" };
  }
  if (whatsapp === BUSINESS_PHONE) {
    return { ok: false, error: "Invalid WhatsApp number" };
  }
  if (email && !isValidEmail(email)) {
    return { ok: false, error: "A valid email address is required" };
  }
  if (!source) return { ok: false, error: "Source is required" };
  if (!LEAD_SOURCES.includes(source as LeadSource)) {
    return { ok: false, error: "Unknown lead source" };
  }

  const sourceTyped = source as LeadSource;

  return {
    ok: true,
    data: {
      name,
      mobile,
      whatsapp: whatsapp ?? undefined,
      email,
      project: cleanString(body.project, "project"),
      source: sourceTyped,
      leadType: cleanString(body.leadType, "leadType"),
      message: cleanString(body.message, "message"),
      preferredDate: cleanString(body.preferredDate, "preferredDate"),
      preferredTime: cleanString(body.preferredTime, "preferredTime"),
      country: cleanString(body.country, "country"),
      investmentBudget: cleanString(body.investmentBudget, "investmentBudget"),
    },
  };
}

export async function captureLead(raw: unknown): Promise<
  | { ok: true; deduplicated: boolean; lead: { id: string; mobile: string; source: string } }
  | { ok: false; status: number; error: string }
> {
  const validated = validateLeadInput(raw);
  if (!validated.ok) return { ok: false, status: 400, error: validated.error };

  const data = validated.data;
  await connectDB();

  const cutoff = new Date(Date.now() - DEDUPE_WINDOW_MS);
  const dedupeMatch: Record<string, unknown> = {
    mobile: data.mobile,
    source: data.source,
    createdAt: { $gte: cutoff },
  };
  if (data.project) dedupeMatch.project = data.project;
  const existing = await LeadModel.findOne(dedupeMatch).sort({ createdAt: -1 }).lean();

  if (existing) {
    return {
      ok: true,
      deduplicated: true,
      lead: { id: String(existing._id), mobile: data.mobile, source: data.source },
    };
  }

  try {
    const created = await LeadModel.create(data);
    return {
      ok: true,
      deduplicated: false,
      lead: { id: String(created._id), mobile: data.mobile, source: data.source },
    };
  } catch (err: unknown) {
    return {
      ok: false,
      status: 500,
      error: err instanceof Error ? err.message : "Failed to capture lead",
    };
  }
}

export async function listLeads() {
  await connectDB();
  return LeadModel.find().sort({ createdAt: -1 }).limit(500).lean();
}
