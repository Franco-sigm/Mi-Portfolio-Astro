import { defineConfig } from 'astro/config';

// 1. Importa la integración de Tailwind
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // URL pública del subdominio (sin barra final)
  site: 'https://portfolio-personal.surcode.cl',
  // El subdominio sirve desde la raíz, por eso base es '/'
  base: '/',
  // 2. Dile a Astro que la use
  integrations: [tailwind()],
});
