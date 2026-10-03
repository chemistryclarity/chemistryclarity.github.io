/**
 * Building blocks available inside every lesson and lecture-notes file (.mdx),
 * without needing to import anything. Usage examples are in docs/writing-lessons.md.
 */
import KeyIdea from './KeyIdea.astro';
import Example from './Example.astro';
import CommonMistake from './CommonMistake.astro';
import RememberThis from './RememberThis.astro';
import Analogy from './Analogy.astro';
import MorePrecisely from './MorePrecisely.astro';
import NotationNote from './NotationNote.astro';
import Figure from './Figure.astro';

export const lessonComponents = {
  KeyIdea,
  Example,
  CommonMistake,
  RememberThis,
  Analogy,
  MorePrecisely,
  NotationNote,
  Figure,
};
