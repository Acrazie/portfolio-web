import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home presents one focused hero and the selected project", async ({
	page,
}) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toContainText("MAYEUL");
	await expect(page.getByText("MAYEUL", { exact: true })).toHaveCount(1);
	await expect(
		page.getByText("Je conçois des expériences web fiables"),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Voir Projects" }),
	).toHaveAttribute("href", "/projects");
	await expect(page.locator(".gradient-canvas-fallback")).toBeVisible();
	await expect(page.locator("canvas")).toBeVisible();
	const viewport = page.viewportSize();
	const heroHeight = await page
		.locator(".gradient-hero")
		.evaluate((element) => element.getBoundingClientRect().height);
	expect(heroHeight).toBeGreaterThanOrEqual(viewport?.height ?? 0);
	await expect(
		page.getByRole("heading", { level: 2, name: "Qui je suis, en bref" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "En savoir plus sur moi" }),
	).toHaveAttribute("href", "/about");
	await expect(
		page.getByRole("heading", { name: "Portfolio vivant" }),
	).toBeVisible();
});

test("project index and detail avoid duplicated sections", async ({ page }) => {
	await page.goto("/projects");
	await expect(
		page.getByRole("heading", { level: 1, name: "Projects" }),
	).toBeVisible();
	await page.getByRole("link", { name: "Voir le projet" }).click();
	await expect(page).toHaveURL(/\/projects\/portfolio-web$/);
	await expect(
		page.getByRole("heading", { level: 1, name: "Portfolio vivant" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Voir le dépôt GitHub" }),
	).toHaveAttribute("href", "https://github.com/acrazie/portfolio-web");
});

test("about and education expose supplied facts", async ({ page }) => {
	await page.goto("/about");
	await expect(
		page.getByRole("heading", { level: 1, name: "About" }),
	).toBeVisible();
	await expect(page.getByText("Codex", { exact: true })).toBeVisible();
	await page.goto("/education");
	await expect(
		page.getByRole("heading", { level: 1, name: "Education" }),
	).toBeVisible();
	for (const institution of ["Marcq Institution", "ISG", "Epitech"]) {
		await expect(
			page.getByRole("heading", { name: institution }),
		).toBeVisible();
	}
});

test("language switch persists across client navigation", async ({
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
	await page.getByRole("link", { name: "About", exact: true }).click();
	await expect(
		page.getByText("Software engineering, augmented with judgment."),
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
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "idle");

	const bounds = await canvas.boundingBox();
	expect(bounds).not.toBeNull();
	await page.mouse.move(
		(bounds?.x ?? 0) + (bounds?.width ?? 1) * 0.58,
		(bounds?.y ?? 0) + (bounds?.height ?? 1) * 0.56,
	);
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle");
	await page.mouse.move(
		(bounds?.x ?? 0) + (bounds?.width ?? 1) * 0.4,
		(bounds?.y ?? 0) + (bounds?.height ?? 1) * 0.48,
		{ steps: 12 },
	);
	await expect(canvas).toHaveAttribute("data-particle-effect", "active");
	await expect(canvas).toHaveAttribute("data-welcome-formation", "idle");
	await page.screenshot({ path: "/tmp/ascii-cloud-moving.png" });
	await expect(canvas).toHaveAttribute("data-particle-effect", "idle", {
		timeout: 2000,
	});
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
	await expect(canvas).toHaveAttribute("data-welcome-formation", "formed");

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
		navigation.getByRole("link", { name: "Education" }),
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
	await expect(page.getByRole("link", { name: "Voir Projects" })).toBeVisible();
	await context.close();
});

test("core routes pass accessibility and overflow checks", async ({ page }) => {
	for (const path of ["/", "/projects", "/about", "/education"]) {
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
	}
});
