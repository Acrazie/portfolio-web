export type Locale = 'fr' | 'en'

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
        fr: { program: 'Collège et lycée' },
        en: { program: 'Middle school and high school' },
      },
    },
    {
      id: 'isg',
      institution: 'ISG',
      copy: {
        fr: { program: 'Bachelor — École de commerce' },
        en: { program: 'Bachelor — Business school' },
      },
    },
    {
      id: 'epitech',
      institution: 'Epitech',
      copy: {
        fr: { program: 'Master Software Engineer' },
        en: { program: 'Master Software Engineer' },
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
          title: 'Portfolio vivant',
          summary: 'Un portfolio personnel pensé comme un projet logiciel, en constante évolution.',
          detail: 'Une expérience web multi-page, rendue côté serveur et enrichie par un canvas animé qui reste décoratif. Le contenu demeure accessible sans JavaScript et lorsque les animations sont réduites.',
          facts: ['Rendu SSR', 'Fallback statique', 'Animation à la demande', 'Interface bilingue'],
        },
        en: {
          title: 'Living portfolio',
          summary: 'A personal portfolio treated as an evolving software project.',
          detail: 'A multi-page web experience rendered on the server and enhanced by a decorative animated canvas. Content stays accessible without JavaScript and when motion is reduced.',
          facts: ['SSR rendering', 'Static fallback', 'On-demand animation', 'Bilingual interface'],
        },
      },
    },
  ],
  copy: {
    fr: {
      navigationLabel: 'Navigation principale',
      nav: { home: 'Accueil', projects: 'Projects', about: 'About', education: 'Education', contact: 'Contact' },
      menu: { open: 'Ouvrir le menu', close: 'Fermer le menu' },
      language: { label: 'Langue : français. Passer en anglais', short: 'FR', other: 'EN' },
      skip: 'Aller au contenu',
      home: {
        title: 'Mayeul — Software Engineer et AI Engineer',
        statement: 'Des logiciels fiables. Une IA réellement utile.',
        projectsAction: 'Voir Projects',
        featuredTitle: 'Travail sélectionné',
        featuredIntro: 'Une première preuve vérifiable, construite comme un produit logiciel.',
      },
      projects: {
        title: 'Projects',
        intro: 'Des projets présentés une seule fois, dans un index conçu pour grandir sans répéter la page.',
        open: 'Voir le projet',
        repository: 'Voir le dépôt GitHub',
        stack: 'Technologies',
        facts: 'Propriétés vérifiées',
      },
      about: {
        title: 'About',
        lead: 'Ingénierie logicielle, augmentée avec discernement.',
        body: 'J’utilise Codex, Claude et Gemini dans plusieurs environnements agentiques. Je suis les modèles, techniques de compression, plugins et skills pour choisir ce qui améliore réellement le travail logiciel.',
        capabilitiesTitle: 'Expertise',
        capabilities: [
          { title: 'Systèmes logiciels', body: 'Architecture, implémentation, tests et décisions techniques.' },
          { title: 'IA appliquée', body: 'Agents, modèles, compression de contexte, plugins et skills intégrés à des workflows utiles.' },
          { title: 'Livraison', body: 'Du prototype à une version construite, testée et déployable.' },
        ],
        toolsTitle: 'Outils quotidiens',
        toolsBody: 'Une pratique multi-modèle, choisie selon le contexte plutôt qu’un seul fournisseur.',
        profilesTitle: 'Profils vérifiés',
      },
      education: {
        title: 'Education',
        intro: 'Mon parcours de formation. Les dates restent volontairement absentes tant qu’elles ne sont pas fournies.',
      },
      contact: {
        title: 'Parlons de votre projet.',
        body: 'Un contact direct, sans formulaire intermédiaire.',
        action: 'Envoyer un email',
      },
      motion: { pause: 'Mettre l’animation en pause', resume: 'Reprendre l’animation', pauseShort: 'Pause', playShort: 'Lecture' },
      footer: 'Software Engineering · Applied AI',
      notFound: { title: 'Page introuvable', body: 'Cette page n’existe pas ou a été déplacée.', action: 'Retour à l’accueil' },
    },
    en: {
      navigationLabel: 'Primary navigation',
      nav: { home: 'Home', projects: 'Projects', about: 'About', education: 'Education', contact: 'Contact' },
      menu: { open: 'Open menu', close: 'Close menu' },
      language: { label: 'Language: English. Switch to French', short: 'EN', other: 'FR' },
      skip: 'Skip to content',
      home: {
        title: 'Mayeul — Software Engineer and AI Engineer',
        statement: 'Dependable software. AI that proves useful.',
        projectsAction: 'View Projects',
        featuredTitle: 'Selected work',
        featuredIntro: 'One verifiable proof, built as a software product.',
      },
      projects: {
        title: 'Projects',
        intro: 'Projects presented once, in an index designed to grow without repeating the page.',
        open: 'View project',
        repository: 'View GitHub repository',
        stack: 'Technologies',
        facts: 'Verified properties',
      },
      about: {
        title: 'About',
        lead: 'Software engineering, augmented with judgment.',
        body: 'I use Codex, Claude, and Gemini across several agent harnesses. I track models, compression techniques, plugins, and skills to choose what genuinely improves software work.',
        capabilitiesTitle: 'Expertise',
        capabilities: [
          { title: 'Software systems', body: 'Architecture, implementation, testing, and technical decisions.' },
          { title: 'Applied AI', body: 'Agents, models, context compression, plugins, and skills integrated into useful workflows.' },
          { title: 'Delivery', body: 'From prototype to a built, tested, deployable release.' },
        ],
        toolsTitle: 'Daily tools',
        toolsBody: 'A multi-model practice chosen for the context rather than one provider.',
        profilesTitle: 'Verified profiles',
      },
      education: {
        title: 'Education',
        intro: 'My education record. Dates remain deliberately absent until they are supplied.',
      },
      contact: {
        title: 'Let’s discuss your project.',
        body: 'Direct contact without an intermediary form.',
        action: 'Send an email',
      },
      motion: { pause: 'Pause animation', resume: 'Resume animation', pauseShort: 'Pause', playShort: 'Play' },
      footer: 'Software Engineering · Applied AI',
      notFound: { title: 'Page not found', body: 'This page does not exist or has moved.', action: 'Back to home' },
    },
  },
} as const

export type PortfolioProject = (typeof portfolio.projects)[number]

export function getProject(slug: string) {
  return portfolio.projects.find(project => project.slug === slug)
}
