import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("single page presents the hero, project, profile and education", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toContainText("MAYEUL");
	await expect(page.getByText("MAYEUL", { exact: true })).toHaveCount(1);
	await expect(
		page.getByText("Je conçois des expériences web fiables"),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Voir les projets" }),
	).toHaveAttribute("href", "#project");
	await expect(page.locator(".gradient-canvas-fallback")).toBeVisible();
	await expect(page.locator("canvas")).toBeVisible();
	const viewport = page.viewportSize();
	const heroHeight = await page
		.locator(".gradient-hero")
		.evaluate((element) => element.getBoundingClientRect().height);
	expect(heroHeight).toBeGreaterThanOrEqual(viewport?.height ?? 0);
	await expect(
		page.getByRole("heading", { level: 2, name: "Projets", exact: true }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { level: 2, name: "Profil" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { level: 2, name: "Formation" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Skills pour agents IA" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Codex Dev Flow" }),
	).toBeVisible();
});

test("project proof stays on-site and only verified profiles exit", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Voir les projets" }).click();
	await expect(page).toHaveURL(/\/#project$/);
	await expect(
		page.getByRole("heading", { name: "Skills pour agents IA" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Multi-Agent Planner" }),
	).toBeVisible();
	await expect(page.locator(".skill-atlas-menu button")).toHaveCount(8);
	await expect(page.locator(".skills-complete-index li")).toHaveCount(16);
	await page.getByRole("button", { name: /Skill Refiner/ }).click();
	await expect(
		page.getByRole("heading", { name: "Skill Refiner" }),
	).toBeVisible();
	await expect(page.locator("#selected-skill")).toContainText(
		"Journal de retours et ADR",
	);
	await expect(
		page.getByRole("heading", { name: "Index complet" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Codex Dev Flow" }),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Voir sur GitHub" })).toHaveCount(
		2,
	);
	await expect(
		page.getByRole("link", { name: "Voir sur GitHub" }).first(),
	).toHaveAttribute("href", "https://github.com/Acrazie/skills");
	await expect(
		page.getByRole("link", { name: "Voir sur GitHub" }).last(),
	).toHaveAttribute("href", "https://github.com/Acrazie/codex-dev-flow");
	await expect(
		page.getByRole("listitem").filter({ hasText: "INTAKE" }),
	).toContainText("Clarifier l’objectif");
	for (const institution of ["Marcq Institution", "ISG", "Epitech"]) {
		await expect(
			page.getByRole("heading", { name: institution }),
		).toBeVisible();
	}
	const exits = await page
		.locator('a[href^="http"], a[href^="mailto:"]')
		.evaluateAll((anchors) =>
			anchors.map((anchor) => anchor.getAttribute("href")),
		);
	expect(
		exits.every(
			(href) =>
				href?.startsWith("https://github.com/") ||
				href?.startsWith("https://www.linkedin.com/") ||
				href?.startsWith("mailto:"),
		),
	).toBe(true);
});

test("old page URLs lead to their sections", async ({ page }) => {
	for (const [path, hash] of [
		["/projects", "project"],
		["/projects/portfolio-web", "project"],
		["/about", "about"],
		["/education", "education"],
	]) {
		await page.goto(path);
		await expect(page).toHaveURL(new RegExp(`/#${hash}$`));
	}
});

test("language switch persists across section navigation", async ({
	page,
	isMobile,
}) => {
	await page.goto("/");
	await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
	await page
		.getByRole("button", { name: "Langue : français. Passer en anglais" })
		.click();
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
	if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
	await page.getByRole("link", { name: "Profile", exact: true }).click();
	await expect(
		page.getByText("Software engineering, augmented with judgment."),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Skills for AI agents" }),
	).toBeVisible();
	await expect(
		page.getByText(
			"A Codex plugin connecting scoping, approval, implementation, and verification of a software change.",
		),
	).toBeVisible();
});

test("canvas can pause and respects reduced motion", async ({
	page,
	isMobile,
}) => {
	await page.goto("/");
	await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
	if (isMobile) await page.screenshot({ path: "/tmp/ascii-cloud-mobile.png" });
	await page
		.getByRole("button", { name: "Mettre l’animation en pause" })
		.click();
	await expect(page.locator('[data-animation="paused"]')).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Reprendre l’animation" }),
	).toHaveAttribute("aria-pressed", "true");

	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.reload();
	await expect(page.locator('[data-animation="reduced"]')).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Pause animation" }),
	).toHaveCount(0);
});

test("desktop pointer releases ASCII particles that form the localized welcome", async ({
	page,
	isMobile,
}) => {
	test.skip(isMobile, "mouse interaction");
	await page.addInitScript(() => {
		const drawn = new Set<string>();
		const original = CanvasRenderingContext2D.prototype.fillText;
		CanvasRenderingContext2D.prototype.fillText = function (
			text,
			x,
			y,
			maxWidth,
		) {
			drawn.add(text);
			return original.call(this, text, x, y, maxWidth);
		};
		Object.assign(window, { drawnAscii: drawn });
	});
	await page.goto("/");
	const canvas = page.locator(".gradient-canvas");
	await expect(canvas).toHaveAttribute("data-letter-grid", "7x9");
	await expect(canvas).toHaveAttribute("data-word-columns", "71");
	await expect(canvas).toHaveAttribute("data-word-targets", "217");
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "idle");

	const bounds = await canvas.boundingBox();
	expect(bounds).not.toBeNull();
	await page.mouse.move(
		(bounds?.x ?? 0) + (bounds?.width ?? 1) * 0.25,
		(bounds?.y ?? 0) + (bounds?.height ?? 1) * 0.3,
	);
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle");
	await page.mouse.move(
		(bounds?.x ?? 0) + (bounds?.width ?? 1) * 0.08,
		(bounds?.y ?? 0) + (bounds?.height ?? 1) * 0.22,
		{ steps: 12 },
	);
	await expect(canvas).toHaveAttribute("data-particle-effect", "active");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "idle");
	await expect(canvas).toHaveAttribute("data-cloud-inertia", "active");
	await page.screenshot({ path: "/tmp/ascii-cloud-moving.png" });
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle", {
		timeout: 2200,
	});
	await expect(canvas).toHaveAttribute("data-cloud-inertia", "idle");
	await page.mouse.move(
		(bounds?.x ?? 0) + (bounds?.width ?? 1) * 0.72,
		(bounds?.y ?? 0) + (bounds?.height ?? 1) * 0.68,
		{ steps: 24 },
	);

	await expect(canvas).toHaveAttribute("data-renderer", "canvas2d");
	await expect(canvas).toHaveAttribute("data-particle-effect", "active");
	await expect(canvas).toHaveAttribute(
		"data-welcome-formation",
		/forming|formed/,
	);

	for (let sweep = 0; sweep < 6; sweep += 1) {
		await page.mouse.move(
			(bounds?.width ?? 1) * (sweep % 2 ? 0.48 : 0.93),
			(bounds?.height ?? 1) * 0.68,
			{ steps: 36 },
		);
	}
	await expect(canvas).toHaveAttribute("data-welcome-formation", "formed");
	await page.mouse.move(5, 5);
	await page.waitForTimeout(1800);
	await page.evaluate(() =>
		(window as unknown as { drawnAscii: Set<string> }).drawnAscii.clear(),
	);
	await page.waitForTimeout(100);
	const symbols = await page.evaluate(() => [
		...(window as unknown as { drawnAscii: Set<string> }).drawnAscii,
	]);
	expect(symbols.sort()).toEqual(["+", "/", ">", "_", "o"]);
	await expect(canvas).toHaveAttribute("data-welcome-formation", "formed");
	await page.screenshot({ path: "/tmp/ascii-cloud-desktop.png" });
	await page.setViewportSize({ width: 1100, height: 800 });
	await expect(canvas).toHaveAttribute("data-welcome-formation", "forming");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "formed", {
		timeout: 3000,
	});
	await page.setViewportSize({ width: 768, height: 760 });
	await expect(canvas).toHaveAttribute("data-welcome-formation", "forming");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "formed", {
		timeout: 3000,
	});
	const compactGlyphSize = Number(await canvas.getAttribute("data-glyph-size"));
	expect(compactGlyphSize).toBeGreaterThanOrEqual(8.5);
	await page.screenshot({
		path: ".impeccable/review/hero-particles-tablet.png",
	});

	await page
		.getByRole("button", { name: "Mettre l’animation en pause" })
		.click();
	await expect(canvas).toHaveAttribute("data-animation", "paused");
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "idle");
	await page.getByRole("button", { name: "Reprendre l’animation" }).click();
	await expect(canvas).toHaveAttribute("data-welcome-formation", "formed");
});

test("mobile navigation remains textual and keyboard-dismissible", async ({
	page,
	isMobile,
}) => {
	test.skip(!isMobile, "mobile navigation");
	await page.goto("/");
	await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
	await page.getByRole("button", { name: "Ouvrir le menu" }).click();
	const navigation = page.getByRole("navigation", {
		name: "Navigation principale",
	});
	await expect(
		navigation.getByRole("link", { name: "Formation" }),
	).toBeVisible();
	await page.keyboard.press("Escape");
	await expect(
		page.getByRole("button", { name: "Fermer le menu" }),
	).toHaveCount(0);
});

test("SSR fallback keeps essential content without JavaScript", async ({
	browser,
}) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toContainText("MAYEUL");
	await expect(page.locator(".gradient-canvas-fallback")).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Voir les projets" }),
	).toBeVisible();
	await context.close();
});

test("single page passes accessibility and overflow checks", async ({
	page,
	isMobile,
}) => {
	for (const path of ["/"]) {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		expect(
			results.violations,
			`${path}: ${results.violations.map((item) => item.id).join(", ")}`,
		).toEqual([]);
		const overflow = await page.evaluate(
			() =>
				document.documentElement.scrollWidth -
				document.documentElement.clientWidth,
		);
		expect(overflow).toBeLessThanOrEqual(1);
		if (isMobile) {
			await page.screenshot({
				path: ".impeccable/review/mobile-hero-proof.png",
			});
		}
		await page.screenshot({
			path: `.impeccable/review/${isMobile ? "mobile" : "desktop"}.png`,
			fullPage: true,
		});
	}
});
