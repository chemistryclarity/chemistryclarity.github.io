# Running Chemistry Clarity: follow-up checklist

## Your accounts (all signed in with the brand identity)

| Service | What it does for the site | Where |
|---|---|---|
| **GitHub** (`chemistryclarity`) | Stores the website and publishes every change | https://github.com/chemistryclarity/chemistryclarity.github.io |
| **Content editor** | Add and edit content in the browser | https://chemistryclarity.com/admin/ |
| **Cloudflare** | Domain, DNS, hello@ email forwarding, visitor statistics | https://dash.cloudflare.com |
| **Google Search Console** | How Google sees and lists the site | https://search.google.com/search-console |
| **MailerLite** | Newsletter subscribers and sending | https://dashboard.mailerlite.com |
| **Gmail** (`chemistryclarityforyou@gmail.com`) | Account logins; receives mail sent to hello@chemistryclarity.com | https://mail.google.com |

## Weekly (about 15 minutes)

- [ ] **Gmail:** read messages sent to hello@chemistryclarity.com. Fix any reported mistakes first.
- [ ] **Google Search Console:**
  - **Pages**: how many pages are indexed, and any errors (red/orange) to fix.
  - **Performance** (after a few weeks): which searches bring visitors. These are good ideas for new lessons.
- [ ] **Cloudflare → Web Analytics:** visits, most popular lessons, where visitors come from.
- [ ] **MailerLite:** new subscribers.

## After every change you publish

- [ ] Check https://github.com/chemistryclarity/chemistryclarity.github.io/actions: a green ✓ means it's live. A red ✗ means the change was **not** published (the old site stays up). Click it to read why, fix it, and save again. GitHub also emails you when a publish fails.

## Monthly

- [ ] Open the site on your phone and click through a lesson, the flashcards and a quiz.
- [ ] Re-check any lesson you've changed, and update its **Last reviewed** date in the editor.

## Yearly / when due (put these in your calendar)

- [ ] **Editor sign-in token:** it expires on the date you chose when creating it. Before then, create a new one (see content-editor.md) and sign in again.
- [ ] **Domain renewal:** make sure **auto-renew** is on for chemistryclarity.com and your payment card is up to date. If the domain lapses, the site and email stop working.
- [ ] **Legal pages:** review Privacy, Terms and Disclaimer, and after any new feature.

## Never do these

- ❌ Switch the Cloudflare DNS records for the website to the **orange cloud** (it breaks HTTPS).
- ❌ Delete the **MX** or **TXT** records in Cloudflare (they run hello@ email, Google verification and email security).
- ❌ Share the editor token, or put passwords, API keys or **paid files** in the repository (it's public).
- ❌ Rename a published lesson's file name (its web address would break).
- ❌ Add personal names or details anywhere on the site, in PDFs, or in GitHub.

## Open to-dos

- [ ] **MailerLite:** turn on **double opt-in** (then ask Claude to update the sign-up message).
- [ ] **MailerLite, before your first newsletter:** add a sender postal address (a P.O. box or virtual address, not your home).
- [ ] **Legal review** of Privacy, Terms and Disclaimer by a professional.
- [ ] **Social media:** create brand accounts, then add the links in the editor (Site settings → Social media links).
- [ ] **Before selling:** choose a store service, check payouts and tax for your country, confirm any outside-work policy that applies to you, then ask Claude to set up the shop and a refund policy.
- [ ] **Optional:** reply *from* hello@chemistryclarity.com in Gmail ("Send mail as"); one-click "Sign In with GitHub" for the editor.
