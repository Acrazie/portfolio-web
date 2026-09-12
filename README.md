# Acrazie portfolio

An English, server-rendered portfolio foundation built with React, TanStack Start, Tailwind CSS v4, source-owned shadcn/Base UI primitives, Motion, and Bun. The unframed folded-woven-surface hero uses React Three Fiber, GLSL `ShaderMaterial` points, and a generated glyph `CanvasTexture`.

**This is a draft, not a completed professional profile.** Projects, capabilities, and contact details are explicitly marked `Content pending`. No fictional employers, results, contact links, or availability are supplied. Robots are disallowed and page metadata is `noindex, nofollow`; neither is access control. Do not publish the draft.

## Development

Use Bun **1.3.14** and the committed `bun.lock`:

```bash
bun install --frozen-lockfile
bun run dev --host 127.0.0.1
```

Open <http://127.0.0.1:3000>. If that port is occupied, Vite prints the alternative port. To choose one explicitly:

```bash
bun run dev --host 127.0.0.1 --port 3001 --strictPort
```

Fonts use the system sans/mono stacks. The site makes no analytics or external font requests. No database, CMS, credentials, or environment file is required.

## Quality gate

```bash
bun run check
bunx playwright install chromium
bun run test:e2e
```

`check` runs TypeScript, Vitest, and a production build. **Use `bun run test`, not `bun test`:** the tests rely on Vitest and jsdom, not Bun's built-in test runner. Browser tests run Chromium desktop and Pixel 7 emulation against an isolated dev server on port 4173.

Coverage includes truthful content, SSR visibility, surface determinism and depth, atlas UVs, GPU resource disposal, semantic navigation, keyboard access, axe accessibility checks, narrow layouts, context loss, reduced motion, demand rendering, idle/off-screen suspension, and invalidation coalescing. Playwright HTML reports and traces are ignored by Git.

Optional WebKit checks on a supported OS:

```bash
bunx playwright install webkit
TEST_WEBKIT=1 bun run test:e2e --project=webkit
```

The local macOS 14 frozen WebKit build fails before page creation with `Unknown setting: PushAPIEnabled`. WebKit is **not verified** here; run this gate on a current supported OS before public release.

## Production with Bun

The Vite configuration uses Nitro's **Bun preset**, following [TanStack Start's hosting guide](https://tanstack.com/start/latest/docs/framework/react/guide/hosting#bun). It emits a self-contained `.output/` directory, including `.output/server/index.mjs` and `.output/public/`.

```bash
bun run build
HOST=127.0.0.1 PORT=4180 bun run start
```

Keep the entire `.output/` directory together. Running Vite's bare `dist/server/server.js` is not the production launch path. Nitro is currently a beta dependency; upgrades require rerunning the full build and runtime checks.

## Production container

Docker Engine and Docker Compose v2 are required:

```bash
docker compose build
docker compose up -d --wait
docker compose ps
curl -fsS http://127.0.0.1:3000/robots.txt
```

The container runs as the non-root `bun` user with a read-only root filesystem. The service binds to **127.0.0.1:3000** on the host, intended for an existing host-based TLS reverse proxy. No VPS, DNS, proxy configuration, or public deployment is included.

If host port 3000 is occupied, use an explicit alternate port consistently:

```bash
PORTFOLIO_PORT=4180 docker compose up -d --wait
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4180 bun run test:e2e
PORTFOLIO_PORT=4180 docker compose down
```

`PLAYWRIGHT_BASE_URL` tests an already-running server instead of starting Vite. For a containerized reverse proxy, decide the shared Docker network before changing the host binding. Rebuild the image after source changes; `up` alone does not rebuild it.

## Delivery

Production changes reach `main` through pull requests. The `Portfolio CI` workflow runs TypeScript checks, unit tests, the production build, and a production-container build. GitHub branch rules must require its `Typecheck, tests and production build` check, reject direct pushes, and require the branch to be current before merge.

After a protected merge, Dokploy Auto Deploy watches `main` and performs the deployment. GitHub Actions does not connect to Dokploy or deploy directly.

## Content handoff

Edit [`src/content/portfolio.ts`](src/content/portfolio.ts) for draft positioning and case-study data. The editorial introduction and section framing are composed in [`src/components/PortfolioPage.tsx`](src/components/PortfolioPage.tsx).

Before publication, supply and verify:

- Biography, professional positioning, work history, and dates.
- Three to five real projects: context, personal contribution, technical decisions, and evidenced outcomes.
- Contact details, profile URLs, CV PDF, and any availability statement.
- Final domain, approved media, licensed fonts, and social preview art.

Remove `Content pending` only for verified material, and update the honesty tests to reflect that verified schema. Replace reserved case-study titles rather than presenting them as actual projects. Update metadata in `src/routes/__root.tsx` and the robots policy in `public/robots.txt` only when publication is approved. There is no logo or favicon: `ACRAZIE` is a text wordmark.

## Rendering and known limits

- The decorative SVG woven surface stays mounted for SSR, no JavaScript, unavailable WebGL, lazy-load failure, and context loss.
- A concise three-line headline sits beside an ample blue/lavender typographic textile on the cream hero. The scene has no frame, flowchart nodes, caption, or implementation labels; other sections retain their honest pending statuses.
- Three/R3F is isolated behind a mounted, lazy scene boundary. It is not executed during SSR.
- Rendering is demand-driven, capped at DPR 2 and 12,000 glyphs. Pointer displacement is bounded; reduced-motion mode fixes morph progress and disables input/time motion. Off-screen and hidden-document input subscriptions stop requesting frames.
- Geometry, material, and atlas texture are explicitly disposed. Motion reveals start with visible SSR content.
- Component styling lives in Tailwind utilities. `src/styles/app.css` contains only the theme and global base rules. Only Button, Badge, and Separator are used from shadcn.
- The accepted Three/R3F stack is substantial: the lazy hero is about **883 kB raw / 235 kB gzip**, above the plan's 650 KiB investigation threshold. Inspection found R3F's standard `Canvas` registers the entire Three namespace. Application imports are named and there are no Drei/add-on imports; avoiding that cost would require a separately reviewed custom R3F root.
- The route chunk is about **133 kB raw / 48 kB gzip**; the shared React/TanStack bootstrap adds about **314 kB raw / 101 kB gzip**. Total eager JavaScript therefore exceeds a 250 KiB whole-page budget. These are not presented as a performance-budget pass.
- Browser instrumentation found no long tasks during the sampled first interaction, but one desktop cold-load task exceeded 100 ms. Small measured layout shifts remain; do not treat the local checks as a full Lighthouse or real-device performance certification.
- Development logs include R3F's upstream `THREE.Clock` deprecation warning. No full dependency/security audit has been claimed.
