import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    // 2. Add the plugin to the plugins array
    tsconfigPaths(), 
    sveltekit()
  ]
});