/**
 * Converts a value fetched from MongoDB (e.g. a Mongoose `.lean()` result) into a
 * plain, JSON-serializable value that is safe to pass to Client Components.
 *
 * - MongoDB ObjectIds are converted to their hex string.
 * - Dates are converted to ISO strings.
 * - Mongoose version keys (`__v`) are dropped.
 * - Nested arrays and objects are converted recursively.
 */
export function toPlainValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "bigint") return value.toString();

  if (Array.isArray(value)) return value.map((item) => toPlainValue(item));

  if (value instanceof Date) return value.toISOString();

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof (record as { toHexString?: unknown }).toHexString === "function") {
      return (record as { toString(): string }).toString();
    }

    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(record)) {
      if (key === "__v") continue;
      out[key] = toPlainValue(val);
    }
    return out;
  }

  return value;
}

export function toPlainObject<T extends Record<string, unknown>>(value: T): T {
  return toPlainValue(value) as T;
}
