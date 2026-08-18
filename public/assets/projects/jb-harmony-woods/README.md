# JB Harmony Woods — Project Assets

Upload the real files into the folders below. The site reads these exact paths from
`src/data/projects.ts`, so once a file exists here the related section appears
automatically (hero video, brochure buttons, layout section). While a file is
missing, the section falls back gracefully (image hero, generated brochure, section hidden).

## Folders & expected filenames

| Folder      | Expected file        | URL path                                                     | Used by                                   |
| ----------- | -------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `drone/`    | `drone-video.mp4`    | `/assets/projects/jb-harmony-woods/drone/drone-video.mp4`    | Hero drone video background               |
| `brochure/` | `brochure.pdf`       | `/assets/projects/jb-harmony-woods/brochure/brochure.pdf`    | Brochure & Documents — View / Download    |
| `layout/`   | `layout.pdf`         | `/assets/projects/jb-harmony-woods/layout/layout.pdf`        | Layout & Master Plan section              |
| `gallery/`  | any images/videos    | `/assets/projects/jb-harmony-woods/gallery/<file>`           | Gallery tiles + lightbox                  |
| `updates/`  | update photos        | `/assets/projects/jb-harmony-woods/updates/<file>`           | Development & Community Updates photos    |

## Notes

- Hero video: mp4 works best, keep under ~15–20 MB, encoded H.264 for browser playback.
- Layout: a PDF or an image (`.jpg/.png/.webp`) both work — the section switches between
  "View Layout" (new tab) for PDFs and an image lightbox for images automatically.
- Gallery images: recommended ~1600px wide, JPG/WebP. To add captions/categories, extend the
  `gallery` array in `src/data/projects.ts` for `jb-harmony-woods` (see the `ProjectGalleryItem`
  type).
- Development updates: add dated entries to the `developmentUpdates` array in
  `src/data/projects.ts` (`DevelopmentUpdate` type) and drop photos into `updates/`.
