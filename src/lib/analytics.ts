// SSR-safe GA4 conversion event helper.
//
// Reuses the existing gtag/dataLayer wiring initialized in src/app/layout.tsx.
// Fails silently when gtag is unavailable (ad-blockers, SSR, non-browser), so
// analytics can never block or break the actual conversion action.
//
// IMPORTANT: Never pass names, phone numbers, emails, WhatsApp numbers or any
// other personally identifiable information (PII) to this helper.

type TrackParams = Record<string, string | number | boolean>;

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

export function trackEvent(eventName: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  const pagePath = window.location.pathname || "/";
  const data = { page_path: pagePath, ...params };

  try {
    const w = window as GtagWindow;
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, data);
    } else if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: eventName, ...data });
    }
  } catch {
    // Analytics is best-effort only — preserve normal website behavior.
  }
}