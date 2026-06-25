import { execSync } from "node:child_process"
import path from "node:path"

import { sveltekit } from "@sveltejs/kit/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type PluginOption } from "vite"

function watchIconsPlugin(): PluginOption {
	return {
		name: "watch-doomscrll-icons",
		buildStart() {
			try {
				execSync("node src/scripts/generate-icons-map.ts", { stdio: "inherit" })
			} catch (error) {
				console.error("Failed to generate icons on startup.", error)
			}
		},
		configureServer(server) {
			const iconsDir = path.resolve("./src/components/icons/doomscrll-icons")

			server.watcher.on("all", (event, filePath) => {
				if (filePath.startsWith(iconsDir) && filePath.endsWith(".svelte")) {
					if (["add", "unlink", "change"].includes(event)) {
						console.log(`[watch-doomscrll-icons]: Icon ${event} detected.`)
						try {
							execSync("node src/scripts/generate-icons-map.ts", { stdio: "inherit" })
						} catch (error) {
							console.log("Failed to generate icons map:", error)
						}
					}
				}
			})
		},
	}
}

export default defineConfig({ plugins: [tailwindcss(), sveltekit(), watchIconsPlugin()] })
