// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/contrib/mhchem'; // enables \ce{...} chemical notation
import { site } from './src/config/site.ts';

export default defineConfig({
  site: site.url,
  base: site.base,
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
    }),
  },
  integrations: [mdx()],
});
