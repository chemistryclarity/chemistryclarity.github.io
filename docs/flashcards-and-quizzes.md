# Flashcards and quizzes

Both are simple text files, kept separate from the page design. Each deck or quiz gets its own page
(`/flashcards/<name>/`, `/quizzes/<name>/`) and also appears in the topic's **Test yourself** section.

## The one rule that matters: quotes

In these `.yaml` files, put text in **single quotes** `'like this'`:

- Text with a formula **must** use single quotes: `front: 'What is $\ce{H2O}$?'`
  (double quotes treat the backslash as a special character and the build stops).
- To write an apostrophe inside single quotes, type it twice: `'Avogadro''s number'`.
- Longer text over several lines can use `|` instead of quotes:

```yaml
    back: |
      First line of the answer.
      A second paragraph after a blank line.
```

Formatting inside cards and questions: `$\ce{...}$` chemistry, `$...$` maths, `**bold**`, `*italic*`.

## Adding a flashcard deck

1. Copy `templates/flashcards.yaml` into `src/content/flashcards/` and rename it, e.g. `molar-mass.yaml`.
2. Fill in the cards. Give every card a unique `id` (e.g. `molar-mass-01`, `-02`, …).
   **Never change an id after publishing**, because future features (saved progress) will rely on it.
3. In the topic file, add: `flashcards: molar-mass`.

Tips: one fact per card; keep the front short; the back can explain.
Hundreds of cards are fine, but split very large sets into several decks by sub-topic.

## Adding a quiz

1. Copy `templates/quiz.yaml` into `src/content/quizzes/` and rename it, e.g. `molar-mass.yaml`.
2. For each question:
   - `prompt`: the question
   - `choices`: 2–6 options
   - `answer`: **copied exactly** from one of the choices (the build checks this)
   - `explanation`: why it's right (and ideally why a tempting wrong answer is wrong)
   - `difficulty`: `easy`, `medium` or `hard`
3. In the topic file, add: `quiz: molar-mass`.

Choices are shown in the order you write them, so you can safely use options like "Both A and B".

## Converting your notes with Claude

You can give Claude your lesson text and ask for flashcards or quiz questions.
They'll be created with `status: draft` and `assisted: true`. Check every card and answer before
changing the status to `published`.
