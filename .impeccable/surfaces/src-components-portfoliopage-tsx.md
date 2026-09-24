---
version: 1
slug: "src-components-portfoliopage-tsx"
primary_target: "src/components/pages/HomePage.tsx"
related_targets: ["src/routes/","src/components/site/","src/components/ui/","src/components/hero/GradientCanvas.tsx","src/styles/app.css","src/content/portfolio.ts"]
---

# Surface Brief: Portfolio

## Scope

- Primary target: `src/components/pages/HomePage.tsx`
- Related targets: `src/routes/`, `src/components/site/`, `src/components/ui/`, `src/components/hero/GradientCanvas.tsx`, `src/styles/app.css`, and `src/content/portfolio.ts`
- Visitor mode: Experience

## Visitor

Recruiters, engineering managers, and technical peers arriving from LinkedIn, GitHub, skills.sh, or a shared link need to understand who Mayeul is, inspect verified work, and reach the right background or contact destination quickly.

## Content and constraints

- Present one page with anchored Projects, Profile, Education, and Contact sections; keep old route URLs as redirects.
- Preserve accessibility, SSR visibility, reduced-motion behavior, a static gradient fallback, demand rendering, and honest draft state.
- Keep Mayeul, Software Engineer · AI Engineer, GitHub `acrazie`, LinkedIn and direct email, confirmed AI-tool practice, and supplied education institutions. Do not use skills.sh as a navigation destination.
- Do not invent employer, dates, client, outcome, ranking, availability, project, testimonial, or booking claims.
- Corporate/SaaS card grids and gamer or terminal aesthetics are explicit failures.
- Use locally owned shadcn `base-nova` components for controls, forms, Dialog, and Sheet; keep editorial content out of Cards and Badges.

## Chosen direction

La table de revue, now a project-centered single page. Keep the full-hero animated Canvas gradient. Replace the basic black logo list with an interactive editorial skill atlas: eight selected skills receive a large, tactile `SKILL.md` dossier and an accessible selection index; all sixteen published skills remain in a compact complete index on the same page. Codex Dev Flow follows as a shorter secondary feature. Do not feature the portfolio itself or Stockli. Use quiet black-and-white editorial typography, restrained neutral shadcn `base-nova` controls, and no flashy or extravagant effects. The earlier code-led critique reference was `.impeccable/mocks/decision/b9205f49-shape-final-v3.png`; it predates this single-page direction.

## Memorable moment

A slow blue-violet canvas fills the entire Home hero. On fine pointers, actual cursor travel releases a compact, slow-drifting cloud built from `>`, `_`, `o`, `/`, and `+`. Particles remain free everywhere except inside a tight field around a hidden localized welcome; only particles crossing that field settle onto its 7-by-9 ASCII matrix. Free particles fade within 0.85–1.75 seconds. Captured particles keep their original symbols and form a larger bilingual word that persists for the mounted page, survives resizing and is restored after pause. The canvas dissolves through a broad left-right symmetric white bloom into the monochrome content below. The animation never carries semantic content.

## Direction contract

**THESIS:** A quiet editorial portfolio lets one living canvas introduce Mayeul, then turns his AI-agent skills into a browsable dossier, not a repeated logo grid. Eight skills carry the main scene; the complete sixteen-skill index and Codex Dev Flow remain on the same scroll. Profile, education and contact remain directly accessible.

**OWN-WORLD:** Large surfaces are pure black or white. Blue, violet, and lavender exist only inside the Home canvas and its fade; destructive red is reserved for real form errors. Neo-grotesque type, 6–14px corners, neutral `base-nova` controls, thin rules, and open fields form the system. Icons appear only when text cannot do the job.

**STORY:** Recruiters, managers, and technical peers identify Mayeul and his software/AI position, actively inspect the purpose of eight representative skills, find the complete collection on-site, then inspect the Codex plugin and contact options. GitHub remains the optional source destination.

**FIRST VIEWPORT:** Canvas fills at least one viewport and dominates the frame. A restrained fixed black navigation bar remains usable throughout the page; no small MAYEUL wordmark repeats the large name. Large regular MAYEUL, role, statement, and one neutral secondary projects action sit lower left. A broad fade mirrored around the vertical axis reaches both sides before resolving into white below the fold.

**FORM:** La table de revue, code-led extension of the chosen direction from seed `b9205f49`. The skill atlas is an open filing table: one layered document-scale selected skill and a precise adjacent index, never the previous black logo container. Selection is keyboard-operable, updates one semantic detail region, and uses only a restrained document lift/reveal; reduced motion removes it. The existing Canvas remains the only ambient motion. shadcn `base-nova` owns interactive primitives; mobile navigation uses a right Sheet and Contact uses Dialog.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- Current employer, work history, dates, additional projects, achievements, booking URL, and chat destination still require verified content.
- The interface is bilingual French and English, with French as the default language.
