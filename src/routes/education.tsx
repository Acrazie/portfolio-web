import { createFileRoute } from '@tanstack/react-router'
import { EducationPage } from '@/components/pages/EducationPage'

export const Route = createFileRoute('/education')({ component: EducationPage })
