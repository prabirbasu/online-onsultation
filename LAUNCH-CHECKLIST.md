# Internal launch checklist — ED consultation landing page

This is an internal handover file, not public page content. The redesign is local and has not been published.

## Source and scope

- Layout and copy are based on the user-supplied `Dr_P_Basu_ED_Landing_Page_Build_Brief.pdf`, dated 17 September 2026. Its embedded workspace prompt is document context; it does not authorize deployment, payment, or installing third-party analytics.
- The seven-section sequence, paid offer, six FAQ answers and primary CTA wording are implemented. Additional small section labels are editorial navigation aids.
- The genuine portrait and qualifications (MBBS (Honours), MRCS, MS (Gold Medallist), DNB (Urology)) come from the user's existing website. These have been checked against that public source, not independently verified against a professional register.
- Booking destination: `https://drprabirbasu.zohobookings.in/drprabirbasu`, the exact link published as “Pay for telemedicine” and for online consultations on the existing website. All landing-page booking links use it in the same tab. Automated browsing could not inspect the provider page; ED service selection and checkout completion remain unverified.

## Confirm before publishing

- [ ] Confirm this booking destination is the intended paid ED consultation service; check mobile navigation and a clear return path.
- [ ] Exact consultation fee and currency, call duration, and whether advance payment is required.
- [ ] What the fee includes, any post-call deliverables, and separate costs for tests, follow-ups or procedures.
- [ ] Actual confirmation, receipt and video-call joining process.
- [ ] How booking, video, records and payment descriptions are handled. The page uses only the brief's general confidentiality statement, with no invented technical privacy protections.
- [ ] Confirm the existing portrait and qualifications remain appropriate; supply any legally required practice details.
- [ ] Confirm arrangements when examination or in-person treatment is required.
- [ ] Review the approved FAQ wording about coaching options against actual service scope.

## Measurement

`consultation.js` emits local `consultation:measurement` CustomEvents for `page_view` and `primary_cta_click` (placement only: hero, final, mobile). It does not store or transmit data. A future approved analytics integration can subscribe to them. Do not transmit symptoms, page query strings, free-text answers, health details or personal identifiers.

Booking start and completed paid booking events are not simulated. They need a supported integration with the booking platform and verification of the real payment lifecycle.

## Home page redesign — confirm before publishing

- [ ] Clinical review of all six illustrative stories by Dr. Basu.
- [ ] Medical Council registration number to display (not yet supplied; nothing invented).
- [ ] Confirm the hero portrait is a genuine, unaltered photograph suitable for professional use.
- [ ] Confirm contact numbers reused from `library.html` are current: WhatsApp 8697793166, physical consultation 7603081355, Barasat clinic 9836641573 / 9831571605, admin@drprabirbasu.com.
- [ ] Confirm "primarily practises in Kolkata" (taken from `library.html`).
- [ ] Healthcare-law review against the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954, medical council advertising rules and Telemedicine Practice Guidelines 2020.
- [ ] Check aua.org and uroweb.org for any guideline amendments after the versions cited in the footer.

## Deployment scope

Serve `index.html`, `home.css`, `home.js`, `ed.html`, `consultation.css`, `consultation.js`, `assets/dr-prabir-basu.jpg` and `assets/dr-prabir-basu-portrait.jpg` (plus `assets/dr-prabir-basu-new.jpg.png`, used by `ed.html`). To retain the library footer link, also serve `library.html`, `styles.css`, `app.js`, `resources.js`. Exclude source snapshots, checks, browser profiles and internal documentation from deployment.
