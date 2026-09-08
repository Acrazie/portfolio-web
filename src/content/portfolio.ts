export const portfolio = {
  contentStatus: 'draft', wordmark: 'ACRAZIE',
  role: 'Software Engineer · AI Engineer',
  headline: 'Engineering dependable software and practical AI systems.',
  introduction: 'A portfolio taking shape. Verified work, experience, and outcomes will be added here—not invented in their absence.',
  capabilities: [
    { key: '01', title: 'Software systems', detail: 'Architecture, implementation, and the decisions in between.' },
    { key: '02', title: 'Applied AI', detail: 'Models connected to useful, testable software.' },
    { key: '03', title: 'Delivery', detail: 'The path from an initial intention to a verified release.' },
  ],
  projects: [
    { title: 'The system behind the interface', category: 'Software engineering' },
    { title: 'From model to useful workflow', category: 'Applied AI' },
    { title: 'Closing the delivery loop', category: 'Infrastructure & delivery' },
  ].map(project => ({ ...project, status: 'Content pending', summary: 'A reserved case-study space. Context, contribution, technical decisions, and verified outcomes are still to come.' })),
  links: [],
} as const
