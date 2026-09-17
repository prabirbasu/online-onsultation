# Dr. Prabir Basu — Private ED Consultation

Open `index.html` in a browser. This is a responsive static site with no build step or installation required.

The landing page now follows the supplied ED consultation brief: hero, recognizable experiences, consultation scope, benefits, specialist, six accessible FAQs and a final paid booking CTA. Navy, muted teal and warm off-white replace the previous library-first design. The genuine portrait and qualifications are reused from the original website.

All three primary links use the same exact label and the full booking URL published on the original website. No consultation fee, duration, clinical guarantee or unconfirmed deliverable has been invented. The sticky mobile booking action appears after the hero and hides while an expanded FAQ is being read or the final booking section is visible.

## Files

- `index.html`, `consultation.css`, `consultation.js`: current landing page.
- `library.html`, `styles.css`, `app.js`, `resources.js`: preserved library of 124 linked resources, accessible from the footer.
- `LAUNCH-CHECKLIST.md`: internal operational facts to confirm before publishing, content provenance and integration notes.
- `consultation-checks.html`: checks for CTA consistency, page structure, FAQs, measurement hooks, responsive layout and sticky behavior.
- `library-checks.html`: checks for the preserved library.
- `preview-desktop.png`, `preview-mobile.png`: latest rendered previews.

The JavaScript emits local measurement events only; there is no installed analytics service or data collection. Paid booking completion must be integrated with the actual provider separately. The provider checkout has not been verified.

Google Fonts supplies optional typography, with local fallbacks. Core copy, booking links and FAQs work without JavaScript. The portrait is local.

This is a local redesign. It has not been deployed to the live domain. Deploy only the site files listed in `LAUNCH-CHECKLIST.md`; do not publish internal documentation, source snapshots, tests or browser data.