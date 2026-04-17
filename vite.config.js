import path from "path"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { getCategoriesSummary, getResourcesByQuery } from "./api/_lib/resources-store.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "local-api-routes",
      configureServer(server) {
        server.middlewares.use("/api/categories", (_req, res) => {
          try {
            const categories = getCategoriesSummary();
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ categories }));
          } catch (error) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({
              error: "Failed to load categories",
              message: error?.message || "Unknown error",
            }));
          }
        });

        server.middlewares.use("/api/resources", (req, res) => {
          try {
            const origin = req.headers.host ? `http://${req.headers.host}` : "http://localhost";
            const url = new URL(req.url || "/", origin);
            const q = url.searchParams.get("q") || "";
            const category = url.searchParams.get("category") || "";
            const limit = url.searchParams.get("limit") || "";

            const payload = getResourcesByQuery({
              q,
              category,
              limitPerCategory: limit,
            });

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(payload));
          } catch (error) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 500;
            res.end(JSON.stringify({
              error: "Failed to load resources",
              message: error?.message || "Unknown error",
            }));
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 2468
  }
})
