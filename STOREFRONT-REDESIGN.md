# Storefront reference redesign

Rollback checkpoint: `backup/pre-storefront-redesign-20261125` (commit `65b193c`).
Implementation branch: `codex/storefront-reference-redesign`.
To return to the checkpoint after saving any later work, switch to the backup branch. No database changes were made.

Changed Hero.jsx, ProductFilters.jsx, Home.jsx; added scoped storefront.css and public/Images/banners/freshness-banner.png. Product records and product images were preserved. Existing About content remains to preserve the header navigation destination. Header component is unchanged; a tablet-only wrapping rule prevents its existing overflow.

The banner was edited with the built-in image_gen tool using the supplied banner as reference. Prompt: Remove ONLY the dark green Shop Now pill button and its white text and arrow in the lower left. Seamlessly fill its footprint with the surrounding light green background gradient. Preserve all other original text, basket, fruit, leaves, white border, rounded corners, colors, dimensions and composition exactly. No replacement button.

The real button uses proportional positioning on desktop and sits below the full uncropped image on narrow mobile screens to remain touch-accessible.

Validation: production build; Playwright category counts for all seven categories; search and empty results; Shop Now clears filters and scrolls; cart and wishlist counts; login, orders authentication gate, and location control; viewport overflow checks from 320 to 1440 CSS pixels; mobile categories and CTA; no page runtime errors. A 960px viewport covers the layout width equivalent to 150% desktop zoom; browser-toolbar zoom was not directly automated. Desktop and mobile screenshots were visually inspected.
