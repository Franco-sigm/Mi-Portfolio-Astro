import { defineConfig } from 'astro/config';

// 1. Importa la integración de Tailwind
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // 2. Dile a Astro que la use
  integrations: [tailwind()]
});