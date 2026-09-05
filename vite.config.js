import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild, mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [
      tailwindcss(),
      react(),
      ...(env.ANALYZE && !isSsrBuild
        ? [
            visualizer({
              filename: "bundle-report.html",
              template: "treemap",
              gzipSize: true,
              brotliSize: true,
              open: false,
            }),
          ]
        : []),
    ],
    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: isSsrBuild
        ? undefined
        : {
            output: {
              manualChunks: {
                vendor: ["react", "react-dom", "react-router-dom"],
              },
            },
          },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
    server: {
      middlewareMode: false,
      preTransformRequests: true,
    },
  };
});
