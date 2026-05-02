export interface Metric { value: string; label: string }
export interface SkillGroup { category: string; items: string[] }
export interface ExperienceEntry { company: string; role: string; period: string; bullets: string[] }
export interface Project { title: string; description: string; tags: string[]; link?: string; type: 'professional' | 'personal'; account: 'AMoioli' | 'Vision87' }
export interface Certification { name: string; issuer: string; year: string; url?: string }
export interface WritingEntry { title: string; outlet: string; year: string; url: string; type: 'article' | 'talk' }

export const bio = {
  name: 'Alessio Moioli',
  title: 'Manager Software Engineering',
  company: 'Paramount',
  location: 'Milan, Italy',
  tagline: '15+ years delivering innovative web solutions and leading international engineering teams.',
  metrics: [
    { value: '28', label: 'Countries where my projects are published' },
    { value: '15+', label: 'Years' },
  ] as Metric[],
  about:
    "I am a passionate Software Engineering Manager at Paramount, where I lead international development teams to deliver large-scale web projects and global digital solutions. With over a decade of experience in the software development industry, I have established myself as a versatile technical leader with a deep focus on building efficient workflows and high-performing engineering pipelines. Currently based in the Greater Milan Metropolitan Area, I oversee complex engineering initiatives within the global media landscape, having previously served as a Lead Software Engineer for a major international entertainment organization. My career is marked by a strong track record at world-renowned media and technology firms, where I played a key role in developing robust web architectures and managing the technical execution of large-scale digital projects, such as the global launch of Paramount+. My earlier experience as a Web and Mobile Developer Consultant further broadened my expertise across multiple platforms and diversified tech stacks. A curious and methodical professional, I specialise in modern web technologies including GraphQL, React.js, TypeScript, and Next.js. I am particularly recognised for my ability to foster collaboration across diverse cultures and time zones, leveraging open dialogue to drive innovation and achieve superior outcomes. My leadership philosophy is built on the value of diverse perspectives and the continuous professional growth of my teams. A frequent traveller and lifelong learner, I remain dedicated to discovering new perspectives that ignite curiosity and creativity in the ever-evolving world of software engineering.",
  cv: '/cv.pdf',
  email: 'alessio.moioli.87@gmail.com',
  github: 'https://github.com/AMoioli',
  githubVision87: 'https://github.com/Vision87',
  linkedin: 'https://it.linkedin.com/in/alessio-moioli-b3775220',
}

export const skills: SkillGroup[] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'VueJS', 'XState', 'Module Federation', 'HTML/CSS'] },
  { category: 'Backend', items: ['Node.js', 'GraphQL', 'PHP', 'REST APIs'] },
  { category: 'Mobile', items: ['Swift', 'Obj-C'] },
  { category: 'Tools & Infrastructure', items: ['Docker', 'Git', 'CI/CD', 'Apollo GraphQL'] },
  { category: 'Leadership', items: ['Engineering Management', 'International Team Management', 'Agile Methodologies', 'Project Workflow Optimisation'] },
  { category: 'Languages', items: ['Italian (native)', 'English (professional)', 'Japanese (basic)'] },
]

export const experience: ExperienceEntry[] = [
  {
    company: 'Paramount',
    role: 'Manager Software Engineering',
    period: 'Oct 2022 – present',
    bullets: [
      'Orchestrate the strategic direction for engineering projects, improving delivery timelines through optimised workflows.',
      'Coordinate AI agents to execute both simple and complex tasks, enhancing productivity and delivering significant value.',
      'Mentor and develop a diverse international team of engineers, increasing team productivity and satisfaction.',
      'Create and discuss ADRs to support business and feature team objectives.',
      'Support feature teams across new (Next.js, React, GraphQL, TypeScript, Module Federation, TanStack) and legacy (PHP, Nginx, Vue.js) stacks.',
    ],
  },
  {
    company: 'Paramount',
    role: 'Lead Software Engineer',
    period: 'Feb 2022 – Oct 2022',
    bullets: [
      'Designed and deployed modular architecture using Next.js, improving code reusability and reducing development time.',
      'Established TypeScript best practices for junior developers, increasing team proficiency and reducing onboarding time.',
      'Spearheaded Docker integration into the development pipeline, streamlining deployments and minimising downtime.',
    ],
  },
  {
    company: 'ViacomCBS',
    role: 'Lead Software Engineer',
    period: 'Oct 2021 – Feb 2022',
    bullets: [
      'Drove migration of legacy systems to modern frameworks, improving performance and user experience.',
      'Implemented Agile methodologies that led to a 50% increase in delivery efficiency across multiple teams.',
      'Mentored engineers on code quality, resulting in a 30% decrease in technical debt escalations.',
    ],
  },
  {
    company: 'Viacom',
    role: 'Software Engineer',
    period: 'Nov 2019 – Oct 2021',
    bullets: [
      'Developed and maintained web applications using PHP and JavaScript, delivering scalable solutions.',
      'Participated in the shift to CI/CD, enabling more timely releases and reducing production bugs by 20%.',
      'Collaborated with stakeholders to clarify requirements and provide technical insight.',
    ],
  },
  {
    company: 'Viacom',
    role: 'Software Developer',
    period: 'Dec 2016 – Nov 2019',
    bullets: [
      'Contributed to the development of digital products through coding, testing, and code reviews.',
      'Implemented coding standards that significantly improved code quality across the team.',
      'Engaged with clients to gather feedback and tailor applications to evolving requirements.',
    ],
  },
  {
    company: 'T4 PROJECT',
    role: 'Web & Mobile Developer Consultant',
    period: 'Jun 2013 – Nov 2019',
    bullets: [
      'Provided expert consultancy on web and mobile application development for multiple clients.',
      'Delivered high-quality solutions leveraging cutting-edge technologies, increasing client engagement.',
      'Conducted training sessions for client teams on new technologies and processes.',
    ],
  },
  {
    company: 'Dodicitrenta Digital Creative Studio',
    role: 'Web Developer',
    period: 'Mar 2011 – Jun 2013',
    bullets: [
      'Designed and implemented responsive websites focused on user experience and accessibility.',
      'Managed multiple projects simultaneously, ensuring timely delivery to client specifications.',
    ],
  },
  {
    company: 'Interjob',
    role: 'Web Developer',
    period: 'Apr 2010 – Mar 2011',
    bullets: [
      'Developed and maintained web applications using PHP, MySQL, and JavaScript.',
      'Optimised existing code and implemented best practices throughout the development lifecycle.',
    ],
  },
  {
    company: 'S3-Store',
    role: 'Junior Web Developer',
    period: 'Jan 2009 – Jan 2010',
    bullets: [
      'Assisted in creating interactive HTML applications and conducted testing and debugging.',
      'Collaborated with senior developers to learn best practices and gradually took on independent tasks.',
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
    account: 'AMoioli',
  },
]

export const certifications: Certification[] = [
  {
    name: 'Graph Developer — Professional',
    issuer: 'Apollo GraphQL',
    year: '2024',
    url: 'https://www.apollographql.com/tutorials/certifications/apollo-graph-professional',
  },
  {
    name: 'Graph Developer — Associate',
    issuer: 'Apollo GraphQL',
    year: '2024',
    url: 'https://www.apollographql.com/tutorials/certifications/apollo-graph-associate',
  },
  {
    name: 'Docker for Developers',
    issuer: 'LinkedIn Learning',
    year: '2020',
  },
  {
    name: 'PHP 7 New Features',
    issuer: 'LinkedIn Learning',
    year: '2020',
  },
  {
    name: 'PHP: Testing Legacy Applications',
    issuer: 'LinkedIn Learning',
    year: '2020',
  },
  {
    name: 'Balancing Multiple Roles as a Leader',
    issuer: 'LinkedIn Learning',
    year: '2024',
  },
]

export const writing: WritingEntry[] = [
  // Add your articles, blog posts, and conference talks here
  // { title: '', outlet: '', year: '', url: '', type: 'article' }
  // { title: '', outlet: '', year: '', url: '', type: 'talk' }
]
