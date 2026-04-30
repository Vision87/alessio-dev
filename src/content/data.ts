export interface Metric { value: string; label: string }
export interface SkillGroup { category: string; items: string[] }
export interface ExperienceEntry { company: string; role: string; period: string; bullets: string[] }
export interface Project { title: string; description: string; tags: string[]; link?: string; type: 'professional' | 'personal' }
export interface Certification { name: string; issuer: string; year: string; url?: string }
export interface WritingEntry { title: string; outlet: string; year: string; url: string; type: 'article' | 'talk' }

export const bio = {
  name: 'Alessio Moioli',
  title: 'Senior Software Engineer',
  company: 'Paramount',
  location: 'Milan, Italy',
  tagline: '10+ years building large-scale streaming products for millions of viewers worldwide.',
  metrics: [
    { value: '28', label: 'Countries' },
    { value: '10+', label: 'Years' },
    { value: 'M+', label: 'Viewers/Day' },
  ] as Metric[],
  about:
    "I'm a curious software engineer with over a decade of experience building large-scale web products. Currently at Paramount, I help ship Paramount+ to 28 countries — working across frontend architecture, GraphQL APIs, and streaming infrastructure. I care deeply about code quality, developer experience, and mentoring engineers.",
  email: 'your@email.com', // TODO: replace with your personal email
  github: 'https://github.com/alessiom', // TODO: replace with your real GitHub URL
  linkedin: 'https://it.linkedin.com/in/alessio-moioli-b3775220',
}

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
  { category: 'Backend', items: ['Node.js', 'GraphQL', 'PHP', 'REST APIs'] },
  { category: 'Tools & Infrastructure', items: ['Docker', 'Git', 'CI/CD', 'Apollo GraphQL'] },
  {
    category: 'Languages',
    items: ['Italian (native)', 'English (professional)', 'Japanese (basic)'],
  },
]

export const experience: ExperienceEntry[] = [
  {
    company: 'Paramount',
    role: 'Senior Software Engineer',
    period: '2020 – present',
    bullets: [
      'Led frontend architecture for Paramount+, launching the SVOD platform across 28 countries.',
      'Built and maintained GraphQL APIs powering millions of streaming sessions daily.',
      'Mentored engineers across the team, improving code quality and development practices.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'Paramount+',
    description:
      'Global SVOD streaming platform serving subscribers across 28 countries. Contributed to frontend architecture, GraphQL API layer, and launch infrastructure.',
    tags: ['React', 'GraphQL', 'TypeScript', 'Node.js'],
    link: 'https://www.paramountplus.com',
    type: 'professional',
  },
]

export const certifications: Certification[] = [
  {
    name: 'GraphQL Developer — Professional',
    issuer: 'The Linux Foundation',
    year: '2023',
    // url: '', // TODO: add your credential verification URL
  },
]

export const writing: WritingEntry[] = [
  // Add your articles, blog posts, and conference talks here
  // { title: '', outlet: '', year: '', url: '', type: 'article' }
  // { title: '', outlet: '', year: '', url: '', type: 'talk' }
]
