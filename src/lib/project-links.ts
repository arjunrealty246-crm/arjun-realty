export function getProjectHref(slug: string): string {
  if (slug === "shankarpally-45-acres") {
    return "/shankarpally-45-acres";
  }
  return `/projects/${slug}`;
}
