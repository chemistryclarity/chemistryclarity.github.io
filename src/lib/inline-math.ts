/**
 * Turns short text from YAML files (flashcards, quiz questions) into safe HTML.
 * Supports, at build time (no JavaScript sent to visitors):
 *   $...$            maths, e.g.  $\frac{m}{M}$
 *   $\ce{...}$       chemistry, e.g.  $\ce{H2SO4}$  or  $\ce{2H2 + O2 -> 2H2O}$
 *   **bold**  and  *italic*
 * Write a real dollar sign as \$.
 */
import katex from 'katex';
import 'katex/contrib/mhchem';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const emphasis = (s: string) =>
  s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>');

export function renderInline(text: string): string {
  const parts = text.split(/(?<!\\)\$(.+?)(?<!\\)\$/g);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) {
        return katex.renderToString(part, { throwOnError: false, output: 'htmlAndMathml' });
      }
      return emphasis(escapeHtml(part.replace(/\\\$/g, '$')));
    })
    .join('');
}

/** Same as renderInline, but keeps line breaks (for longer answers and explanations). */
export function renderBlock(text: string): string {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((para) => `<p>${renderInline(para).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** Has maths? (Pages only load the maths styles when needed.) */
export const hasMath = (text: string) => /(?<!\\)\$.+?(?<!\\)\$/.test(text);
