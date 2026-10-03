# Videos, lecture notes and downloads

## Videos

Videos are hosted on **YouTube** (free). Never put video files in this repository.

1. Upload the video to the Chemistry Clarity YouTube channel.
2. Copy the video ID from its link: `https://www.youtube.com/watch?v=`**`abc123XYZ`**.
3. Copy `templates/video.md` into `src/content/videos/` and rename it, e.g. `molar-mass-explained.md`.
4. Fill in `title`, `description`, `videoId`, `duration` (e.g. `PT6M30S` = 6 min 30 s), `uploadDate`, `keyPoints`.
5. Paste the transcript under `## Transcript` (YouTube can generate one: video → *Show transcript*).
6. In the topic file: `video: molar-mass-explained`.

The video doesn't load from YouTube until a visitor presses play. This keeps pages fast and privacy-friendly.

## Lecture notes

Notes can be read online, printed (there's a Print button), and optionally downloaded as a PDF.

1. Copy `templates/notes.mdx` into `src/content/notes/` and rename it, e.g. `molar-mass.mdx`.
2. Write the notes. Headings, formulas and all lesson boxes work exactly as in lessons
   (see [writing-lessons.md](writing-lessons.md)).
3. Optional PDF: add it to `public/downloads/` and set `pdf: "/downloads/molar-mass-notes.pdf"`.
4. In the topic file: `notes: molar-mass`.

## Worksheets (written as text, turned into PDFs automatically)

You don't need Word. Write the worksheet as a text file and the site makes a branded A4 PDF.

1. Copy `templates/worksheet.mdx` into `src/content/printables/`, e.g. `molar-mass-worksheet.mdx`.
2. Copy `templates/worksheet-answers.mdx` to `molar-mass-worksheet-answers.mdx` in the same folder.
3. Write the questions:
   - `<Q n={1} lines={2}>Question</Q>` gives a question with 2 ruled answer lines.
   - `<Q n={2} box={4}>Question</Q>` gives a question with a working box.
   - `<DataBox items={['H = 1.008', 'C = 12.01']} note="…" />` gives a data box.
   - In the answer key: `<Q n={1}>Question</Q>` followed by `<Answer>…</Answer>`.
   - If a question has several paragraphs, leave a **blank line after `<Q …>`** and before `</Q>`.
4. Run **`npm run pdfs`**. It builds the site, creates `public/downloads/<name>.pdf` (with page numbers and the
   copyright line on every page), creates a preview image in `public/previews/`, then checks everything.
   To see a worksheet before making the PDF, run `npm run dev` and open `http://localhost:4321/print/<name>/`.
5. Create the resource listing (next section) with `file`, `answerKey` and `preview`.
6. Commit and push, including the new PDF and PNG files.

The same command also creates the PDF for any lecture notes that have a `pdf:` path.
The line printed at the bottom of every page is set by `printableNotice` in `src/config/site.ts`.

## PDFs and printables (worksheets, cheat sheets, formula sheets…)

### Prepare the PDF

- **Remove personal information first.** See [keeping-the-brand-anonymous.md](keeping-the-brand-anonymous.md).
- Name it clearly, lowercase with hyphens: `molar-mass-worksheet.pdf`.
- Keep it small (under ~5 MB if possible). Files over 100 MB can't go in the repository;
  for large files, upload to a **GitHub Release** (repository → *Releases* → *Draft a new release* →
  attach the file) and use that link instead.

### Add it

1. Put the PDF in `public/downloads/`.
2. Optional preview image: a PNG of the first page in `public/previews/` (about 600 px wide).
3. Copy `templates/resource.yaml` into `src/content/resources/` and rename it, e.g. `molar-mass-worksheet.yaml`.
4. Fill in `title`, `description`, `type`, `level`, `file: '/downloads/molar-mass-worksheet.pdf'`, `pages`, `preview`.
5. In the topic file, add it to the list: `resources: [molar-mass-worksheet]`.

It then appears on the Resources page, on its own page, and in the topic's **Notes and downloads** section.

> **Never add premium (paid) files to `public/`.** The repository is public, so anything in it can be downloaded free.
> See [premium-products.md](premium-products.md).
