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

- Replace the one-page journey with short Home, Projects, Project detail, About, and Education routes.
- Preserve accessibility, SSR visibility, reduced-motion behavior, a static gradient fallback, demand rendering, and honest draft state.
- Keep Mayeul, Software Engineer · AI Engineer, GitHub `acrazie`, LinkedIn, skills.sh, confirmed AI-tool practice, and supplied education institutions.
- Do not invent employer, dates, client, outcome, ranking, availability, project, testimonial, or booking claims.
- Corporate/SaaS card grids and gamer or terminal aesthetics are explicit failures.
- Use locally owned shadcn `base-nova` components for controls, forms, Dialog, and Sheet; keep editorial content out of Cards and Badges.

## Chosen direction

La table de revue, reduced to a black-and-white editorial system with one full-hero animated canvas gradient and neutral shadcn `base-nova` controls. The code-led critique reference approved by the user is `.impeccable/mocks/decision/b9205f49-shape-final-v3.png`.

## Memorable moment

A slow blue-violet canvas fills the entire Home hero. On fine pointers, actual cursor travel releases a compact, slow-drifting cloud built from `>`, `_`, `o`, `/`, and `+`. Particles remain free everywhere except inside a tight field around a hidden localized welcome; only particles crossing that field settle onto its 7-by-9 ASCII matrix. Free particles fade within 0.85–1.75 seconds. Captured particles keep their original symbols and form a larger bilingual word that persists for the mounted page, survives resizing and is restored after pause. The canvas dissolves through a broad left-right symmetric white bloom into the monochrome content below. The animation never carries semantic content.

## Direction contract

**THESIS:** A quiet editorial portfolio lets one living canvas introduce Mayeul, then yields to short factual pages. It refuses the long portfolio scroll, repeated project sections, card grids, and terminal spectacle.

**OWN-WORLD:** Large surfaces are pure black or white. Blue, violet, and lavender exist only inside the Home canvas and its fade; destructive red is reserved for real form errors. Neo-grotesque type, 6–14px corners, neutral `base-nova` controls, thin rules, and open fields form the system. Icons appear only when text cannot do the job.

**STORY:** Recruiters, managers, and technical peers identify Mayeul and his software/AI position, open Projects as the primary action, inspect one verified case study, then explore About, Education, profiles, or email without duplicated summaries.

**FIRST VIEWPORT:** Canvas fills at least one viewport and dominates the frame. Right-aligned navigation sits over its dark upper edge; no small MAYEUL mark repeats the large name. Large regular MAYEUL, role, statement, and one neutral secondary Projects button sit lower left. A broad fade mirrored around the vertical axis reaches both sides before resolving into white below the fold.

**FORM:** La table de revue, first on the grounded list and chosen as the Impeccable pick from seed `b9205f49`. Signature motion is one slow Canvas 2D gradient with pointer-released ASCII particles assembling a localized bilingual word, a static CSS fallback, pause, visibility suspension, and reduced-motion state. shadcn `base-nova` owns interactive primitives; mobile navigation uses a right Sheet and Contact uses Dialog. Content motion stays subordinate.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- Current employer, work history, dates, additional projects, achievements, booking URL, and chat destination still require verified content.
- The interface is bilingual French and English, with French as the default language.
