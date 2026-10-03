# Adding a chemistry topic

Every topic is **one file** in `src/content/topics/`. The website builds the page automatically,
including the contents list, video, flashcards, quiz, downloads, references and previous/next links.

## Step by step

1. Copy `templates/topic.mdx` into `src/content/topics/`.
2. Rename it. **The file name becomes the web address**:
   `molar-mass.mdx` → `https://chemistryclarity.github.io/chemistry/molar-mass/`
   Use lowercase words joined by hyphens. **Don't rename a file after it's published**, because links to it would break.
3. Fill in the fields at the top (between the `---` lines). See the table below.
4. Write the lesson underneath.
5. Preview (`npm run dev`), check (`npm run build`), then publish. See [README.md](README.md).

## The fields at the top

| Field | What to write |
|---|---|
| `title` | The topic name, e.g. `Molar Mass` |
| `question` | The question a student would search for, e.g. `"How do you calculate molar mass?"` |
| `description` | 1–2 sentences (about 120–160 characters). Shown in Google results. |
| `area` | The subject area id from `src/content/areas/areas.yaml`, e.g. `reactions-and-stoichiometry` |
| `level` | `beginner`, `intermediate` or `advanced` |
| `order` | Position in its area. Use 10, 20, 30… so you can insert topics later (e.g. 15). |
| `prerequisites` | Topics to learn first, by file name: `[atomic-mass, mole-concept]` |
| `related` | Other relevant topics, same format |
| `video`, `notes`, `flashcards`, `quiz` | File names (without extension) of the matching files |
| `resources` | Printables: `[molar-mass-worksheet]` |
| `references` | Source ids from `src/content/references/references.yaml` |
| `status` | `draft`, `review` or `published` |
| `lastReviewed` | Date you last checked the lesson, e.g. `2026-11-01`. Shown on the page. |

If you link to something that doesn't exist (a typo in a file name), the build stops and tells you.

## Writing the lesson

Write normally in **Markdown**:

```md
## A section heading        (appears in the "In this lesson" list)
### A smaller heading

Normal paragraph. **Bold**, *italic*, [a link](https://example.org).

- bullet point
1. numbered point
```

Follow the Chemistry Clarity path with these `##` headings where they fit:
**What is it? → Why does it matter? → How does it work? → Visualise it → Worked example → Common mistake → Remember this.**
("Test yourself" is added automatically from the flashcards and quiz.)

## Lesson boxes

Put these anywhere in the lesson. Leave a blank line before and after each one.

```mdx
<KeyIdea>
The one idea to take away.
</KeyIdea>

<Analogy>
An everyday comparison.
</Analogy>

<MorePrecisely>
The fuller, technically precise version of a simplified explanation.
</MorePrecisely>

<Example title="Converting grams to moles">
**Question:** …

1. First step        ← numbered items become "Step 1", "Step 2"…
2. Second step

**Answer:** …
</Example>

<CommonMistake>
What students often get wrong.
</CommonMistake>

<NotationNote>
Where textbooks or exam systems use different symbols, units or conventions.
</NotationNote>

<RememberThis>
The key takeaway.
</RememberThis>
```

The `title="…"` part is optional on every box.

> **Watch out for `<` and `{` in normal text.** Lesson files treat `<Something>` as a box and `{…}` as code.
> To write "less than" in a sentence, use words or maths: `$a < b$`. Formulas inside `$…$` are always safe.
> If the build reports *"Expected a closing tag"*, look for a stray `<` near the line it mentions.

## Formulas and chemical equations

| You type | You get |
|---|---|
| `$\ce{H2O}$` | H₂O (chemical formula, inside a sentence) |
| `$\ce{SO4^2-}$` | sulfate ion with charge |
| `$\ce{2H2 + O2 -> 2H2O}$` | an equation with a reaction arrow |
| `$\ce{A <=> B}$` | equilibrium arrows |
| `$\frac{a}{b}$` | a fraction (maths) |
| `$x^2$`, `$x_1$` | superscript, subscript |

For an equation on its own centred line, put `$$` on separate lines:

```md
$$
\ce{2H2 + O2 -> 2H2O}
$$
```

To write a real dollar sign, type `\$`.

## Diagrams and images

1. Put the image in `public/images/<topic-name>/`, e.g. `public/images/molar-mass/periodic-table-excerpt.svg`.
   SVG is best for diagrams; PNG for screenshots. Keep files small (under ~300 KB).
2. In the lesson:

```mdx
<Figure src="/images/molar-mass/periodic-table-excerpt.svg" alt="Describe what the image shows" caption="Caption under the image" />
```

**Always write `alt` text.** It's read aloud to blind students and helps search engines.
Without `src`, the Figure shows a placeholder box: `<Figure placeholder="Diagram: …" />`.

## Adding a source (reference)

1. Open `src/content/references/references.yaml` and add:

```yaml
- id: short-name
  citation: "Author, A. (Year). Title. Publisher."
  url: "https://…"        # optional
```

2. In the topic: `references: [short-name]`.

## Search-friendly writing (SEO) checklist

- One topic per page, answering one main `question`.
- Answer the question clearly in the first paragraph of "What is it?".
- Use plain words students actually search for; define technical terms when first used.
- Link to prerequisites and related topics (the fields at the top).
- Write a specific `description`, never copied from another page.
- Fill in `alt` text for every image.
