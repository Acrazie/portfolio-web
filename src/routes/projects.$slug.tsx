import { createFileRoute } from '@tanstack/react-router'
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage'

export const Route = createFileRoute('/projects/$slug')({
  component: ProjectRoute,
})

function ProjectRoute() {
  const { slug } = Route.useParams()
  return <ProjectDetailPage slug={slug} />
}
