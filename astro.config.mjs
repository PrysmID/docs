// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// Prysm:ID Docs — docs.prysmid.com
//
// Decisions worth knowing about:
//
// 1. defaultLocale: 'root' → Spanish.
//    Brand §1.2 + §6.5: "español como idioma de primera clase (inglés paralelo,
//    no traducción). Todo copy público nace en español." So `/` is ES; `/en/*` is
//    the English mirror. Reversing this would betray the brand stance.
//
// 2. Light default + dark toggle.
//    Brand §8.4: docs site is the explicit exception to the brand-wide
//    dark-first rule (§7.1.2) because long-form reading. Starlight handles the
//    toggle out of the box; we set the default in custom.css.
//
// 3. Three top-level tracks (Integrate / Agents / Dashboard).
//    Three reader personas, three journeys. /agents/ is a peer of /integrate/,
//    not a sub-section, because brand §1.2 + §3.2 ("agents-first by design",
//    "agents are first-class users") position MCP as a primary surface.
//
// 4. API reference is a link out, not a re-published spec.
//    `api.prysmid.com/docs` is FastAPI's live Swagger UI, always in sync with
//    deployed code. Re-hosting an OpenAPI dump here would just create drift.
//    `/reference/api` is one page that points there with usage notes.
//
// 5. Sidebar labels are bilingual via Starlight's per-locale config (in the
//    `translations` field). The structure is mirrored 1:1 in both languages
//    so URLs stay parallel: /concepts/architecture ↔ /en/concepts/architecture.

export default defineConfig({
  site: 'https://docs.prysmid.com',
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'Prysm:ID Docs',
      description:
        'Auth multi-tenant, open foundation, agent-native. Docs en español e inglés.',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/wordmark.svg',
        replacesTitle: true,
      },
      customCss: ['./src/styles/tokens.css', './src/styles/custom.css'],
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
        en: { label: 'English', lang: 'en' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/PrysmID',
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://docs.prysmid.com/og-default.png',
          },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
      ],
      // Sidebar: identical structure ES↔EN. Labels translated per locale via
      // `translations` so the visual order and slug paths stay parallel.
      sidebar: [
        {
          label: 'Empezá acá',
          translations: { en: 'Start here' },
          items: [
            { slug: 'quickstart' },
            {
              slug: 'concepts/architecture',
              label: 'Arquitectura',
              translations: { en: 'Architecture' },
            },
          ],
        },
        {
          label: 'Conceptos',
          translations: { en: 'Concepts' },
          items: [
            { slug: 'concepts/workspaces' },
            { slug: 'concepts/authentication-flow' },
            { slug: 'concepts/security-model' },
            { slug: 'concepts/email-delivery' },
          ],
        },
        {
          label: 'Integrar Prysm:ID',
          translations: { en: 'Integrate Prysm:ID' },
          items: [
            { slug: 'integrate/your-saas-app' },
            { slug: 'integrate/jwt-validation' },
            { slug: 'integrate/custom-branding' },
            { slug: 'integrate/webhooks' },
          ],
        },
        {
          label: 'Agentes (MCP)',
          translations: { en: 'Agents (MCP)' },
          items: [
            { slug: 'agents' },
            { slug: 'agents/quickstart-claude' },
            { slug: 'agents/tools' },
            { slug: 'agents/machine-keys' },
            { slug: 'agents/safe-defaults' },
          ],
        },
        {
          label: 'Dashboard',
          items: [
            { slug: 'dashboard' },
            { slug: 'dashboard/first-workspace' },
            { slug: 'dashboard/idps' },
            { slug: 'dashboard/branding' },
            { slug: 'dashboard/billing' },
          ],
        },
        {
          label: 'Referencia',
          translations: { en: 'Reference' },
          items: [
            { slug: 'reference/api' },
            { slug: 'reference/pricing' },
            { slug: 'reference/errors' },
            { slug: 'reference/rate-limits' },
            { slug: 'reference/changelog' },
          ],
        },
      ],
    }),
    sitemap(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
