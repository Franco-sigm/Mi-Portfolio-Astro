// =============================================================
//  Datos centrales del portfolio. Edita SOLO este archivo para
//  actualizar tu información en todo el sitio.
// =============================================================

export const SITE = {
  url: 'https://portfolio-personal.surcode.cl',
  // Título de la pestaña del navegador
  title: 'Franco Cañete Herrera — Desarrollador Web Full-Stack',
  // Descripción para Google y redes sociales (máx. ~160 caracteres)
  description:
    'Desarrollador Web Full-Stack. Construyo aplicaciones con JavaScript, Node.js, Astro, Python y MySQL. Mira mis proyectos y contáctame.',
};

export const PROFILE = {
  name: 'Franco Cañete Herrera',
  role: 'Desarrollador Web Full-Stack junior Web Full-Stack',
  // Frase de gancho: lo primero que lee un reclutador
  tagline:
    'Transformo ideas en aplicaciones web rápidas y funcionales. Especializado en desarrollo full-stack con JavaScript, Node.js y Python.',
  location: 'Chile',
  email: 'americansima29@gmail.com', // 👈 cámbialo si usas otro email profesional
  cvPath: '/cv-franco-canete.pdf',    // 👈 sube tu CV a /public con este nombre
  linkedin: 'https://www.linkedin.com/in/franco-ca%C3%B1ete-herrera-36963a320/',
  github: 'https://github.com/Franco-sigm',
};

// Tecnologías que dominas. El reclutador escanea esto en 3 segundos.
export const SKILLS: { name: string; icon: string }[] = [
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Python', icon: '🐍' },
  { name: 'Astro', icon: '🚀' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'HTML5', icon: '🧱' },
  { name: 'CSS3', icon: '💅' },
  { name: 'Vite', icon: '⚡' },
  { name: 'Git', icon: '🔀' },
];

export type Project = {
  title: string;
  description: string;
  image: 'condominio' | 'portafolio';
  tags: string[];
  demo?: string; // URL real de la demo. Si no hay, déjalo vacío.
  code?: string; // URL real del repositorio. Si no hay, déjalo vacío.
};

// 👇 Reemplaza los '' por tus URLs reales de demo y código.
export const PROJECTS: Project[] = [
  {
    title: 'App de Administración de Condominios',
    description:
      'Aplicación full-stack para gestionar pagos, anuncios y comunicación entre administradores y residentes de un condominio.',
    image: 'condominio',
    tags: ['Vite', 'JavaScript', 'Tailwind', 'Node.js'],
    demo: '', // 👈 pega aquí la URL de la demo
    code: '', // 👈 pega aquí la URL del repositorio
  },
  {
    title: 'Portafolio Personal',
    description:
      'Este sitio: portfolio construido con Astro para mostrar mis proyectos con foco en rendimiento y un diseño limpio.',
    image: 'portafolio',
    tags: ['Astro', 'Tailwind', 'TypeScript'],
    demo: 'https://portfolio-personal.surcode.cl',
    code: '', // 👈 pega aquí la URL del repositorio
  },
];

export const CERTIFICATES: {
  title: string;
  institution: string;
  description: string;
  pdf: string;
}[] = [
  {
    title: 'Diplomado en Desarrollo Web',
    institution: 'Instituto IACC',
    description:
      'Formación integral en lógica de programación, bases de datos, desarrollo de software y metodologías ágiles.',
    pdf: '/desarrollo-web.pdf',
  },
  {
    title: 'Diplomado en Programación Avanzada',
    institution: 'Instituto IACC',
    description:
      'Técnicas avanzadas de programación, scripting, consumo de APIs e implementación de librerías en Python.',
    pdf: '/prog-avanzada.pdf',
  },
  {
    title: 'Diplomado en Programación y Bases de Datos',
    institution: 'Instituto IACC',
    description:
      'Programación en Python e implementación de bases de datos con MySQL Workbench.',
    pdf: '/prog-y-bd.pdf',
  },
];
