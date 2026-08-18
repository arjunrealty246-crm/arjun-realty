export function isCloudinaryRawUrl(url: string): boolean {
  return /res\.cloudinary\.com\/.+\/raw\/upload\//.test(url);
}

export function getDownloadUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (isCloudinaryRawUrl(url)) {
    return "/api/download?url=" + encodeURIComponent(url);
  }
  return url;
}
