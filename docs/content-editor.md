# The content editor (chemistryclarity.com/admin)

Add and edit lessons, flashcards, quizzes, worksheets and more **from any browser**, with no files,
code or computer setup. Everything you save is stored in GitHub and published automatically.

## First-time sign-in (about 5 minutes, once per browser)

The editor signs in with a **personal access token**, a password-like key that lets it save to
your repository and nothing else.

### 1. Create the token on GitHub

1. Signed in as **chemistryclarity**, open: https://github.com/settings/personal-access-tokens/new
2. **Token name:** `Chemistry Clarity editor`
3. **Expiration:** choose a date (for example 1 year). You'll create a new token when it expires.
4. **Resource owner:** `chemistryclarity`
5. **Repository access:** *Only select repositories* → `chemistryclarity.github.io`
6. **Permissions → Repository permissions → Contents:** *Read and write*
   (GitHub adds *Metadata: Read-only* automatically. Leave everything else as "No access".)
7. Click **Generate token** and **copy it**. GitHub shows it only once.

### 2. Sign in to the editor

1. Open **https://chemistryclarity.com/admin/**
2. Click **Sign In Using Access Token**, paste the token, and confirm.

The token is saved **only in that browser**. On another computer or phone, sign in again with the
same token (keep it in a password manager) or create another one.

> **Keep the token private.** Anyone who has it can change the website. If you think it has leaked,
> delete it at https://github.com/settings/personal-access-tokens and create a new one.

## Everyday use

The left menu lists every type of content:

| Menu | What it's for |
|---|---|
| **Lessons** | Chemistry topics (one per page) |
| **Flashcard decks** | Cards with front/back; click **Add Card** |
| **Quizzes** | Questions with choices, answer and explanation; click **Add Question** |
| **Videos** | YouTube video ID, key points and transcript |
| **Lecture notes** | Longer notes; PDFs are created automatically |
| **Worksheets & answer keys** | Printable worksheets; PDFs and preview images are created automatically |
| **Printable resources** | The download listings on the Resources page (upload PDFs here) |
| **Premium products** | Paid products (for later) |
| **Site pages** | About, Editorial Standards, Contact, Privacy, Terms, Disclaimer |
| **Site settings** | Social media links, references (sources) and subject areas |

**To edit:** open an item, change it, click **Save**.
**To add:** click **New** at the top of a list.
After saving, the website updates in about **2–4 minutes**. Progress shows at
https://github.com/chemistryclarity/chemistryclarity.github.io/actions.

### Writing lessons, notes and worksheets

These use a plain-text (Markdown) box so your formatting is kept exactly as typed:

- Headings: `## What is it?`
- Lesson boxes: `<KeyIdea>` … `</KeyIdea>`, `<Example title="…">` … `</Example>`, `<CommonMistake>`,
  `<RememberThis>`, `<Analogy>`, `<MorePrecisely>`, `<NotationNote>`. **Leave a blank line before and after each box.**
- Chemistry: `$\ce{H2O}$`, equations `$\ce{2H2 + O2 -> 2H2O}$`, maths `$\frac{m}{M}$`
- Worksheet questions: `<Q n={1} lines={2}>…</Q>`, `<Q n={2} box={4}>…</Q>`; answer keys use `<Answer>…</Answer>`

Full details: [writing-lessons.md](writing-lessons.md) and [flashcards-and-quizzes.md](flashcards-and-quizzes.md).

### Reviewing before publishing (private previews)

Anything with **Status: draft** or **review** is built as a **private preview**: it has its own web
address (for example `chemistryclarity.com/chemistry/stoichiometry/`) with a yellow **Draft** banner,
but it is **not listed** anywhere (menus, lesson cards, sitemap, links from published lessons) and is
hidden from Google. Open the address to review the real page, and share it with a trusted reviewer if
you like. When it's ready, set **Status: published** and **Save**, and it appears everywhere.

### Linking things together

In a lesson, the **Video**, **Lecture notes**, **Flashcard deck**, **Quiz** and **Printable resources**
fields are drop-down lists of what already exists. Create the deck or quiz first, then pick it in the lesson.

### New items: choose the name carefully

When you create something, the editor asks for its name (for example `molar-mass`). For lessons this
becomes the web address (`chemistryclarity.com/chemistry/molar-mass/`), so it **can't be changed later**.
Use lowercase words joined by hyphens.

## Safety net

- If something you save breaks a rule (for example a quiz answer that isn't one of the choices, or a
  formula typo), the publish stops, **the live site is not changed**, and the Actions page shows a red ✗
  with the reason. Fix it in the editor and save again.
- Every save is recorded in GitHub's history, so any change can be undone.
- Only someone signed in with access to the repository can save. Visitors who find `/admin` can't change anything.

## Things to know

- Notes written with `#` at the top of flashcard/quiz/resource files are removed when those files are
  saved in the editor. That's harmless; this guide and the templates hold the same information.
- Brand settings (site name, tagline, contact email, feature switches) live in `src/config/site.ts`,
  which isn't in the editor. Ask Claude, or use GitHub's ✏️ web editor.
- A **new subject area** must also be added to the "Subject area" list in `public/admin/config.yml`.
- **Optional upgrade:** a "Sign In with GitHub" button (no token needed) can be added with a free
  Cloudflare Worker. Ask Claude when you want it. Until then, use the token sign-in.
