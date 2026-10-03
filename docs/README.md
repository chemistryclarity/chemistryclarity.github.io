# Chemistry Clarity: how-to guides

Start here. Each guide is short and step-by-step.

| I want to… | Guide |
|---|---|
| **Edit content in the browser (no code)** | [content-editor.md](content-editor.md) |
| Understand the everyday workflow (edit → preview → publish) | This page ↓ |
| Add a new chemistry topic / write a lesson | [writing-lessons.md](writing-lessons.md) |
| Add flashcards or a quiz | [flashcards-and-quizzes.md](flashcards-and-quizzes.md) |
| Add a video, lecture notes, a PDF or a worksheet | [videos-notes-and-downloads.md](videos-notes-and-downloads.md) |
| Add a premium (paid) product | [premium-products.md](premium-products.md) |
| Connect or manage the newsletter | [newsletter.md](newsletter.md) |
| Keep the brand separate from my identity | [keeping-the-brand-anonymous.md](keeping-the-brand-anonymous.md) |
| Manage the domain (chemistryclarity.com) | [custom-domain.md](custom-domain.md) |
| **Weekly / yearly follow-up checklist** | [maintenance-checklist.md](maintenance-checklist.md) |

Ready-to-copy starter files are in the [`templates/`](../templates) folder.

---

## The everyday workflow

### 1. Open the project

In VS Code: **File → Open Folder →** your `chemistry-clarity` project folder.

### 2. Start the live preview (optional, but recommended)

Open a terminal in VS Code (**Terminal → New Terminal**) and run:

```sh
npm run dev
```

Open **http://localhost:4321/** in your browser. Every time you save a file, the page updates.
Press `Ctrl + C` in the terminal to stop.

### 3. Edit or add content

Content lives in `src/content/`. Copy a file from `templates/`, fill it in, save.

### 4. Check for mistakes

```sh
npm run build
```

If something is wrong (a missing field, a quiz answer that isn't one of the choices, a link to a topic
that doesn't exist), the message names the file and the problem. Fix it and run the command again.

After building, an automatic check also looks at every page and stops if a **formula can't be displayed**
(for example a typo like `\cee{H2O}`) or an **internal link is broken**. It names the page and the problem.

### 5. Publish

**Using VS Code (no typing):**

1. Click the **Source Control** icon in the left sidebar (it looks like a branching line).
2. Type a short message describing your change, e.g. `Add molar mass lesson`.
3. Click **Commit** (if asked to "stage all changes", choose **Yes**).
4. Click **Sync Changes** (or **Push**).

**Using the terminal:**

```sh
git add .
git commit -m "Add molar mass lesson"
git push
```

### 6. Watch it go live

On GitHub, open the repository → **Actions** tab. A green tick means the site is updated (about 2 minutes).
A red cross means the build failed. Click it to read the error. **The live site is not changed when a
build fails**, so nothing breaks for visitors.

---

## Branches (keep it simple)

Work directly on the **`main`** branch. Every push to `main` publishes the site.
Unfinished work is safe because content marked `status: draft` is hidden from search engines and,
once `showDrafts` is turned off in `src/config/site.ts`, hidden from visitors too.

If you ever want to try a big change without publishing it, ask Claude to set up a separate branch.

## Status of content

| status | Meaning |
|---|---|
| `draft` | Being written. Not in search engines. Visible only while `showDrafts: true`. |
| `review` | Ready for your final check. Treated like a draft. |
| `published` | Live and listed for search engines. |

Anything Claude helps convert (for example, flashcards from your notes) arrives as `draft` with
`assisted: true`. You check it, then change it to `published`.

## Before public launch

In `src/config/site.ts`, set `showDrafts: false`. Only `published` content will then appear.
