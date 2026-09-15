import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("contact modal: accessible, error recovery, success, keyboard and mobile navigation", async ({
	page,
	isMobile,
}) => {
	await page.goto("/about");
	await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
	if (isMobile)
		await page.getByRole("button", { name: "Ouvrir le menu" }).click();
	await page.getByRole("button", { name: "Contact", exact: true }).click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole("heading")).toHaveText("Parlons ensemble.");
	await expect(
		page.getByRole("button", { name: "Fermer le menu" }),
	).toHaveCount(0);
	await dialog.getByLabel("Nom", { exact: true }).fill("Test Visitor");
	await dialog.getByLabel("Email", { exact: true }).fill("visitor@example.com");
	await dialog
		.getByLabel("Message", { exact: true })
		.fill("Un projet à discuter.");
	await page.route("**/api/contact", (route) =>
		route.fulfill({
			status: 503,
			contentType: "application/json",
			body: '{"ok":false}',
		}),
	);
	await dialog.getByRole("button", { name: "Envoyer le message" }).click();
	await expect(dialog.getByRole("alert")).toContainText("Envoi non confirmé");
	await expect(dialog.getByLabel("Message", { exact: true })).toHaveValue(
		"Un projet à discuter.",
	);
	const accessibility = await new AxeBuilder({ page })
		.include('[role="dialog"]')
		.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
		.analyze();
	expect(accessibility.violations).toEqual([]);
	await page.screenshot({
		path: `.impeccable/review/contact-${isMobile ? "mobile" : "desktop"}.png`,
		fullPage: false,
	});
	await page.keyboard.press("Escape");
	await expect(dialog).toBeHidden();
	await expect(
		page.getByRole("button", {
			name: isMobile ? "Ouvrir le menu" : "Contact",
			exact: true,
		}),
	).toBeFocused();
	await page.getByRole("button", { name: "Me contacter", exact: true }).click();
	await expect(dialog.getByLabel("Message", { exact: true })).toHaveValue(
		"Un projet à discuter.",
	);
	await page.route("**/api/contact", (route) =>
		route.fulfill({
			status: 200,
			contentType: "application/json",
			body: '{"ok":true}',
		}),
	);
	await dialog.getByRole("button", { name: "Envoyer le message" }).click();
	await expect(
		dialog.getByText(
			"Votre message a été transmis au service d’envoi. Merci !",
		),
	).toBeVisible();
	await expect(dialog.getByLabel("Message", { exact: true })).toHaveCount(0);
	await dialog.getByRole("button", { name: "Fermer le formulaire" }).click();
	await expect(
		page.getByRole("button", { name: "Me contacter", exact: true }),
	).toBeFocused();
});

test("English contact copy and quota fallback", async ({ page }) => {
	await page.goto("/about");
	await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
	await page
		.getByRole("button", { name: "Langue : français. Passer en anglais" })
		.click();
	await page.getByRole("button", { name: "Contact me", exact: true }).click();
	const dialog = page.getByRole("dialog");
	await expect(dialog.getByRole("heading")).toHaveText("Let’s talk.");
	await dialog.getByLabel("Name", { exact: true }).fill("Visitor");
	await dialog.getByLabel("Email", { exact: true }).fill("visitor@example.com");
	await dialog.getByLabel("Message", { exact: true }).fill("Hello");
	await page.route("**/api/contact", (route) =>
		route.fulfill({
			status: 429,
			contentType: "application/json",
			body: '{"ok":false}',
		}),
	);
	await dialog
		.getByRole("button", { name: "Send message", exact: true })
		.click();
	await expect(dialog.getByRole("alert")).toContainText("Too many messages");
	await expect(dialog.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
		"href",
		"https://www.linkedin.com/in/mayeuld/",
	);
});

test("real endpoint rejects cross-origin requests and discards honeypots without sending", async ({
	request,
	baseURL,
}) => {
	const rejected = await request.post("/api/contact", {
		headers: { origin: "https://untrusted.example" },
		data: {},
	});
	expect(rejected.status()).toBe(403);
	const discarded = await request.post("/api/contact", {
		headers: { origin: baseURL! },
		data: { website: "spam" },
	});
	expect(discarded.status()).toBe(200);
	expect(await discarded.json()).toEqual({ ok: true });
});

test("clipboard feedback and scrollable fallback stay usable", async ({
	page,
	isMobile,
}) => {
	await page.goto("/about");
	await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
	await page.getByRole("button", { name: "Me contacter", exact: true }).click();
	const dialog = page.getByRole("dialog");
	await page.evaluate(() =>
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: {
				writeText: async () => {
					throw new Error("Permission denied");
				},
			},
		}),
	);
	await dialog.getByRole("button", { name: "Copier l’email" }).click();
	await expect(dialog.getByRole("status")).toContainText("Copie impossible");
	await page.evaluate(() =>
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { writeText: async () => {} },
		}),
	);
	await dialog.getByRole("button", { name: "Copier l’email" }).click();
	await expect(dialog.getByRole("status")).toHaveText("Email copié");
	await dialog
		.getByRole("link", { name: "mayeul.desbazeille@gmail.com" })
		.focus();
	await page.screenshot({
		path: `.impeccable/review/contact-fallback-${isMobile ? "mobile" : "desktop"}.png`,
	});
	await page.keyboard.press("Tab");
	await expect(
		dialog.getByRole("button", { name: "Fermer le formulaire" }),
	).toBeFocused();
});
