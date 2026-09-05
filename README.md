# Portafolio personal

Sitio personal de Franco Cañete, desarrollador web full-stack.

**https://portafolio.surcode.cl**

Construido con Astro y acompañado de una pequeña API en PHP que registra
las visitas, los "me gusta" y atiende el formulario de contacto.

---

## Stack

**Frontend** — Astro 5, TypeScript y Tailwind CSS. Sitio estático: el build
genera HTML plano, sin servidor detrás. Las imágenes se optimizan a WebP en
tiempo de compilación y la tipografía del titular va subconjuntada y servida
desde el propio dominio, sin pedir nada a terceros.

**Backend** — PHP 7.4+ con MySQL, sin dependencias ni gestor de paquetes.
Un `index.php` enruta y un `.htaccess` le pasa todas las peticiones, de modo
que las URLs son `/api/stats` y no `/api/stats.php`.

## La API

| Ruta | Método | Devuelve |
| --- | --- | --- |
| `/api/stats` | GET | `{"visitas": n, "corazones": n}` |
| `/api/visit` | POST | `{"visitas": n}` |
| `/api/like` | POST | `{"corazones": n}` |
| `/api/contact` | POST | `{"ok": true}` |

Tres decisiones que vale la pena mencionar:

- **CORS restringido por dominio**, con la lista de orígenes en el `.env`.
- **Límite de peticiones por IP**, guardado en base de datos porque PHP no
  conserva memoria entre peticiones. La IP se almacena hasheada: para contar
  peticiones basta con poder comparar, no con poder leer.
- **El formulario usa `Reply-To`**, no `From`, para la dirección de quien
  escribe. Enviar en nombre del visitante haría que SPF lo tratara como
  suplantación y acabaría en spam.

## Estructura

```text
src/
├── components/          secciones del sitio
├── layouts/             plantilla base y la de los artículos
├── pages/               index y las páginas de detalle de cada proyecto
├── consts.ts            todo el contenido editable del sitio
└── styles/global.css

counter-backend-php/     la API: se sube al public_html del subdominio
public/                  archivos servidos tal cual (CV, certificados, iconos)
```

Para cambiar textos, proyectos o tecnologías se edita **`src/consts.ts`**.
Los componentes leen de ahí y no llevan contenido escrito a mano.

## Puesta en marcha

```sh
npm install
npm run dev              # http://localhost:4321
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | servidor de desarrollo |
| `npm run build` | build de producción, apuntando a la API publicada |
| `npm run build:local` | build apuntando a la API local |
| `npm run preview` | sirve el build para revisarlo |

El backend necesita un `.env` junto a los archivos PHP; hay una plantilla sin
valores en `counter-backend-php/.env.example`, y el esquema de las tablas en
`esquema.sql`.
