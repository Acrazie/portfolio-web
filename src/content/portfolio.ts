import type { Locale } from '@/paraglide/runtime'
import * as m from '@/paraglide/messages'

export type { Locale }

function createCopy(locale: Locale) {
  const opt = { locale }
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
      featuredTitle: m.home_featured_title({}, opt),
      featuredIntro: m.home_featured_intro({}, opt),
    },
    projects: {
      title: m.projects_title({}, opt),
      intro: m.projects_intro({}, opt),
      open: m.projects_open({}, opt),
      repository: m.projects_repository({}, opt),
      stack: m.projects_stack({}, opt),
      facts: m.projects_facts({}, opt),
    },
    about: {
      title: m.about_title({}, opt),
      lead: m.about_lead({}, opt),
      body: m.about_body({}, opt),
      capabilitiesTitle: m.about_capabilities_title({}, opt),
      capabilities: [
        { title: m.about_capability_systems_title({}, opt), body: m.about_capability_systems_body({}, opt) },
        { title: m.about_capability_ai_title({}, opt), body: m.about_capability_ai_body({}, opt) },
        { title: m.about_capability_delivery_title({}, opt), body: m.about_capability_delivery_body({}, opt) },
      ],
      toolsTitle: m.about_tools_title({}, opt),
      toolsBody: m.about_tools_body({}, opt),
      profilesTitle: m.about_profiles_title({}, opt),
    },
    education: {
      title: m.education_title({}, opt),
      intro: m.education_intro({}, opt),
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
  }
}

export const portfolio = {
  contentStatus: 'draft',
  displayName: 'Mayeul',
  githubHandle: 'acrazie',
  role: 'Software Engineer · AI Engineer',
  email: 'mayeul.desbazeille@gmail.com',
  links: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/acrazie', detail: '@acrazie' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mayeuld/', detail: '/in/mayeuld' },
    { id: 'skills', label: 'skills.sh', href: 'https://www.skills.sh/acrazie', detail: '/acrazie' },
  ],
  tools: ['Codex', 'Claude', 'Gemini'],
  education: [
    {
      id: 'marcq-institution',
      institution: 'Marcq Institution',
      copy: {
        fr: { program: m.education_marcq_program({}, { locale: 'fr' }) },
        en: { program: m.education_marcq_program({}, { locale: 'en' }) },
      },
    },
    {
      id: 'isg',
      institution: 'ISG',
      copy: {
        fr: { program: m.education_isg_program({}, { locale: 'fr' }) },
        en: { program: m.education_isg_program({}, { locale: 'en' }) },
      },
    },
    {
      id: 'epitech',
      institution: 'Epitech',
      copy: {
        fr: { program: m.education_epitech_program({}, { locale: 'fr' }) },
        en: { program: m.education_epitech_program({}, { locale: 'en' }) },
      },
    },
  ],
  projects: [
    {
      slug: 'portfolio-web',
      href: 'https://github.com/acrazie/portfolio-web',
      stack: ['React', 'TanStack Start', 'Canvas', 'TypeScript', 'Tailwind CSS', 'Bun'],
      copy: {
        fr: {
          title: m.project_portfolio_web_title({}, { locale: 'fr' }),
          summary: m.project_portfolio_web_summary({}, { locale: 'fr' }),
          detail: m.project_portfolio_web_detail({}, { locale: 'fr' }),
          facts: [
            m.project_portfolio_web_fact_0({}, { locale: 'fr' }),
            m.project_portfolio_web_fact_1({}, { locale: 'fr' }),
            m.project_portfolio_web_fact_2({}, { locale: 'fr' }),
            m.project_portfolio_web_fact_3({}, { locale: 'fr' }),
          ],
        },
        en: {
          title: m.project_portfolio_web_title({}, { locale: 'en' }),
          summary: m.project_portfolio_web_summary({}, { locale: 'en' }),
          detail: m.project_portfolio_web_detail({}, { locale: 'en' }),
          facts: [
            m.project_portfolio_web_fact_0({}, { locale: 'en' }),
            m.project_portfolio_web_fact_1({}, { locale: 'en' }),
            m.project_portfolio_web_fact_2({}, { locale: 'en' }),
            m.project_portfolio_web_fact_3({}, { locale: 'en' }),
          ],
        },
      },
    },
  ],
  copy: {
    fr: createCopy('fr'),
    en: createCopy('en'),
  },
} as const

export type PortfolioProject = (typeof portfolio.projects)[number]

export function getProject(slug: string) {
  return portfolio.projects.find(project => project.slug === slug)
}
