// =============================================================
//  Datos centrales del portfolio. Edita SOLO este archivo para
//  actualizar tu información en todo el sitio.
// =============================================================

export const SITE = {
  url: 'https://portfolio-personal.surcode.cl',
  // Título de la pestaña del navegador
  title: 'Franco Cañete — Desarrollador Web Full-Stack',
  // Descripción para Google y redes sociales (máx. ~160 caracteres)
  description:
    'Desarrollador Web Full-Stack junior y Técnico en Nivel Superior en Análisis y Programación Computacional.',
};

export const PROFILE = {
  name: 'Franco Cañete',
  role: 'Desarrollador Web Full-Stack',
  // Frase de gancho: lo primero que lee un reclutador
  tagline: `Hola, soy Franco Cañete. Siempre me ha interesado descifrar la arquitectura de la realidad: entender cómo está hecho lo que me rodea y por qué funciona así. En un punto de mi vida me crucé con el mundo del código, y esa curiosidad encontró su lugar porque programar no es solo entender cómo se construye algo, es poder construirlo.

Hoy trabajo en tres frentes: productos propios, para mantener activo el músculo de la creatividad; software a medida para clientes; y proyectos sin fines de lucro que aporten valor a la comunidad.

En backend trabajo con Python y el ecosistema de FastAPI, con foco en arquitecturas escalables y seguras. En frontend, con Astro y React, y en el diseño de interfaces con Tailwind CSS.

Busco sumarme a un equipo donde pueda seguir construyendo software que resuelva problemas reales, y aprender de gente con más camino recorrido que yo.`,
}

export const CONTACT = {
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
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
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
      { name: 'VS Code', icon: '/icons/vscode.svg' },
      { name: 'Vercel', icon: '/icons/vercel.svg', invert: true },
    ],
  },
];

// -------------------------------------------------------------
//  GITHUB: invitación a seguir el perfil.
//  El avatar vive en src/assets/github-avatar.png. Si algún día
//  cambias tu foto de GitHub, vuelve a descargarla desde
//  https://github.com/Franco-sigm.png
// -------------------------------------------------------------
export const GITHUB = {
  user: 'Franco-sigm',
  url: 'https://github.com/Franco-sigm',
  headline: 'Sígueme en GitHub',
  bio: 'Técnico en Análisis y Programación Computacional y estudiante de Ingeniería en Informática. Me interesa el ciclo completo del desarrollo: del diseño de la arquitectura a dejar el producto funcionando en producción.',
  // Lenguajes que más aparecen en tus repos, para las etiquetas
  languages: ['Python', 'JavaScript', 'Astro'],
};

// -------------------------------------------------------------
//  Logo de cada tecnología, para las etiquetas de los proyectos.
//  La clave debe coincidir EXACTAMENTE con el texto del tag.
//  Un tag sin entrada aquí (p. ej. 'SEO') se muestra solo con texto.
//  `invert: true` → logo negro que se pinta de blanco.
// -------------------------------------------------------------
export const TECH_ICONS: Record<string, { icon: string; invert?: boolean }> = {
  Astro: { icon: '/icons/astro.svg' },
  Capacitor: { icon: '/icons/capacitor.svg' },
  'CSS3': { icon: '/icons/css3.svg' },
  Docker: { icon: '/icons/docker.svg' },
  FastAPI: { icon: '/icons/fastapi.svg' },
  Flask: { icon: '/icons/flask.svg', invert: true },
  Git: { icon: '/icons/git.svg' },
  HTML5: { icon: '/icons/html5.svg' },
  JavaScript: { icon: '/icons/javascript.svg' },
  MySQL: { icon: '/icons/mysql.svg' },
  'Node.js': { icon: '/icons/nodejs.svg' },
  PostgreSQL: { icon: '/icons/postgresql.svg' },
  Python: { icon: '/icons/python.svg' },
  React: { icon: '/icons/react.svg' },
  SQLAlchemy: { icon: '/icons/sqlalchemy.svg', invert: true },
  Tailwind: { icon: '/icons/tailwindcss.svg' },
  'Tailwind CSS': { icon: '/icons/tailwindcss.svg' },
  TypeScript: { icon: '/icons/typescript.svg' },
  Vite: { icon: '/icons/vitejs.svg' },
};

// -------------------------------------------------------------
//  PROYECTOS: cada uno es un mini caso de estudio, no una ficha.
//  El orden importa — el primero es el que más se mira.
//  `image: null` → se muestra un marcador con el dominio hasta que
//  subas la captura a src/assets y la registres en Proyectos.astro.
// -------------------------------------------------------------
export type Project = {
  title: string;
  domain?: string; // aún sin dominio mientras el proyecto no esté publicado
  role: string;
  description: string;
  image: 'condominio' | 'surcode' | 'portafolio' | null;
  tags: string[];
  links: { label: string; url: string; primary?: boolean }[];
  note?: string; // aclaración bajo los botones (ej: repo privado)
  enConstruccion?: boolean; // muestra la etiqueta de estado en la tarjeta
};

export const PROJECTS: Project[] = [
  {
    title: 'ConAdmin',
    domain: 'conadmin.cl',
    role: 'Producto, backend, frontend, app móvil e infraestructura (desarrollo individual)',
    description:
      'Plataforma SaaS para administrar condominios: gastos comunes, conciliación de pagos, cierres contables, comunicados, encomiendas y portal de residentes. Arquitectura multi-tenant donde el aislamiento de datos entre clientes lo impone PostgreSQL con Row-Level Security, no el código de la aplicación. Nació para la Comunidad Parque Suizo 900 y hoy incluye portal web, app Android y funciones asistidas por IA.',
    image: 'condominio',
    tags: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'React',
      'Vite',
      'Docker',
      'Claude API',
    ],
    links: [
      // 👈 cambia esta URL por el enlace directo a la demo gratuita
      { label: 'Probar demo gratis', url: 'https://conadmin.cl', primary: true },
      // Las URLs que empiezan por / son internas: se abren en la misma pestaña
      { label: 'Artículo', url: '/proyectos/conadmin' },
    ],
    note: 'Repositorio privado. Actualmente en etapa de prospección de clientes.',
  },
  {
    title: 'Surcode',
    domain: 'surcode.cl',
    role: 'Fundador · Diseño y desarrollo completo',
    description:
      'Mi emprendimiento de desarrollo web. Diseñé y construí el sitio completo: la arquitectura de páginas de servicio, el contenido orientado a búsquedas y el recorrido pensado para convertir visitas en clientes.',
    image: 'surcode',
    tags: ['Astro', 'Tailwind', 'SEO'],
    links: [{ label: 'Ver sitio', url: 'https://surcode.cl', primary: true }],
  },
  {
    title: 'Portfolio personal + API de métricas',
    domain: 'portfolio-personal.surcode.cl',
    role: 'Desarrollo full-stack',
    description:
      'Este sitio. Además del frontend en Astro, construí una API REST en Flask con MySQL que registra visitas y “me gusta” en tiempo real, con CORS restringido por dominio y configuración por variables de entorno.',
    image: 'portafolio',
    tags: ['Astro', 'TypeScript', 'Tailwind', 'Flask', 'MySQL'],
    links: [
      {
        label: 'Ver código en GitHub',
        url: 'https://github.com/Franco-sigm/Mi-Portfolio-Astro',
        primary: true,
      },
      { label: 'Ver sitio', url: 'https://portfolio-personal.surcode.cl' },
    ],
  },
  {
    // 👈 ponle el nombre definitivo cuando lo tengas
    title: 'Monitoreo de ríos y alertas tempranas',
    role: 'Producto y desarrollo full-stack',
    description:
      'Sistema de monitoreo del caudal de ríos que avisa a los vecinos de sectores rurales cuando el nivel se acerca a un umbral de riesgo. La zona rural es justo donde la alerta llega tarde: el objetivo es que el aviso salga solo, sin que nadie tenga que estar mirando.',
    image: null,
    // 👈 confirma o corrige el stack cuando lo definas
    tags: ['Python', 'FastAPI', 'PostgreSQL'],
    links: [{ label: 'Artículo', url: '/proyectos/monitoreo-rios' }],
    enConstruccion: true,
  },
  {
    // 👈 ponle el nombre definitivo cuando lo tengas
    title: 'Detección de riesgos con visión artificial',
    role: 'Producto y desarrollo full-stack',
    description:
      'Sistema que analiza el video de las cámaras de una empresa de logística y detecta acciones inseguras en bodega para avisar en el momento, no al revisar la grabación después del accidente.',
    image: null,
    // 👈 confirma o corrige el stack cuando lo definas
    tags: ['Python', 'Visión por computador', 'FastAPI'],
    links: [{ label: 'Artículo', url: '/proyectos/deteccion-riesgos' }],
    enConstruccion: true,
  },
];

// El primero es el más importante: encabeza la sección.
// `pdf` es opcional — sin él, la tarjeta no muestra botón de descarga.
// `image` es la clave de la miniatura que se ve de fondo en la tarjeta
// (se registran en Estudios.astro).
export const CERTIFICATES: {
  title: string;
  institution: string;
  description: string;
  image: 'titulo' | 'desarrolloWeb' | 'progAvanzada' | 'progYBd';
  pdf?: string;
}[] = [
  {
    title: 'Técnico en Nivel Superior en Análisis y Programación Computacional',
    institution: 'Instituto IACC',
    description:
      'Titulado con Distinción Máxima el 22 de mayo de 2026. Formación en desarrollo de software, bases de datos y análisis de sistemas.',
    image: 'titulo',
    // Solo la página 1 del diploma: la 2 traía RUT y correo de los firmantes.
    pdf: '/titulo-tecnico.pdf',
  },
  {
    title: 'Diplomado en Desarrollo Web',
    institution: 'Instituto IACC',
    description:
      'Formación integral en lógica de programación, bases de datos, desarrollo de software y metodologías ágiles.',
    image: 'desarrolloWeb',
    pdf: '/desarrollo-web.pdf',
  },
  {
    title: 'Diplomado en Programación Avanzada',
    institution: 'Instituto IACC',
    description:
      'Técnicas avanzadas de programación, scripting, consumo de APIs e implementación de librerías en Python.',
    image: 'progAvanzada',
    pdf: '/prog-avanzada.pdf',
  },
  {
    title: 'Diplomado en Programación y Bases de Datos',
    institution: 'Instituto IACC',
    description:
      'Programación en Python e implementación de bases de datos con MySQL Workbench.',
    image: 'progYBd',
    pdf: '/prog-y-bd.pdf',
  },
];
