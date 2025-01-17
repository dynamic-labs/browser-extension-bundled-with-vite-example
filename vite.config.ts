import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import path from "path";

const replaceLoadAppleIdScriptWithCustomScriptPlugin = {
  name: "replace-loadAppleId",
  enforce: "pre",
  resolveId(source) {
    if (source.includes("loadAppleId")) {
      return path.resolve(__dirname, "src/loadAppleId.js");
    }
  },
} as const;

export default defineConfig({
  plugins: [react(), replaceLoadAppleIdScriptWithCustomScriptPlugin],
  optimizeDeps: {
    esbuildOptions: {
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      input: "src/index.tsx",
      output: {
        entryFileNames: "index.js",
        format: "cjs",
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  publicDir: false, // Disable handling of static assets
});
