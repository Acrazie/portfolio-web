import { Link } from '@tanstack/react-router'
import { InteriorLayout } from '@/components/site/InteriorLayout'
import { getProject } from '@/content/portfolio'
import { useLocale } from '@/components/site/LocaleProvider'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { copy, locale } = useLocale()
  const project = getProject(slug)

  if (!project) return <NotFoundPage />

  const projectCopy = project.copy[locale]

  return (
    <InteriorLayout active="projects">
      <article>
        <header className="bg-black text-white">
          <div className="site-container py-20 sm:py-28">
            <Link to="/projects" className="focus-ring inline-flex min-h-11 items-center border-b border-white/45 text-sm text-white/72 hover:border-white hover:text-white">
              {copy.projects.title}
            </Link>
            <h1 className="page-title mt-10 max-w-[14ch] text-balance text-[clamp(3.5rem,8vw,6rem)] font-medium leading-[.92] tracking-[-.04em]">
              {projectCopy.title}
            </h1>
            <p className="mt-7 max-w-[58ch] text-lg leading-8 text-white/68">{projectCopy.summary}</p>
          </div>
        </header>

        <div className="bg-white py-20 sm:py-28">
          <div className="site-container grid gap-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-24">
            <div className="typeset max-w-[68ch]">
              <h2>{copy.projects.facts}</h2>
              <p>{projectCopy.detail}</p>
              <ul>
                {projectCopy.facts.map(fact => <li key={fact}>{fact}</li>)}
              </ul>
              <p>
                <a href={project.href}>{copy.projects.repository}</a>
              </p>
            </div>
            <aside className="border-t border-black/20 pt-6 lg:mt-1" aria-labelledby="project-stack">
              <h2 id="project-stack" className="text-sm font-semibold">{copy.projects.stack}</h2>
              <ul className="mt-5 space-y-3 text-sm text-black/62">
                {project.stack.map(item => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </div>
        </div>
      </article>
    </InteriorLayout>
  )
}
