"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileText, Loader2, Lock, X } from "lucide-react";
import siteConfig from "@/config/site";
import { submitLead } from "@/lib/lead-client";
import styles from "./DocumentAccessGate.module.css";

export interface DocumentAccessRequest {
  /** Shown to the visitor, e.g. "HMDA Final Layout Approval". */
  documentName: string;
  /** Shown to the visitor, taken from the project being viewed. */
  projectName: string;
  /** Runs the caller's own view/download action once access is granted. */
  grant: () => void;
  /** Optional extra context stored on the lead record. */
  note?: string;
  /** Overrides for non-document gated items (video, availability, ...). */
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export interface DocumentAccessGateProps {
  request: DocumentAccessRequest | null;
  onClose: () => void;
}

const GRANTED_KEY = "arjun:doc-access:";

function grantedKey(request: DocumentAccessRequest): string {
  return `${GRANTED_KEY}${request.projectName}|${request.documentName}`;
}

function readGranted(key: string): boolean {
  try {
    return window.sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function markGranted(key: string): void {
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    /* storage unavailable - access is simply re-requested next time */
  }
}

/* ── Shared helpers for the caller's own document action ────────────────────
   These reproduce the exact behaviour the links had before the gate existed, so
   a granted document opens/downloads through the original code path. */

/** View action: same as a `target="_blank"` link. */
export function openDocumentInNewTab(url: string): void {
  window.open(url, "_blank", "noopener");
}

/** Download action: same as a `download` link. */
export function downloadDocument(url: string, filename = ""): void {
  const a = document.createElement("a");
  a.href = url;
  if (filename) a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function buildLeadMessage(
  documentName: string,
  pageUrl: string,
  note?: string
): string {
  return [`Requested Document: ${documentName}`, `Page URL: ${pageUrl}`, note]
    .filter(Boolean)
    .join("\n");
}

function buildWhatsAppText(
  name: string,
  phone: string,
  projectName: string,
  documentName: string,
  pageUrl: string
): string {
  return [
    "New Website Lead",
    `Name: ${name}`,
    `Phone/WhatsApp: ${phone}`,
    `Interested Project: ${projectName}`,
    `Requested Document: ${documentName}`,
    `Page URL: ${pageUrl}`,
  ].join("\n");
}

/**
 * Page-level wiring helper. Holds the pending request so a project page only
 * has to render one gate and call `requestDocument(name, grant)` from whatever
 * control opens a protected document.
 *
 * The "already unlocked this session" shortcut deliberately runs here, inside
 * the originating click, instead of from an effect: `grant()` normally calls
 * `window.open`, and a browser only honours that within a user activation. From
 * an effect the popup blocker silently discarded it and the gate closed doing
 * nothing, so a second click on the same document never opened it.
 */
export function useDocumentAccess(projectName: string) {
  const [request, setRequest] = useState<DocumentAccessRequest | null>(null);

  const requestDocument = useCallback(
    (input: Omit<DocumentAccessRequest, "projectName">) => {
      const next: DocumentAccessRequest = { ...input, projectName };

      if (readGranted(grantedKey(next))) {
        try {
          next.grant();
        } catch (err) {
          console.error("DocumentAccessGate: document action failed", err);
        }
        return;
      }

      setRequest(next);
    },
    [projectName]
  );

  const closeDocumentAccess = useCallback(() => setRequest(null), []);

  return { request, requestDocument, closeDocumentAccess };
}

interface DocumentAccessApi {
  projectName: string;
  requestDocument: (input: Omit<DocumentAccessRequest, "projectName">) => void;
}

const DocumentAccessContext = createContext<DocumentAccessApi | null>(null);

/**
 * Publishes the page's single gate to every descendant, so shared sections
 * (layout, document centre, phases, gallery) can route their own links through
 * it rather than each rendering a gate of their own. Rendered once per project
 * page, next to the `<DocumentAccessGate>` itself.
 */
export function DocumentAccessProvider({
  requestDocument,
  projectName,
  children,
}: {
  requestDocument: DocumentAccessApi["requestDocument"];
  projectName: string;
  children: React.ReactNode;
}) {
  const value = useMemo<DocumentAccessApi>(
    () => ({ projectName, requestDocument }),
    [projectName, requestDocument]
  );
  return (
    <DocumentAccessContext.Provider value={value}>
      {children}
    </DocumentAccessContext.Provider>
  );
}

/** The page's gate, or `null` when rendered outside a gated project page. */
export function useDocumentAccessApi(): DocumentAccessApi | null {
  return useContext(DocumentAccessContext);
}

/**
 * Wraps a section's existing link action so it runs only after the gate has
 * captured the lead. Off a gated project page this returns a pass-through, so
 * the link keeps working exactly as before.
 */
export function useGatedDocumentLink() {
  const api = useDocumentAccessApi();

  return useCallback(
    (documentName: string, action: () => void) =>
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!api) return;
        event.preventDefault();
        api.requestDocument({ documentName, grant: action });
      },
    [api]
  );
}


/**
 * Global lead-capture gate for protected project documents.
 *
 * Rendered once per project page with a `request` describing which document the
 * visitor asked for. The page supplies `grant()`, so the document is opened or
 * downloaded by exactly the same code path it used before the gate existed.
 */
export default function DocumentAccessGate({
  request,
  onClose,
}: DocumentAccessGateProps) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Reset the form whenever a different document is requested.
  useEffect(() => {
    if (!request) return;
    setStatus("idle");
    setError("");
  }, [request]);

  useEffect(() => {
    if (!request) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [request, onClose]);

  const handleChange = useCallback(
    (field: "name" | "phone") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (error) setError("");
    },
    [error]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request || status === "submitting") return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) {
      setError("Please enter your full name.");
      nameRef.current?.focus();
      return;
    }
    if (digits.length < 10 || digits.length > 15) {
      setError("Please enter a valid phone / WhatsApp number.");
      phoneRef.current?.focus();
      return;
    }

    setError("");
    setStatus("submitting");

    const pageUrl = window.location.href;

    // Fire-and-forget: the lead is recorded by the existing /api/leads pipeline
    // (deduped per mobile + source + project server-side).
    void submitLead({
      name,
      mobile: phone,
      whatsapp: phone,
      project: request.projectName,
      source: "Project Enquiry",
      leadType: "Document Request",
      message: buildLeadMessage(request.documentName, pageUrl, request.note),
    });

    // The caller's own open/download runs first and still inside the submit
    // click, so it keeps the browser's single popup allowance. A failed step is
    // never marked as unlocked, so the next click retries instead of silently
    // doing nothing.
    let opened = true;
    try {
      request.grant();
    } catch (err) {
      opened = false;
      console.error("DocumentAccessGate: document action failed", err);
    }
    if (opened) markGranted(grantedKey(request));

    // Existing WhatsApp handoff, unchanged and still on the same configured link.
    window.open(
      `${siteConfig.links.wa}?text=${encodeURIComponent(
        buildWhatsAppText(
          name,
          phone,
          request.projectName,
          request.documentName,
          pageUrl
        )
      )}`,
      "_blank",
      "noopener"
    );

    setForm({ name: "", phone: "" });

    if (!opened) {
      setStatus("idle");
      setError("That document could not be opened automatically. Please try again.");
      return;
    }

    setStatus("done");
    window.setTimeout(() => {
      setStatus("idle");
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {request && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.overlay}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="document-access-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={styles.card}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className={styles.close}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "done" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 id="document-access-title" className={styles.successTitle}>
                  Document Unlocked
                </h3>
                <p className={styles.successText}>
                  Your document is opening now. We&apos;ve also passed your
                  details to our team on WhatsApp for any follow-up.
                </p>
              </div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={false}
                className={styles.form}
                noValidate
              >
                <span className={styles.badge}>
                  <Lock className="h-3 w-3" /> Protected Document
                </span>
                <h3 id="document-access-title" className={styles.title}>
                  {request.title ?? "Get Access to This Document"}
                </h3>
                <p className={styles.sub}>
                  {request.subtitle ??
                    "Share your details once and the document opens instantly."}
                </p>

                <dl className={styles.meta}>
                  <div className={styles.metaRow}>
                    <dt>Project</dt>
                    <dd>{request.projectName}</dd>
                  </div>
                  <div className={styles.metaRow}>
                    <dt>Document</dt>
                    <dd>{request.documentName}</dd>
                  </div>
                </dl>

                <div className={styles.field}>
                  <label htmlFor="document-access-name">Full Name</label>
                  <input
                    id="document-access-name"
                    ref={nameRef}
                    name="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={styles.input}
                    aria-invalid={!!error && !form.name.trim()}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="document-access-phone">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="document-access-phone"
                    ref={phoneRef}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="Enter your phone number"
                    inputMode="tel"
                    autoComplete="tel"
                    className={styles.input}
                    aria-invalid={!!error && !form.phone.trim()}
                  />
                </div>

                {error && (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={styles.cta}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Opening…
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />{" "}
                      {request.ctaLabel ?? "View Document"}
                    </>
                  )}
                </button>

                <p className={styles.consent}>
                  By submitting you agree to be contacted by Arjun Realty. We
                  never share your details.
                </p>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
