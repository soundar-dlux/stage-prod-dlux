# Private Gated Assets Storage
This directory is used for genuine access-controlled storage of gated PDF assets.
Files placed here are:
1. NEVER served publicly by Next.js or any public CDN.
2. Delivered strictly via `GET /api/downloads?token=<signedToken>` after valid lead verification and token authentication.
3. Air-gapped from direct web exposure.

To gate an asset privately:
- Place the PDF in this directory (e.g. `HealthCheck.pdf` or `Use_Case_1.pdf`).
- The server will automatically prefer this private local file over any CDN URL.
