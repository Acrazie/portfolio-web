# AGENTS.md — Development Guidelines for AI Agents

Welcome to the **Mayeul Portfolio** repository (`acrazie/portfolio-web`). This document serves as the single source of truth for all AI agents (Claude, Cursor, Copilot, Gemini, Codex, etc.) collaborating on this codebase.

---

## 1. Project Overview & Architecture

- **Subject**: Public personal portfolio for **Mayeul**, positioned as a **Software Engineer · AI Engineer** focused on dependable software and practical AI systems.
- **Core Architecture**:
  - **Framework**: [TanStack Start](https://tanstack.com/router) with React 19 (fullstack SSR).
  - **Server Engine**: [Nitro](https://nitro.build) using the native `bun` runtime preset.
  - **Build Tool**: [Vite 8](https://vite.dev).
  - **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with editorial design tokens.
  - **Internationalization**: [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) (bilingual French & English, French default).
  - **Linting & Formatting**: [Biome](https://biomejs.dev) (no ESLint or Prettier).
  - **Testing**: [Vitest](https://vitest.dev) for unit tests, [Playwright](https://playwright.dev) for E2E tests.
  - **Git Hooks**: [Lefthook](https://github.com/evilmartians/lefthook) with custom Conventional Commit validation.
  - **Deployment & Releases**: CI via GitHub Actions, CD via Dokploy (Docker on VPS), automated releases via Google Release Please and git-cliff.

### Core Reference Documents
Always consult these authoritative documents before modifying content or styles:
- [`PRODUCT.md`](./PRODUCT.md): Ground truth on product scope, Mayeul's confirmed background, verified links, and content constraints.
- [`DESIGN.md`](./DESIGN.md): Ground truth for typography, color palette, design tokens, and editorial layout standards.

---

## 2. Package Manager & Tooling Rules

> [!IMPORTANT]
> **Strict Package Manager Rule**: Always use **`bun`**.  
> NEVER use `npm`, `yarn`, or `pnpm`. Running `npm install` or `pnpm` will create extraneous lockfiles and fail CI checks.

### Essential Development Commands

| Command | Description |
| :--- | :--- |
| `bun dev` | Starts Vite local development server (`http://localhost:3000`) |
| `bun run build` | Compiles the production application into `.output/` |
| `bun start` | Starts the production Nitro server (`bun .output/server/index.mjs`) |
| `bun run paraglide:compile` | Compiles translation messages from `messages/*.json` into `src/paraglide/` |
| `bun run lint` | Lints and checks code using Biome |
| `bun run typecheck` | Compiles i18n messages and checks TypeScript types (`tsc --noEmit`) |
| `bun run test` | Compiles i18n messages and runs Vitest unit tests |
| `bun run test:e2e` | Runs Playwright end-to-end browser tests |
| `bun run bundle:summary` | Generates a bundle size analysis report |
| `bun run check` | Complete pre-flight check: runs lint + typecheck + unit test + build |

---

## 3. Git, Branching & Commit Conventions

### A. Branching Policy
- **Never push directly to `main`**. The `main` branch is protected by repository rulesets requiring a Pull Request with all status checks green.
- Always create a dedicated topic branch:
  - `feat/feature-name`
  - `fix/bug-description`
  - `docs/documentation-update`
  - `ci/pipeline-improvement`

### B. Commit Messages (Conventional Commits)
All commit messages must strictly adhere to the [Conventional Commits](https://www.conventionalcommits.org) specification:
```text
<type>(<scope>)?: <description>
```

- **Allowed types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Breaking changes**: Append `!` after type/scope (e.g., `feat(api)!: redesign route handlers`) or include `BREAKING CHANGE:` in the body.
- **Releases impact**:
  - `feat:` triggers a minor/patch version bump and updates the *Features* section of `CHANGELOG.md`.
  - `fix:` triggers a patch bump and updates the *Bug Fixes* section.

### C. Critical Rule on Co-Authorship

> [!CAUTION]
> **NEVER add `Co-authored-by: Claude` or any other AI attribution in git commit messages.**  
> Commit messages must remain clean and attributed solely to the committer/author without injecting synthetic co-author trailers.

### D. Automated Git Hooks (Lefthook)
The repository uses Lefthook (`lefthook.yml`) configured as follows:
- **`pre-commit`**: Automatically runs Biome check on staged files and stages automatic fixes (`stage_fixed: true`).
- **`commit-msg`**: Validates commit format using `scripts/validate-commit-msg.mjs`.
- **`pre-push`**: Runs `bun run typecheck && bun run test` to prevent broken code from being pushed to remote.

---

## 4. Content & Identity Integrity (Zero Hallucination)

1. **Strict Fidelity to [`PRODUCT.md`](./PRODUCT.md)**:
   - Public name: **Mayeul**.
   - GitHub username: **acrazie**.
   - Current confirmed education: Marcq Institution (collège & lycée), Bachelor at ISG, Master Software Engineer at Epitech. (Dates remain unsupplied).
   - Confirmed contact email: `mayeul.desbazeille@gmail.com`.
   - Confirmed profiles: LinkedIn (`/in/mayeuld`), skills.sh (`/acrazie`), GitHub (`acrazie`).
2. **Never Invent Facts**:
   - DO NOT hallucinate graduation years, previous employers, awards, client testimonials, rankings, or tech stacks not explicitly documented.
   - If content is missing or unspecified, ask the user or keep it as an open decision rather than creating placeholder fiction.

---

## 5. Internationalization (i18n) Standards

- The portfolio is bilingual: **French (`fr`)** and **English (`en`)**.
- **French is the default and primary locale**.
- **Rule**: Every user-facing UI text, label, aria-label, and heading must be stored in translation dictionaries:
  - `messages/fr.json`
  - `messages/en.json`
- Access messages in React components through Paraglide's compiled functions (e.g., `import * as m from '~/paraglide/messages'`).
- Always run `bun run paraglide:compile` after adding or updating translation keys.

---

## 6. Design System & UI Architecture

- **Visual Tone**: Technical, kinetic, calm, tactile, and editorial.
- **Palette** (defined in [`DESIGN.md`](./DESIGN.md)):
  - Editorial monochromatic base: `paper` (`#ffffff`), `ink` (`#000000`), `ink-muted` (`rgb(0 0 0 / 62%)`), `rule` (`rgb(0 0 0 / 18%)`).
  - Single vibrant accent: Living electric blue-violet gradient hero canvas (`hero-midnight`, `hero-indigo`, `hero-blue`, `hero-violet`).
- **Typography**: Hanken Grotesk Variable across all weights and clamp sizes.
- **Anti-patterns**:
  - Avoid corporate SaaS clichés (bloated cards, drop shadows, generic cartoon illustrations).
  - Avoid dark "gamer" or cyberpunk neon aesthetics.
  - Do not introduce external heavyweight UI libraries without prior alignment.

---

## 7. Agent Behavioral Rules

1. **Verify Before Proposing**:
   - Run `bun run typecheck` and `bun run test` (or `bun run check`) before declaring any coding task complete.
2. **Preserve Integrity**:
   - Maintain existing docstrings, TypeScript types, and comments unless explicitly asked to modify them.
3. **Surgical Diffs**:
   - Make focused, minimal edits that solve the user request without unnecessary mass refactoring.
