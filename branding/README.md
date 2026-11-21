# NJOY SECURITY web branding

The assets in `assets/` match the public NJOY SECURITY site as inspected on 21 November 2026. The palette is background `#050d10`, panel `#0c171c`, teal `#00ded0`, primary text `#f5f7f7`, and muted text `#b5c2c7`.

The logo and icons were downloaded from `https://www.njoysecurity.com.au/`; the hero wave came from that site's `static.wixstatic.com` media asset. They are bundled so the remote access UI does not depend on the public website being reachable.

`apply.mjs` changes only a disposable copy of the pinned `kasmweb` source in the `builder/build-www` container. It updates page titles, favicons, the session control bar logo, transition and idle backgrounds, and the disconnected page. The original KasmVNC source and license remain in the repository. The branding overlay is included in the frontend supply chain source archive.

Build packages with the existing `builder/build-www` and package workflows. For an interactive development build, apply the overlay to a temporary copy of `kasmweb` before running Vite. Do not commit edits to the upstream submodule unless a separate frontend fork is intentionally created.

This repository builds KasmVNC's browser client and server. Kasm Workspaces' separate admin login and dashboard branding settings are outside this repository.
