# Offline Photos / 離線相簿

A privacy-oriented, offline-capable photo and video gallery PWA for iPhone Safari.

## Features

- Nine-dot pattern lock, with manual lock and automatic relock after the app has been in the background for one minute
- Import photos and videos from the iPhone photo picker
- Store originals and thumbnails in this browser's IndexedDB
- Album creation, browsing, moving, and multi-select deletion
- Video covers captured from the first decoded frame, with duration labels
- Full-screen photo/video viewer; pinch-to-zoom for photos
- Basic photo crop
- Export selected originals through the iOS share sheet when supported, or browser downloads
- Traditional Chinese / English interface
- Light/dark appearance, PWA home-screen support, and offline application-shell caching

## Deploy to Cloudflare Pages

This is a static HTML/CSS/JavaScript app. No framework, package installation, or build step is needed.

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Connect GitHub and select the repository `mrshaoshi0-jpg/photo`.
4. Configure the project:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `.`
   - Root directory: `/` (the repository root)
5. Select **Save and Deploy**. Cloudflare will publish a `*.pages.dev` URL.
6. Open that URL once in Safari on the iPhone while online. Wait for the page to load, then use **Share** → **Add to Home Screen**.

Cloudflare Pages Git integration automatically redeploys when new commits are pushed to the connected production branch. You can also create preview deployments for other branches.

## Important privacy and storage notes

- The site does not upload imported photos or videos to a server. Media blobs and albums are stored in IndexedDB in the browser on the device where they were imported.
- This is a web app, not a native iOS Photos replacement. iOS only provides the files that the user selects through the picker.
- The pattern lock is an interface lock, **not encryption**. It does not encrypt media stored in IndexedDB and should not be treated as protection against someone with device/browser developer access.
- Browser storage can be cleared by the user or reclaimed by the operating system. This app has no cloud sync; export important originals and keep a separate backup.
- Imported files are copies inside this app. Deleting an item here does not delete the original from Apple Photos.
- Video thumbnail generation depends on iOS/browser codec support. Unsupported video formats may use a generic placeholder.

## Local development

Serve the repository root through a local HTTPS server or deploy it to Cloudflare Pages. Service workers and reliable PWA installation require a secure context. Opening `index.html` directly using `file://` will not test offline behavior.
