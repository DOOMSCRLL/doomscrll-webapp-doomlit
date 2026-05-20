import "../src/styles/doomscrll-design-system.css"

import { withThemeByDataAttribute } from "@storybook/addon-themes"
import type { Preview, SvelteRenderer } from "@storybook/sveltekit"

const preview: Preview = {
	parameters: {
		layout: "centered",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	argTypesEnhancers: [
		({ argTypes }) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			Object.entries(argTypes).forEach(([name, argType]) => {
				if (argType.options && argType.options.length > 0) {
					argType.control = {
						...(typeof argType.control === "object" ? argType.control : {}),
						type: "select",
					}
				}
			})
			return argTypes
		},
	],
	decorators: [
		withThemeByDataAttribute<SvelteRenderer>({
			themes: {
				doomscrll: "doomscrll",
				"1bit-styx": "1bit-styx",
				"bluuberry-donut-gb": "bluuberry-donut-gb",
				"mist-gb": "mist-gb",
				crimson: "crimson",
				cherrymelon: "cherrymelon",
				"neon-night-sky": "neon-night-sky",
				sangria: "sangria",
				"cold-light": "cold-light",
				"cave-moss": "cave-moss",
				"ys-coffee-calm": "ys-coffee-calm",
				"gold-gb": "gold-gb",
				papercut4: "papercut4",
				"bone-apple-tea": "bone-apple-tea",
				bluem0ld: "bluem0ld",
			},
			defaultTheme: "doomscrll",
			attributeName: "data-theme",
		}),
	],
}

export default preview
