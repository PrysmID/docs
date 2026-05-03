# Prysm:ID Docs (`docs.prysmid.com`)

Documentation site built with [Astro](https://astro.build) +
[Starlight](https://starlight.astro.build) and deployed to Cloudflare Pages.
Bilingual: Spanish (default, brand §6.5) + English mirror at `/en/*`.

## Why this stack

- Same shape as `web/` (Astro on CF Pages) — proven deploy path.
- Same family as EmBoux's `docs` — already in production with this combo.
- Brand §8.4 (light default + sidebar fija + TOC + max-width 720px + i18n + callouts) maps almost 1:1 to Starlight defaults; minimal overrides.
- Open source, owned, no vendor lock.

The brand manual is the contract; everything in `src/styles/custom.css` is a bridge between Starlight's CSS variables and `branding/tokens.css`. If brand drifts, this site drifts with it — only `tokens.css` is canonical.

## Develop

```bash
cd docs
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve dist/
```

## Deploy

`main` push → CF Pages production at `docs.prysmid.com`.
PR → preview deploy with unique URL, commented on the PR.

Workflow: `.github/workflows/deploy.yml`. Secrets needed in the repo:

- `CLOUDFLARE_API_TOKEN` — must include Pages:Edit (per memory: the devvault token doesn't; create a new one).
- `CLOUDFLARE_ACCOUNT_ID` — same as `web` repo.

CF Pages project name: `prysmid-docs`.

## Content layout

```
src/content/docs/
├── index.mdx                        # Home (ES — default locale)
├── quickstart.mdx
├── concepts/
│   ├── architecture.mdx
│   ├── workspaces.mdx
│   ├── authentication-flow.mdx
│   └── security-model.mdx
├── integrate/
│   ├── your-saas-app.mdx
│   ├── jwt-validation.mdx
│   ├── custom-branding.mdx
│   └── webhooks.mdx
├── agents/
│   ├── index.mdx
│   ├── quickstart-claude.mdx
│   ├── tools.mdx
│   ├── machine-keys.mdx
│   └── safe-defaults.mdx
├── dashboard/
│   ├── index.mdx
│   ├── first-workspace.mdx
│   ├── idps.mdx
│   ├── branding.mdx
│   └── billing.mdx
├── reference/
│   ├── api.mdx
│   ├── pricing.mdx
│   ├── errors.mdx
│   ├── rate-limits.mdx
│   └── changelog.mdx
└── en/                              # full English mirror, identical structure
```

## Adding a page

1. Create the MDX in `src/content/docs/<area>/<slug>.mdx` with frontmatter `title` + `description`.
2. Mirror it at `src/content/docs/en/<area>/<slug>.mdx`.
3. Add the slug to the corresponding sidebar group in `astro.config.mjs` (sidebars are bilingual via per-locale `translations`).
4. PR → preview → merge.

## Brand voice (per `branding/brand_guidelines.md` §6)

- Spanish first, English derived.
- Second person direct ("podés", not "los usuarios pueden").
- Concrete over abstract ("probado a 100k MAU", not "scalable").
- Honest about trade-offs.
- Banned phrases: "revolutionize", "industry-leading", "seamless", "synergy", "empower" (generic), "game-changer".

## API reference

Auto-served from `api.prysmid.com/docs` (FastAPI Swagger). We don't republish OpenAPI here — single source of truth = the deployed backend. `/reference/api/` is one page that points there with auth notes.
