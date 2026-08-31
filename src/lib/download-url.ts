export function isCloudinaryUrl(url: string): boolean {
  return /res\.cloudinary\.com\//.test(url);
}

export function isCloudinaryDocumentUrl(url: string): boolean {
  if (!isCloudinaryUrl(url)) return false;
  const path = url.toLowerCase().split("?")[0];
  const ext = path.slice(path.lastIndexOf("."));
  return ext === ".pdf";
}

export function isCloudinaryRawUrl(url: string): boolean {
  return /res\.cloudinary\.com\/.+\/raw\/upload\//.test(url);
}

export function getDownloadUrl(url: string | undefined | null): string {
  if (!url) return "";
  // Any Cloudinary PDF (raw or image resource) is delivered as authenticated/private
  // on the free plan, so always serve it through the signed proxy so it stays public.
  if (isCloudinaryRawUrl(url) || isCloudinaryDocumentUrl(url)) {
    return "/api/download?url=" + encodeURIComponent(url);
  }
  return url;
}
