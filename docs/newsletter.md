# Newsletter: how it works and how to switch it on

## How it works

The website can't store email addresses itself (GitHub Pages only serves pages).
A free **email service** stores your subscriber list, sends confirmation emails, handles
unsubscribes and sends your newsletters. The sign-up form on `/newsletter/` sends each address
directly to that service.

- No subscriber data is ever stored in this repository.
- The form's address (`formAction`) is **public by design**. It is not a password or API key.
- **Never** put an email service's *API key* in this repository.

## Switching it on (one time)

1. **Create a free account** with your chosen service using `chemistryclarityforyou@gmail.com`.
   Use "Chemistry Clarity" as the sender name.
2. **Sender address.** Use the Gmail address, and follow the service's steps to verify it.
3. **Turn on double opt-in** (subscribers must click a confirmation link). The sign-up page tells
   people to expect this email, and it protects you from fake sign-ups.
4. **Create an embedded form** in the service, then find its **HTML embed code**.
5. **Set the form's success/redirect page** (if the service offers one) to:
   `https://chemistryclarity.com/newsletter/thanks/`
6. **Send the embed code to Claude**, or copy these values into `newsletter` in `src/config/site.ts`:
   - `provider`: the service name
   - `formAction`: the address inside `action="..."` in the embed code
   - `emailField`: the `name="..."` of the email input
   - `hiddenFields`: any `<input type="hidden" name="..." value="...">` lines
7. **Update the privacy policy** (`src/content/pages/privacy.md`) to say which service stores
   subscriber emails. *Have this reviewed.*
8. Set `newsletter: true` under `features` in `src/config/site.ts`, then commit and push.
9. **Test it:** sign up with a second email address of your own, confirm, then unsubscribe.

Once it's on, the sign-up link appears in the footer and a sign-up box appears on the homepage automatically.

## Legal checklist (needs review)

- **Consent:** the form requires a tick confirming the person wants emails. Keep this.
- **Age:** the form asks people to confirm they are 16+ or have parental permission (`minimumAge`
  in `site.ts`). Age rules differ by country (for example, the US, EU and Korea set different ages),
  so have this checked.
- **Every newsletter must include an unsubscribe link** and a sender identity (the services do this
  automatically; the sender identity may require a postal address — check before sending).
- **Starter pack:** if you later offer a free download in exchange for signing up, say so clearly on the form.
