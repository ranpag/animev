import { defineConfig } from "vite"
import lightningcss from "vite-plugin-lightningcss"
import htmlMinifier from "vite-plugin-html-minifier-terser"

export default defineConfig({
	root: "src",
	plugins: [
		lightningcss({
			browsers: "defaults",
			minify: true,
			drafts: { nesting: true },
		}),
		htmlMinifier({
			removeAttributeQuotes: true,
			removeComments: true,
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
		}),
	],
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		minify: "terser",
		rollupOptions: {
			treeshake: "smallest",
		},
	},
})
