# Custom domain: chemistryclarity.com

The website is built and hosted free by GitHub Pages. The domain **chemistryclarity.com**
(managed in Cloudflare) points visitors to it. The old address `chemistryclarity.github.io`
automatically redirects to the domain.

## How it is set up

### 1. Cloudflare DNS (Cloudflare dashboard → chemistryclarity.com → DNS → Records)

| Type | Name | Content | Proxy status |
|---|---|---|---|
| A | `@` | `185.199.108.153` | DNS only (grey cloud) |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| AAAA | `@` | `2606:50c0:8000::153` | DNS only |
| AAAA | `@` | `2606:50c0:8001::153` | DNS only |
| AAAA | `@` | `2606:50c0:8002::153` | DNS only |
| AAAA | `@` | `2606:50c0:8003::153` | DNS only |
| CNAME | `www` | `chemistryclarity.github.io` | DNS only |
| TXT | `_github-pages-challenge-chemistryclarity` | *(the code GitHub gives you)* | — |

These are GitHub Pages' published addresses.
**Proxy status must be "DNS only"** (grey cloud). With the orange cloud, GitHub can't issue the
HTTPS certificate for the domain.

### 2. GitHub: verify the domain (protects it from being used by anyone else)

GitHub → your profile picture → **Settings → Pages → Add a domain** → `chemistryclarity.com`.
GitHub shows a TXT record; add it in Cloudflare (row above), then click **Verify**.

### 3. GitHub: connect the domain to the website

Repository `chemistryclarity.github.io` → **Settings → Pages → Custom domain** →
`chemistryclarity.com` → **Save**. Wait for "DNS check successful", then tick **Enforce HTTPS**
(the certificate can take from a few minutes up to about a day to appear).

### 4. Site setting

`url` in `src/config/site.ts` is `https://chemistryclarity.com`. Every canonical link, the sitemap,
social-sharing links and the PDF footers use it.

## If you ever change domain again

1. Update the DNS at the new domain (same records).
2. Change the custom domain in the repository's Pages settings.
3. Change `url` in `src/config/site.ts`, run `npm run pdfs` (PDF footers show the address), commit, push.
4. Set up redirects from the old domain so existing links and search rankings carry over.

## Optional: a branded email address

Cloudflare **Email Routing** (free) can forward an address such as `hello@chemistryclarity.com` to
your Gmail. If you set it up, change `contact.email` in `src/config/site.ts` and the contact page.
