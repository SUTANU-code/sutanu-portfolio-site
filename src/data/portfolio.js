/* ==========================================================================
   Single source of truth for all portfolio content.
   Every value here is drawn from github.com/SUTANU-code
   ========================================================================== */

export const profile = {
  name: 'Sutanu Paul',
  handle: 'SUTANU-code',
  initials: 'SP',
  role: 'Full-Stack Java Developer',
  subtitle: 'Java · Spring Boot · Agentic AI',
  tagline:
    'I build secure backends and agentic AI systems — Java and Spring Boot services, plus Python and LangGraph agents that actually ship.',
  bio: [
    "I'm a BCA student and aspiring Java / Spring Boot full-stack developer focused on building practical software systems that people can actually use.",
    'My stack runs Java → Spring Boot → Spring Security → REST APIs → JPA/Hibernate → SQL → React. Alongside that I build the AI layer in Python with LangGraph — graph-based agents that plan, call my APIs as tools and drive recovery workflows. So the picture is a Java/Spring backend as the source of truth, with agentic AI on top of it.',
  ],
  avatar: 'https://avatars.githubusercontent.com/u/191345560?v=4',
  location: 'Asansol, West Bengal, India',
  availability: 'Open to full-stack & backend roles',
  email: 'paulsutanu66@gmail.com',
  summary:
    'Full-Stack Developer and BCA student building web applications with Java, Spring Boot and React. Skilled in secure RESTful APIs, JWT authentication and AI feature integration, on a strong DSA foundation.',
  education: {
    degree: 'BCA — Bachelor of Computer Applications',
    college: 'Asansol Engineering College',
    university: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    expected: 'June 2027',
    coursework: [
      'Data Structures & Algorithms',
      'OOP with Java',
      'Database Management Systems',
      'Operating Systems',
      'Software Engineering Principles',
    ],
    focus:
      'Core Java backend architecture, modular API design, and scalable data-driven full-stack applications.',
  },
  socials: {
    github: 'https://github.com/SUTANU-code',
    linkedin: 'https://www.linkedin.com/in/sutanu-paul-75935629b/',
    leetcode: 'https://leetcode.com/u/___sutanu__/',
    email: 'mailto:paulsutanu66@gmail.com',
    resume: 'SUTANU_PAUL_RESUME.pdf',
  },
}

/* Awards, competitions and certifications — from the resume + certificates */
export const achievements = [
  {
    title: 'Top 20 Finalist — Smart India Hackathon',
    body: 'CrimeNet AI, my solution to SIH26189 — a Ministry of Home Affairs problem statement on criminal network analysis.',
    icon: 'trophy',
    tag: 'SIH26189 · MHA',
  },
  {
    title: '1st Place — Game Dev Workshop 2.0',
    body: 'First out of multiple teams in a game development workshop run by DevSoc, Asansol Engineering College.',
    icon: 'trophy',
    tag: 'Competition',
    image: 'certificates/game-development-workshop.jpg',
  },
  {
    title: 'PromptWars × Hacktropica',
    body: 'Shipped RescueFlow, a working AI prototype, in a one-day vibe-coding hackathon. Aug 2026 · AEC Coding Club.',
    icon: 'certificate',
    tag: 'Certificate',
    image: 'certificates/hacktropica-certificate.jpg',
  },
  {
    title: 'Web Designing Certification',
    body: 'Industry-aligned training in HTML, CSS and JavaScript — advanced layouts, cross-browser responsiveness.',
    icon: 'certificate',
    tag: 'Certification',
    image: 'certificates/web-designing-certification.jpg',
  },
  {
    title: 'Competitive Programming — LeetCode',
    body: 'Arrays, strings, trees, linked lists and dynamic programming, solved regularly.',
    icon: 'leetcode',
    tag: 'Ongoing',
    link: 'https://leetcode.com/u/___sutanu__/',
  },
]

/* Concrete stack line — shown once in the hero instead of repeating job titles */
export const stackLine = ['Java', 'Spring Boot', 'Spring AI', 'Python', 'LangGraph', 'React', 'MySQL', 'Docker']

export const stats = [
  { value: 8, suffix: '', label: 'Repositories', icon: 'rocket' },
  { value: 6, suffix: '', label: 'Apps built', icon: 'layers' },
  { value: 20, suffix: '+', label: 'Technologies', icon: 'cpu' },
  { value: 2027, suffix: '', label: 'Graduating', icon: 'spark' },
]

export const marqueeLines = [
  'Java',
  'Spring Boot',
  'Agentic AI',
  'Python',
  'LangGraph',
  'Spring AI',
  'React',
  'Gemini AI',
  'RAG',
  'Spring Security',
  'MySQL',
  'PostgreSQL',
  'JWT',
  'Docker',
  'REST APIs',
  'Hibernate',
  'Multi-Agent Systems',
  'Tool Calling',
  'JPA',
  'WebSockets',
]

export const skillTabs = [
  {
    id: 'backend',
    label: 'Backend',
    headline: 'Server-side systems that hold up under load',
    blurb:
      'I design layered Spring Boot applications — controllers, services, repositories — with security, validation and exception handling treated as first-class concerns rather than afterthoughts.',
    skills: [
      { name: 'Java', level: 92 },
      { name: 'Spring Boot', level: 88 },
      { name: 'Spring Security', level: 80 },
      { name: 'Spring Data JPA', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'JWT + RBAC', level: 78 },
      { name: 'Hibernate', level: 82 },
      { name: 'Maven', level: 84 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    headline: 'Interfaces that feel instant',
    blurb:
      'React with hooks, component-driven state and motion-aware UI. I care about the gap between a click and the paint — it should be imperceptible.',
    skills: [
      { name: 'React', level: 86 },
      { name: 'JavaScript', level: 88 },
      { name: 'HTML5', level: 94 },
      { name: 'CSS3 / Tailwind', level: 90 },
      { name: 'Framer Motion', level: 74 },
      { name: 'Responsive UI', level: 89 },
      { name: 'Redux / State', level: 76 },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    headline: 'Schemas that survive contact with production',
    blurb:
      'Normalised relational design, deliberate indexing and JPA relationship mapping — MySQL for transactional workloads, PostgreSQL when analytics and AI retrieval need vector-friendly querying.',
    skills: [
      { name: 'MySQL', level: 87 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Hibernate ORM', level: 82 },
      { name: 'DBMS Design', level: 85 },
      { name: 'SQL Optimisation', level: 74 },
      { name: 'Schema Modelling', level: 84 },
    ],
  },
  {
    id: 'ai',
    label: 'AI & LLM',
    headline: 'Intelligence wired into the backend, not bolted on',
    blurb:
      'Spring AI for embeddings and chat, Gemini for generation, and Python + LangGraph for the agentic layer — multi-step agents that plan, call tools and recover from incidents. The goal is always a system that degrades gracefully without an API key.',
    skills: [
      { name: 'Agentic AI', level: 82 },
      { name: 'Python', level: 80 },
      { name: 'LangGraph', level: 76 },
      { name: 'Spring AI', level: 80 },
      { name: 'Google Gemini', level: 78 },
      { name: 'RAG Pipelines', level: 74 },
      { name: 'Prompt Design', level: 80 },
    ],
  },
  {
    id: 'agentic',
    label: 'Agentic AI',
    headline: 'Python agents that reason, act and recover',
    blurb:
      'I build autonomous workflows in Python with LangGraph — graph-based agents that break a problem into steps, call my Spring Boot APIs as tools, and drive recovery decisions. The Agentic AI Supply Chain system is the clearest example: agents triage incidents and orchestrate recovery while the Java backend stays the source of truth.',
    skills: [
      { name: 'Python', level: 82 },
      { name: 'LangGraph', level: 78 },
      { name: 'Agent Workflows', level: 80 },
      { name: 'Tool Calling', level: 76 },
      { name: 'Multi-Agent Design', level: 72 },
      { name: 'RAG Retrieval', level: 74 },
      { name: 'State Management', level: 70 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    headline: 'Ship it, containerise it, put it in CI',
    blurb:
      'Git, Docker, Maven and IntelliJ IDEA — plus the deployment instincts that keep a project reproducible instead of a machine-specific mystery.',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Docker', level: 76 },
      { name: 'Postman', level: 90 },
      { name: 'IntelliJ IDEA', level: 92 },
      { name: 'VS Code', level: 88 },
      { name: 'Vercel', level: 74 },
    ],
  },
  {
    id: 'cs',
    label: 'Computer Science',
    headline: 'The fundamentals underneath the frameworks',
    blurb:
      'Data structures and algorithms, OOP design principles, networking and operating systems — the layer that makes the framework choices obvious instead of arbitrary.',
    skills: [
      { name: 'DSA', level: 80 },
      { name: 'OOP', level: 88 },
      { name: 'DBMS', level: 84 },
      { name: 'Computer Networks', level: 76 },
      { name: 'Operating Systems', level: 70 },
    ],
  },
]

export const projects = [
  {
    id: 'gaming-store',
    title: 'Gaming E-Commerce Store',
    tagline: 'A full-stack storefront with payments and AI assistance',
    description:
      'A production-shaped gaming e-commerce platform. Role-based admin access, cart and order lifecycle, Razorpay checkout and a Spring AI assistant that helps customers find gear — all backed by MySQL with Docker support for local setup.',
    highlights: [
      'JWT auth + Spring Security role-based admin',
      'Cart, checkout and order management',
      'Razorpay payment integration',
      'Spring AI powered shopping assistance',
      'MySQL persistence + Docker',
    ],
    stack: ['React', 'Spring Boot', 'MySQL', 'Spring Security', 'JWT', 'Razorpay', 'Spring AI', 'Docker'],
    repo: 'https://github.com/SUTANU-code/gaming-ecommerce-store',
    demo: 'https://gaming-ecommerce-store.vercel.app/',
    cover: 'cover-neon',
    wire: 'wire',
    icon: 'gamepad',
    accent: 'var(--color-neon)',
    featured: true,
  },
  {
    id: 'supply-chain',
    title: 'Agentic AI Supply Chain',
    tagline: 'Autonomous recovery engine for a transactional backend',
    description:
      'A Java enterprise backend built as the transactional engine for an autonomous supply chain recovery system. Manages inventory, shipments, suppliers, warehouses and orders, while downstream LangGraph agents handle incident triage and AI-assisted recovery.',
    highlights: [
      'Spring Boot REST API, enterprise layering',
      'PostgreSQL with complex relationships',
      'JWT authentication across services',
      'Incident management + analytics',
      'LangGraph agents driving recovery',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'React', 'LangGraph', 'Agentic AI'],
    repo: 'https://github.com/SUTANU-code/Agentic-AI-Powered-Supply-Chain-Management-Recovery-System',
    demo: null,
    cover: 'cover-iris',
    wire: 'wire-iris',
    icon: 'network',
    accent: 'var(--color-iris-soft)',
    featured: true,
  },
  {
    id: 'crimenet',
    title: 'CrimeNet AI',
    tagline: 'AI-Powered Criminal Network Analysis System',
    description:
      'An intelligence system for analysing criminal networks — mapping relationships between entities, surfacing hidden connections and turning raw link data into something analysts can reason about. Built for problem statement SIH26189 (AI-Powered Criminal Network Analysis System) issued by the Ministry of Home Affairs under the Smart India Hackathon, where it reached the semi-finals as one of the top 20 teams in the college. MIT licensed.',
    highlights: [
      'Problem statement SIH26189 · Ministry of Home Affairs',
      'Python intelligence pipeline',
      'Network graph construction + analysis',
      'Entity relationship mapping',
      'Insight extraction over link data',
      'Top 20 finalist, Smart India Hackathon',
      'Live deployed prototype',
    ],
    stack: ['Python', 'Network Analysis', 'AI', 'REST API'],
    repo: 'https://github.com/SUTANU-code/CrimeNet-AI',
    demo: 'https://crimenet-bsuc.onrender.com/',
    cover: 'cover-ember',
    wire: 'wire',
    icon: 'radar',
    accent: 'var(--color-ember)',
    featured: true,
  },
  {
    id: 'email-assistant',
    title: 'Smart AI Email Assistant',
    tagline: 'Tone-aware email generation with Gemini',
    description:
      'An AI reply generator that takes an incoming email, picks a tone, and returns a professional draft. Spring AI orchestrates the prompt pipeline, Gemini does the generation, and React keeps the interaction fast.',
    highlights: [
      'AI-generated email responses',
      'Customisable tone presets',
      'Spring AI + Gemini integration',
      'Prompt-based generation pipeline',
      'Responsive React frontend',
    ],
    stack: ['React', 'Spring Boot', 'Spring AI', 'Gemini', 'REST API'],
    repo: 'https://github.com/SUTANU-code/smart-ai-email-assistant',
    demo: null,
    cover: 'cover-cyan',
    wire: 'wire',
    icon: 'mail',
    accent: 'var(--color-cyan)',
    featured: false,
  },
  {
    id: 'rescueflow',
    title: 'RescueFlow AI',
    tagline: 'Intelligent emergency response workflows',
    description:
      'A Spring Boot service powering AI-assisted emergency workflows — intelligent incident processing and automated response coordination, designed for cloud deployment with a React front end. Built and deployed as a working AI prototype at PromptWars × Hacktropica using Google Antigravity.',
    highlights: [
      'AI-assisted incident workflows',
      'Automated response coordination',
      'Spring Boot + React architecture',
      'Deployed prototype, PromptWars × Hacktropica',
      'Cloud database integration',
      'REST API service layer',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'Spring AI', 'MySQL'],
    repo: 'https://github.com/SUTANU-code/RescurFlow-Ai-Assistant',
    demo: null,
    cover: 'cover-lime',
    wire: 'wire',
    icon: 'siren',
    accent: 'var(--color-lime)',
    featured: false,
  },
  {
    id: 'chat-app',
    title: 'Spring Boot Chat Application',
    tagline: 'Real-time messaging with live image sharing',
    description:
      'A web-based chat application built on WebSockets and JSP, with real-time broadcast messaging and image upload that appears instantly in the thread. Built to understand WebSocket integration and multipart file handling under MVC.',
    highlights: [
      'Real-time WebSocket messaging',
      'Instant image upload + display',
      'JSP + Spring MVC architecture',
      'MultipartFile handling',
      'Broadcast session management',
    ],
    stack: ['Java', 'Spring Boot', 'WebSockets', 'JSP', 'MVC'],
    repo: 'https://github.com/SUTANU-code/spring-boot-chat-application',
    demo: null,
    cover: 'cover-cyan',
    wire: 'wire',
    icon: 'message',
    accent: 'var(--color-cyan)',
    featured: false,
  },
]

export const timeline = [
  {
    tag: 'Now',
    title: 'Agentic AI with Python',
    body: 'Building multi-step agents in Python with LangGraph — graph-based workflows that plan, call Spring Boot APIs as tools and drive incident recovery, with Spring AI handling embeddings and chat.',
    icon: 'brain',
  },
  {
    tag: '2026',
    title: 'Full-Stack Project Shipments',
    body: 'Gaming e-commerce store with payments and AI assistance, CrimeNet AI intelligence prototype, and RescueFlow emergency workflows.',
    icon: 'rocket',
  },
  {
    tag: 'Foundation',
    title: 'Java & Spring Boot Core',
    body: 'Locked down the stack — Java, Spring Boot, Spring Security, JPA/Hibernate, SQL, and React on the front end.',
    icon: 'layers',
  },
  {
    tag: 'Start',
    title: 'BCA — Asansol Engineering College',
    body: 'Began the Computer Applications degree at Maulana Abul Kalam Azad University of Technology.',
    icon: 'graduation',
  },
]

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]