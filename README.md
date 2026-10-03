# Chemistry Clarity

*Chemistry, made clear.* Clear, visual chemistry lessons with worked examples, flashcards, quizzes and printable resources.

**Live site:** https://chemistryclarity.github.io/

Built with [Astro](https://astro.build) (a static site generator) and published free on GitHub Pages.

---

## How the site works (in one minute)

- **You write content** in plain text files inside `src/content/`.
- **Templates turn those files into pages.** You never edit HTML to add a lesson.
- **When you push to GitHub,** the site is rebuilt and published automatically (about 2 minutes).
- **If a content file has a mistake,** the build stops, the live site stays unchanged, and GitHub shows you the error.

## Where things live

| What | Where |
|---|---|
| Site name, tagline, contact, social links, feature switches | `src/config/site.ts` |
| Menu and footer links | `src/config/navigation.ts` |
| Subject areas (the Learn page) | `src/content/areas/areas.yaml` |
| Chemistry topics (one file per concept) | `src/content/topics/` |
| Flashcard decks | `src/content/flashcards/` |
| Quizzes | `src/content/quizzes/` |
| Videos (YouTube details, not video files) | `src/content/videos/` |
| Lecture notes | `src/content/notes/` |
| Printables / downloads | `src/content/resources/` (+ free PDFs in `public/downloads/`) |
| Premium products | `src/content/products/` |
| Sources / citations | `src/content/references/references.yaml` |
| About, Editorial Standards, Privacy and other pages | `src/content/pages/` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Step-by-step guides | `docs/` |

## Content status

Every lesson, deck and quiz has a `status`:

- `draft`: work in progress
- `review`: ready for your check
- `published`: live and listed for search engines

While `showDrafts: true` in `src/config/site.ts`, drafts are visible on the site with a **Draft** banner and are hidden from search engines. Set it to `false` before the public launch.

## Run the site on your computer

You need [Node.js](https://nodejs.org) (LTS version). In a terminal opened in this folder:

```sh
npm install      # first time only
npm run dev      # start a local preview at http://localhost:4321/
```

Press `Ctrl + C` in the terminal to stop the preview.

```sh
npm run build    # check that everything builds without errors
```

## Publish changes

```sh
git add .
git commit -m "Describe what you changed"
git push
```

Then watch progress under the **Actions** tab on GitHub.

## Important rules

- **Never put premium (paid) files in this repository.** It is public, so anyone can download anything in it.
- **Never put passwords, API keys or tokens in this repository.**
- **Remove personal information from PDFs and images** before adding them (see `docs/`).

## License

Educational content: © Chemistry Clarity, all rights reserved. Website code: MIT. See [LICENSE.md](LICENSE.md).
