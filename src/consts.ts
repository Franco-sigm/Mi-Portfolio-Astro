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
// `icon` apunta a un SVG dentro de /public/icons (logos oficiales de Devicon).
// Para añadir una tecnología: descarga su SVG a /public/icons y agrégala aquí.
export const SKILLS: { name: string; icon: string }[] = [
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'Astro', icon: '/icons/astro.svg' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
  { name: 'MySQL', icon: '/icons/mysql.svg' },
  { name: 'HTML5', icon: '/icons/html5.svg' },
  { name: 'CSS3', icon: '/icons/css3.svg' },
  { name: 'Vite', icon: '/icons/vitejs.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
];

// -------------------------------------------------------------
//  MÉTRICAS: contador de visitas y botón de corazón.
//  La URL de la API Flask se lee de la variable PUBLIC_API_URL,
//  que defines en un archivo .env en la raíz del proyecto:
//
//    En local:      PUBLIC_API_URL=http://127.0.0.1:5000
//    En producción: PUBLIC_API_URL=https://tu-dominio.cl
//
//  Si la variable está vacía, la sección de métricas NO se
//  renderiza: así el footer queda limpio mientras el backend no
//  esté desplegado.
// -------------------------------------------------------------
export const METRICS = {
  apiUrl: import.meta.env.PUBLIC_API_URL ?? '',
};

// -------------------------------------------------------------
//  STACK COTIDIANO: con lo que trabajas día a día, agrupado por
//  rol. A diferencia de SKILLS (todo lo que conoces), aquí va
//  solo lo que podrías defender en una entrevista.
//  `invert: true` → el logo es negro/oscuro y se pinta de blanco
//  para que se vea sobre el fondo oscuro.
// -------------------------------------------------------------
export type StackItem = { name: string; icon: string; invert?: boolean };

export const STACK: {
  category: string;
  description: string;
  items: StackItem[];
}[] = [
  {
    category: 'Frontend',
    description: 'Interfaces rápidas, responsivas y accesibles.',
    items: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Astro', icon: '/icons/astro.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
      { name: 'Vite', icon: '/icons/vitejs.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
    ],
  },
  {
    category: 'Backend',
    description: 'APIs REST y modelado de datos relacional.',
    items: [
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'FastAPI', icon: '/icons/fastapi.svg' },
      { name: 'SQLAlchemy', icon: '/icons/sqlalchemy.svg', invert: true },
      { name: 'MySQL', icon: '/icons/mysql.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
    ],
  },
  {
    category: 'Herramientas',
    description: 'Versionado, entornos y despliegue.',
    items: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'GitHub', icon: '/icons/github.svg', invert: true },
      { name: 'Docker', icon: '/icons/docker.svg' },
      { name: 'Vercel', icon: '/icons/vercel.svg', invert: true },
    ],
  },
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
