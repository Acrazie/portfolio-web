# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The portfolio primarily serves recruiters, engineering managers, and technical peers. Visitors need a fast entry point into Mayeul's identity, work, background, education, external profiles, and contact options.

## Product Purpose

This is Mayeul's public professional portfolio. One page establishes his profile quickly, leads with verified AI-agent work, then makes background, education, and contact directly accessible in sections.

Success means visitors can quickly understand who Mayeul is, what he does, what he has worked on, and where to continue the conversation without the site inventing unavailable facts or evidence.

## Positioning

Mayeul is positioned as a **Software Engineer · AI Engineer**, focused on dependable software and practical AI systems.

## Operating Context

The product is a public single-page web portfolio:

1. Hero: concise identity, full-height animated gradient Canvas, and one primary action to the projects section.
2. Projects: the Acrazie skills collection is the main showcase. An interactive document-style atlas features eight real skills; a complete on-site index describes all sixteen skills currently present in the collection. Codex Dev Flow is a secondary feature with its documented five-stage process. GitHub links lead to the source repositories; the portfolio itself is not a featured project.
3. Profile: professional position, software/AI capabilities, and confirmed daily tools.
4. Education: the supplied education record without invented dates.
5. Contact: a shared bilingual modal available from navigation and the footer, with required name, email and message fields. Server-side Resend delivery targets the verified mailbox; direct email and LinkedIn remain available. Older section routes redirect to their page anchors.

## Capabilities and Constraints

- The site is one page with navigable sections; its content must remain directly accessible without requiring external profile visits.
- External links include verified GitHub resources and LinkedIn; a direct `mailto:` action remains available. The skills.sh profile is not a navigation destination.
- Current employer, work history, additional project details, achievements, chat destination, and booking destination remain open content decisions. Stockli is not featured in this version.
- The portfolio is bilingual French and English, with French as the default language.
- Unverified employers, outcomes, testimonials, rankings, availability, or other professional claims must not be invented.
- Existing implementation uses React, TanStack Start, Tailwind CSS, Canvas 2D, TypeScript, and Bun.

## Brand Commitments

- Public displayed name: **Mayeul**.
- GitHub username: **acrazie**. The Acrazie identity is reserved for GitHub rather than used as the portfolio's primary public name.
- Professional role: **Software Engineer · AI Engineer**.
- Durable positioning: dependable software and practical AI systems.
- Interface atmosphere: technical, kinetic, calm, tactile, and soft; corporate/SaaS and gamer aesthetics are explicit anti-references.

## Evidence on Hand

- Confirmed LinkedIn profile: <https://www.linkedin.com/in/mayeuld/>
- Confirmed skills.sh profile: <https://www.skills.sh/acrazie>
- Confirmed GitHub profile: <https://github.com/acrazie>
- Confirmed contact email: <mayeul.desbazeille@gmail.com>
- Confirmed daily AI tools: Codex, Claude, and Gemini across multiple agent harnesses.
- Verified AI-agent work: the skills collection at <https://github.com/Acrazie/skills> and Codex Dev Flow at <https://github.com/Acrazie/codex-dev-flow>. The sixteen skill names and summaries come from the local collection's SKILL.md files; eight are featured. The plugin's INTAKE, SHAPE, GATE, BUILD, and ASSURE stages come from its README. The on-site skill catalog is a curated snapshot, not a live GitHub feed.
- Supplied education record: collège and lycée at Marcq Institution; Bachelor at ISG; Master Software Engineer at Epitech. Dates remain unsupplied.
- Current content and structure: `src/components/pages/HomePage.tsx` and `src/content/portfolio.ts`.
- No verified employer, work-history, achievement, ranking, portrait, chat, or booking content has been supplied yet. Future work must leave these open rather than fabricate them.

## Product Principles

1. **One coherent public profile.** Centralize Mayeul's professional story and useful destinations without making visitors assemble it themselves.
2. **Proof before claims.** Publish only verified experience, work, outcomes, rankings, and contact information.
3. **Software and AI belong together.** Present practical AI as part of dependable software engineering, not as a disconnected specialty.
4. **Progressive depth.** Make the core identity understandable quickly while allowing interested visitors to explore detailed experience, projects, skills, and resources.
5. **Useful exits.** Every external profile, resource, and contact action should lead to a real, verified destination.
