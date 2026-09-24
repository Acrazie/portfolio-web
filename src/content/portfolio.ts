import * as m from "@/paraglide/messages";
import type { Locale } from "@/paraglide/runtime";

export type { Locale };

function createCopy(locale: Locale) {
	const opt = { locale };
	return {
		navigationLabel: m.navigation_label({}, opt),
		nav: {
			home: m.nav_home({}, opt),
			projects: m.nav_projects({}, opt),
			about: m.nav_about({}, opt),
			education: m.nav_education({}, opt),
			contact: m.nav_contact({}, opt),
		},
		menu: {
			open: m.menu_open({}, opt),
			close: m.menu_close({}, opt),
		},
		language: {
			label: m.language_label({}, opt),
			short: m.language_short({}, opt),
			other: m.language_other({}, opt),
		},
		skip: m.skip({}, opt),
		home: {
			title: m.home_title({}, opt),
			statement: m.home_statement({}, opt),
			projectsAction: m.home_projects_action({}, opt),
			welcome: m.home_welcome({}, opt),
		},
		projects: {
			title: m.projects_title({}, opt),
			intro: m.projects_intro({}, opt),
			repository: m.projects_repository({}, opt),
			skillsSelection: m.skills_selection({}, opt),
			skillsResult: m.skills_result_label({}, opt),
			skillsSource: m.skills_source_label({}, opt),
			skillsIndexTitle: m.skills_index_title({}, opt),
			skillsIndexIntro: m.skills_index_intro({}, opt),
			skillGroups: {
				agents: m.skills_category_agents({}, opt),
				repository: m.skills_category_repository({}, opt),
				visual: m.skills_category_visual({}, opt),
				delivery: m.skills_category_delivery({}, opt),
			},
			flowStages: [
				{
					label: m.project_flow_stage_intake({}, opt),
					description: m.project_flow_intake({}, opt),
				},
				{
					label: m.project_flow_stage_shape({}, opt),
					description: m.project_flow_shape({}, opt),
				},
				{
					label: m.project_flow_stage_gate({}, opt),
					description: m.project_flow_gate({}, opt),
				},
				{
					label: m.project_flow_stage_build({}, opt),
					description: m.project_flow_build({}, opt),
				},
				{
					label: m.project_flow_stage_assure({}, opt),
					description: m.project_flow_assure({}, opt),
				},
			],
		},
		about: {
			title: m.about_title({}, opt),
			lead: m.about_lead({}, opt),
			body: m.about_body({}, opt),
			capabilitiesTitle: m.about_capabilities_title({}, opt),
			capabilities: [
				{
					title: m.about_capability_systems_title({}, opt),
					body: m.about_capability_systems_body({}, opt),
				},
				{
					title: m.about_capability_ai_title({}, opt),
					body: m.about_capability_ai_body({}, opt),
				},
				{
					title: m.about_capability_delivery_title({}, opt),
					body: m.about_capability_delivery_body({}, opt),
				},
			],
			toolsTitle: m.about_tools_title({}, opt),
		},
		education: {
			title: m.education_title({}, opt),
		},
		contact: {
			title: m.contact_title({}, opt),
			body: m.contact_body({}, opt),
			action: m.contact_action({}, opt),
		},
		motion: {
			pause: m.motion_pause({}, opt),
			resume: m.motion_resume({}, opt),
			pauseShort: m.motion_pause_short({}, opt),
			playShort: m.motion_play_short({}, opt),
		},
		footer: m.footer({}, opt),
		notFound: {
			title: m.not_found_title({}, opt),
			body: m.not_found_body({}, opt),
			action: m.not_found_action({}, opt),
		},
	};
}

export const portfolio = {
	contentStatus: "draft",
	displayName: "Mayeul",
	githubHandle: "acrazie",
	role: "Software Engineer · AI Engineer",
	email: "mayeul.desbazeille@gmail.com",
	links: [
		{
			id: "github",
			label: "GitHub",
			href: "https://github.com/acrazie",
			detail: "@acrazie",
		},
		{
			id: "linkedin",
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/mayeuld/",
			detail: "/in/mayeuld",
		},
	],
	tools: ["Codex", "Claude", "Gemini"],
	education: [
		{
			id: "marcq-institution",
			institution: "Marcq Institution",
			copy: {
				fr: { program: m.education_marcq_program({}, { locale: "fr" }) },
				en: { program: m.education_marcq_program({}, { locale: "en" }) },
			},
		},
		{
			id: "isg",
			institution: "ISG",
			copy: {
				fr: { program: m.education_isg_program({}, { locale: "fr" }) },
				en: { program: m.education_isg_program({}, { locale: "en" }) },
			},
		},
		{
			id: "epitech",
			institution: "Epitech",
			copy: {
				fr: { program: m.education_epitech_program({}, { locale: "fr" }) },
				en: { program: m.education_epitech_program({}, { locale: "en" }) },
			},
		},
	],
	projects: [
		{
			slug: "skills",
			href: "https://github.com/Acrazie/skills",
			copy: {
				fr: {
					title: m.project_skills_title({}, { locale: "fr" }),
					summary: m.project_skills_summary({}, { locale: "fr" }),
				},
				en: {
					title: m.project_skills_title({}, { locale: "en" }),
					summary: m.project_skills_summary({}, { locale: "en" }),
				},
			},
		},
		{
			slug: "codex-dev-flow",
			href: "https://github.com/Acrazie/codex-dev-flow",
			copy: {
				fr: {
					title: m.project_flow_title({}, { locale: "fr" }),
					summary: m.project_flow_summary({}, { locale: "fr" }),
				},
				en: {
					title: m.project_flow_title({}, { locale: "en" }),
					summary: m.project_flow_summary({}, { locale: "en" }),
				},
			},
		},
	],
	copy: {
		fr: createCopy("fr"),
		en: createCopy("en"),
	},
} as const;
