import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { figmaPlugin, figmaPluginInit, runAction } from "vite-figma-plugin";

import vue from "@vitejs/plugin-vue"; 

import { config } from "./figma.config";

const action = process.env.ACTION;
const mode = process.env.MODE;

if (action)
  runAction(
    {},
    // config,
    action
  );

figmaPluginInit();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    viteSingleFile(),
    figmaPlugin(config, mode),
  ],
  build: {
    assetsInlineLimit: Infinity,
    emptyOutDir: false,
    outDir: ".tmp",
  },
});
