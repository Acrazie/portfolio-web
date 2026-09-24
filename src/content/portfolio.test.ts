import { expect, it } from "vitest";
import { portfolio } from "./portfolio";
import { skillsCatalog } from "./skills";

it("keeps bilingual copy and only verified public facts", () => {
	expect(portfolio.contentStatus).toBe("draft");
	expect(portfolio.displayName).toBe("Mayeul");
	expect(portfolio.email).toBe("mayeul.desbazeille@gmail.com");
	expect(Object.keys(portfolio.copy)).toEqual(["fr", "en"]);
	expect(portfolio.links.map((link) => link.href)).toEqual([
		"https://github.com/acrazie",
		"https://www.linkedin.com/in/mayeuld/",
	]);
	expect(portfolio.education.map((item) => item.institution)).toEqual([
		"Marcq Institution",
		"ISG",
		"Epitech",
	]);
});

it("features verified AI-agent work instead of the portfolio itself", () => {
	expect(portfolio.projects.map((project) => project.slug)).toEqual([
		"skills",
		"codex-dev-flow",
	]);
	expect(portfolio.projects.map((project) => project.href)).toEqual([
		"https://github.com/Acrazie/skills",
		"https://github.com/Acrazie/codex-dev-flow",
	]);
	expect(skillsCatalog.fr).toHaveLength(16);
	expect(skillsCatalog.fr.filter((skill) => skill.featured)).toHaveLength(8);
	expect(skillsCatalog.fr.map((skill) => skill.slug)).toEqual(
		skillsCatalog.en.map((skill) => skill.slug),
	);
});
